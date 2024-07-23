const { Client } = require("pg");
const conexao = {
    user: "postgres",
    password: "123456",
    host: "localhost",
    port: 5432,
    database: "projeto_apis1"
};

async function listar_usuarios_repository() {
    const cliente = new Client(conexao);
    try {
        await cliente.connect();
        const sql = `
            SELECT u.id_usuario, u.nome, u.telefone, 
                   COALESCE(
                       JSON_AGG(
                           JSON_BUILD_OBJECT(
                               'id_livro', l.id_livro,
                               'titulo', l.titulo
                           ) 
                           ORDER BY l.titulo
                       ) FILTER (WHERE l.id_livro IS NOT NULL), '[]'
                   ) AS livros_retirados
            FROM usuario u
            LEFT JOIN retirada r ON u.id_usuario = r.id_usuario AND r.data_devolucao IS NULL
            LEFT JOIN livro l ON r.id_livro = l.id_livro
            GROUP BY u.id_usuario;
        `;
        const resultado = await cliente.query(sql);
        return resultado.rows;
    } catch (error) {
        console.error('Erro ao listar usuários:', error.message);
        throw new Error('Erro ao listar usuários');
    } finally {
        await cliente.end();
    }
}

async function buscar_por_id_repository(id) {
    const cliente = new Client(conexao);
    try {
        await cliente.connect();
        const sql = "SELECT * FROM usuario WHERE id_usuario=$1";
        const valores = [id];
        const resultado = await cliente.query(sql, valores);
        if (resultado.rows.length === 0) {
            throw new Error('Usuário não encontrado.');
        }
        return resultado.rows[0];
    } catch (error) {
        console.error('Erro ao buscar usuário por ID:', error.message);
        throw new Error('Erro ao buscar usuário por ID');
    } finally {
        await cliente.end();
    }
}

async function cadastrar_usuario_repository(usuario) {
    const cliente = new Client(conexao);
    try {
        await cliente.connect();
        const sql = "INSERT INTO usuario(nome, telefone) VALUES ($1, $2) RETURNING *";
        const valores = [usuario.nome, usuario.telefone];
        const resultado = await cliente.query(sql, valores);
        return resultado.rows[0];
    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error.message);
        throw new Error('Erro ao cadastrar usuário');
    } finally {
        await cliente.end();
    }
}

module.exports = {
    cadastrar_usuario_repository,
    buscar_por_id_repository,
    listar_usuarios_repository,
};
