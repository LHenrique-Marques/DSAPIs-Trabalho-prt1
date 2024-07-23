const { Client } = require("pg");
const conexao = {
    user: "postgres",
    password: "123456",
    host: "localhost",
    port: 5432,
    database: "projeto_apis1"
};

async function listar_autores_repository() {
    const cliente = new Client(conexao);
    try {
        await cliente.connect();
        const resultado = await cliente.query("SELECT * FROM autor");
        return resultado.rows;
    } catch (error) {
        console.error('Erro ao listar autores:', error.message);
        throw new Error('Erro ao listar autores');
    } finally {
        await cliente.end();
    }
}

async function buscar_por_id_repository(id) {
    const cliente = new Client(conexao);
    try {
        await cliente.connect();
        const sql = "SELECT * FROM autor WHERE id_autor=$1";
        const valores = [id];
        const resultado = await cliente.query(sql, valores);
        if (resultado.rows.length === 0) {
            throw new Error('Autor não encontrado.');
        }
        return resultado.rows[0];
    } catch (error) {
        console.error('Erro ao buscar autor por ID:', error.message);
        throw new Error('Erro ao buscar autor por ID');
    } finally {
        await cliente.end();
    }
}

async function cadastrar_autor_repository(autor) {
    const cliente = new Client(conexao);
    try {
        await cliente.connect();
        const sql = "INSERT INTO autor(nome, nacionalidade) VALUES ($1, $2) RETURNING *";
        const valores = [autor.nome, autor.nacionalidade];
        const resultado = await cliente.query(sql, valores);
        return resultado.rows[0];
    } catch (error) {
        console.error('Erro ao cadastrar autor:', error.message);
        throw new Error('Erro ao cadastrar autor');
    } finally {
        await cliente.end();
    }
}

async function atualizar_autor_repository(id, autor) {
    const cliente = new Client(conexao);
    try {
        await cliente.connect();
        const sql = 'UPDATE autor SET nome=$1, nacionalidade=$2 WHERE id_autor=$3 RETURNING *';
        const valores = [autor.nome, autor.nacionalidade, id];
        const resultado = await cliente.query(sql, valores);
        if (resultado.rows.length === 0) {
            throw new Error('Autor não encontrado para atualização.');
        }
        return resultado.rows[0];
    } catch (error) {
        console.error('Erro ao atualizar autor:', error.message);
        throw new Error('Erro ao atualizar autor');
    } finally {
        await cliente.end();
    }
}

async function deletar_autor_repository(id) {
    const cliente = new Client(conexao);
    try {
        await cliente.connect();
        const sql = 'DELETE FROM autor WHERE id_autor=$1 RETURNING *';
        const valores = [id];
        const resultado = await cliente.query(sql, valores);
        if (resultado.rows.length === 0) {
            throw new Error('Autor não encontrado para exclusão.');
        }
        return resultado.rows[0];
    } catch (error) {
        console.error('Erro ao deletar autor:', error.message);
        throw new Error('Erro ao deletar autor');
    } finally {
        await cliente.end();
    }
}

module.exports = {
    listar_autores_repository, 
    buscar_por_id_repository, 
    cadastrar_autor_repository,
    atualizar_autor_repository, 
    deletar_autor_repository 
};
