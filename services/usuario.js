const usuario_repository = require('../repository/usuario.js');
function listar_usuarios_services() {
    let dados = usuario_repository.listar_usuarios_repository();
    if(dados){
        return dados;
    }
    else{
        throw new Error("Sem usuarios.");
    }
};
function autenticar_usuario_services(nome, senha) {
    const usuario = usuario_repository.localizar_usuario_repository(nome);
    if(!usuario){
        throw new Error("Usuário não encontrado.");
    }
    const validacao_senha = usuario_repository.validar_senha_repository(senha, usuario);
    if(!validacao_senha){
        throw new Error("Senha incorreta.");
    }
    console.log("Bem-vindo, " + usuario.nome);
    return usuario;
};
function cadastrar_usuario_services(usuario) {
    const { nome, senha, matricula, telefone } = usuario;
    if(!nome || !senha || !matricula || !telefone) {
        throw new Error("Os campos nome, senha, matricula e telefone são obrigatórios.");
    }
    usuario.livros = [];
    console.log("Usuário cadastrado com sucesso!")
    return usuario_repository.cadastrar_usuario_repository(usuario);
};

module.exports = { 
    listar_usuarios_services,
    autenticar_usuario_services, 
    cadastrar_usuario_services
};