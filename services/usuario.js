const usuario_repository = require('../repository/usuario');

async function listar_usuarios_services() {
    try {
        const dados = await usuario_repository.listar_usuarios_repository();
        if (!dados || dados.length === 0) {
            throw new Error("Nenhum usuário encontrado.");
        }
        return dados;
    } catch (err) {
        console.error('Erro ao listar usuários:', err.message);
        throw new Error("Não foi possível listar usuários.");
    }
}

async function cadastrar_usuario_service(usuario) {
    if (usuario && usuario.nome && usuario.telefone) {
        try {
            return await usuario_repository.cadastrar_usuario_repository(usuario);
        } catch (err) {
            console.error('Erro ao cadastrar usuário:', err.message);
            throw new Error("Não foi possível cadastrar o usuário.");
        }
    } else {
        throw new Error("Usuário deve ter nome e telefone.");
    }
}

module.exports = {
    listar_usuarios_services,
    cadastrar_usuario_service
};
