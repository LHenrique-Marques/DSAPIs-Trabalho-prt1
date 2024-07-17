const autor_repository = require('../repository/autor');
const usuario_repository = require('../repository/usuario');
let geraid = 5;
const livros = [
    {titulo: "Lógica das APIS",autor: ["Luis Henrique Ries"],ano:2000,disponivel:true,id:1},
    {titulo: "A arte de fumar charutos",autor: ["Luis Henrique Marques"],ano:2022,disponivel:true,id:2},
    {titulo: "O basico do front-end",autor: ["Bruno Daniel"],ano:2012,disponivel:true,id:3},
    {titulo: "Estrutura de Dados",autor: ["Rafael Rehm"],ano:1995,disponivel:true,id:4}
];
function listar_livros_repository(){
    return livros;
}
function buscar_livro_repository(id){
    return livros.find(livro => livro.id === id);
}
function cadastrar_livro_repository(livro){
    livro.id = geraid++;
    livros.push(livro);
    return livro;
}
function atualizar_livro_repository(id, atributo, atributo_atualizado){
    const livro_escolhido = livros.find(livro => livro.id == id);
    livro_escolhido[atributo] = atributo_atualizado;
    return livros;
}
function remover_livro_repository(id){
    const index = livros.findIndex(livro => livro.id === id);
    if (index === -1) {
        return false;
    }

    livros.splice(index, 1);
    return true;
}
function retirar_livro_repository(usuarioid, livroid){
    const livro = livros.find(l => l.id == livroid)
    const usuario = usuario_repository.usuarios.find(l => l.id == usuarioid)
    livro.disponivel = false;
    const data_entrega = new Date();
    data_entrega.setDate(data_entrega.getDate() + 5);
    livro.data_entrega = data_entrega;
    usuario.livros.push(livro);
    return usuario;
};
function devolver_livro_repository(usuarioid, livroid){
    const livro = livros.find(l => l.id == livroid)
    const usuario = usuario_repository.usuarios.find(l => l.id == usuarioid)
    livro.disponivel = true;
    livro.dataEntrega = null;
    usuario.livros = usuario.livros.filter(l => l.id !== livro.id);
    return usuario;
}
module.exports = { 
    livros,
    listar_livros_repository, 
    buscar_livro_repository, 
    cadastrar_livro_repository, 
    atualizar_livro_repository, 
    remover_livro_repository,
    devolver_livro_repository,
    retirar_livro_repository
};