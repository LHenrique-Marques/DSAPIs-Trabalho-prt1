const { Client } = require("pg");
const conexao = {
    user: "postgres",
    password: "123456",
    host: "localhost",
    port: 5432,
    database: "projeto_apis1"
};

async function listar_livros_repository() {
    const cliente = new Client(conexao);
    try {
        await cliente.connect();
        const sql = `SELECT livro.id_livro, livro.titulo, livro.disponivel, livro.ano,
                            autor.id_autor, autor.nome, autor.nacionalidade
                     FROM livro
                     JOIN autor ON livro.autor = autor.id_autor;`;
        const resultado = await cliente.query(sql);
        return resultado.rows;
    } catch (error) {
        console.error('Erro ao listar livros:', error.message);
        throw new Error('Erro ao listar livros');
    } finally {
        await cliente.end();
    }
}

async function buscar_livro_repository(id) {
    const cliente = new Client(conexao);
    try {
        await cliente.connect();
        const sql = "SELECT * FROM livro WHERE id_livro=$1";
        const valores = [id];
        const resultado = await cliente.query(sql, valores);
        if (resultado.rows.length === 0) {
            throw new Error('Livro não encontrado.');
        }
        return resultado.rows[0];
    } catch (error) {
        console.error('Erro ao buscar livro por ID:', error.message);
        throw new Error('Erro ao buscar livro por ID');
    } finally {
        await cliente.end();
    }
}

async function cadastrar_livro_repository(livro) {
    const cliente = new Client(conexao);
    try {
        await cliente.connect();
        const sql = "INSERT INTO livro(titulo, autor, ano) VALUES ($1, $2, $3) RETURNING *";
        const valores = [livro.titulo, livro.autor, livro.ano];
        const resultado = await cliente.query(sql, valores);
        return resultado.rows[0];
    } catch (error) {
        console.error('Erro ao cadastrar livro:', error.message);
        throw new Error('Erro ao cadastrar livro');
    } finally {
        await cliente.end();
    }
}

async function atualizar_livro_repository(id, livro) {
    const cliente = new Client(conexao);
    try {
        await cliente.connect();
        const sql = 'UPDATE livro SET titulo=$1, autor=$2, ano=$3 WHERE id_livro=$4 RETURNING *';
        const valores = [livro.titulo, livro.autor, livro.ano, id];
        const resultado = await cliente.query(sql, valores);
        if (resultado.rows.length === 0) {
            throw new Error('Livro não encontrado para atualização.');
        }
        return resultado.rows[0];
    } catch (error) {
        console.error('Erro ao atualizar livro:', error.message);
        throw new Error('Erro ao atualizar livro');
    } finally {
        await cliente.end();
    }
}

async function deletar_livro_repository(id) {
    const cliente = new Client(conexao);
    try {
        await cliente.connect();
        const sql = 'DELETE FROM livro WHERE id_livro=$1 RETURNING *';
        const valores = [id];
        const resultado = await cliente.query(sql, valores);
        if (resultado.rows.length === 0) {
            throw new Error('Livro não encontrado para exclusão.');
        }
        return resultado.rows[0];
    } catch (error) {
        console.error('Erro ao deletar livro:', error.message);
        throw new Error('Erro ao deletar livro');
    } finally {
        await cliente.end();
    }
}

async function retirar_livro_repository(id_usuario, id_livro) {
    const cliente = new Client(conexao);
    try {
        await cliente.connect();
        const verificarSql = 'SELECT COUNT(*) FROM retirada WHERE id_usuario=$1 AND data_devolucao IS NULL';
        const verificarValores = [id_usuario];
        const resultado = await cliente.query(verificarSql, verificarValores);
        const livros_retirados = parseInt(resultado.rows[0].count);

        if (livros_retirados >= 3) {
            throw new Error('Usuário já retirou o número máximo de livros permitido.');
        }

        const sql = 'INSERT INTO retirada(id_usuario, id_livro) VALUES($1, $2) RETURNING *';
        const valores = [id_usuario, id_livro];
        const resultadoRetirada = await cliente.query(sql, valores);

        const atualizarSql = 'UPDATE livro SET disponivel=FALSE WHERE id_livro=$1 RETURNING *';
        await cliente.query(atualizarSql, [id_livro]);

        return resultadoRetirada.rows[0];
    } catch (error) {
        console.error('Erro ao retirar livro:', error.message);
        throw new Error('Erro ao retirar livro');
    } finally {
        await cliente.end();
    }
}

async function devolver_livro_repository(id_usuario, id_livro) {
    const cliente = new Client(conexao);
    try {
        await cliente.connect();
        const sql = 'UPDATE retirada SET data_devolucao=CURRENT_TIMESTAMP WHERE id_usuario=$1 AND id_livro=$2 AND data_devolucao IS NULL RETURNING *';
        const valores = [id_usuario, id_livro];
        const resultado = await cliente.query(sql, valores);

        if (resultado.rowCount === 0) {
            throw new Error('Este livro não foi retirado pelo usuário ou já foi devolvido.');
        }

        const atualizarSql = 'UPDATE livro SET disponivel=TRUE WHERE id_livro=$1 RETURNING *';
        await cliente.query(atualizarSql, [id_livro]);

        return resultado.rows[0];
    } catch (error) {
        console.error('Erro ao devolver livro:', error.message);
        throw new Error('Erro ao devolver livro');
    } finally {
        await cliente.end();
    }
}

module.exports = {
    listar_livros_repository, 
    buscar_livro_repository, 
    cadastrar_livro_repository, 
    atualizar_livro_repository, 
    deletar_livro_repository,
    retirar_livro_repository,
    devolver_livro_repository
};
