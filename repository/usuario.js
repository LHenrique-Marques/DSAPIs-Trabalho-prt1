let id_gerador_de_usuarios = 5;
const usuarios = [
    {nome: "renan",senha: "1234",matricula: 1,telefone: 51985420325,livros: [],id:1},
    {nome: "breno",senha: "inter",matricula: 2,telefone: 51982596541,livros: [],id:2},
    {nome: "bruno",senha: "gremio",matricula: 3,telefone: 51984785025,livros: [],id:3},
    {nome: "joao",senha: "juventude",matricula: 4,telefone: 51986325104,livros: [],id:4}
];
function buscar_usuario_repository(atributo, condicao){
    const lista_retornada = usuarios.filter(usuario => usuario[atributo] == condicao);
    return lista_retornada;
};
function localizar_usuario_repository(input_usuario){
    const usuario = usuarios.find(u => u.nome.toLowerCase() === input_usuario.toLowerCase());
    return usuario;
};
function validar_senha_repository(input_senha, usuario){
    if(usuario.senha === input_senha){
        return true;
    }
    return false;
};
function cadastrar_usuario_repository(usuario){
    usuario.id = ++ id_gerador_de_usuarios;
    usuarios.push(usuario);
    return usuario;
};
function listar_usuarios_repository(){
    return usuarios;
};
module.exports = {
    cadastrar_usuario_repository,
    localizar_usuario_repository,
    validar_senha_repository,
    usuarios,
    listar_usuarios_repository,
    buscar_usuario_repository
 };