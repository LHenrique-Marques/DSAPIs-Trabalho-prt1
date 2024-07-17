let geraId = 5;
const autores = [
    {nome: "Luis Henrique Ries",nacionalidade: "Brasileiro",id:1},
    {nome: "Luis Henrique Marques",nacionalidade: "Brasileiro",id:2},
    {nome: "Bruno Daniel",nacionalidade: "Noruegues",id:3},
    {nome: "Rafael Rehm",nacionalidade: "Espanhol",id:4}
];
function listar_autores_repository(){
    return autores;
}
function buscar_autor_repository(id){
    return autores.find(autor => autor.id === id);
}
function cadastrar_autor_repository(autor){
    autor.id = geraId++;
    autores.push(autor);
    return autor;
}
function atualizar_autor_repository(id, atributo, atributo_atualizado){
    const autor_escolhido = autores.find(autor => autor.id == id);
    autor_escolhido[atributo] = atributo_atualizado;
    return autores;
}
function remover_autor_repository(id){
    const index = autores.findIndex(autor => autor.id === id);
    if (index === -1){
        return false;
    }

    autores.splice(index, 1);
    return true;
}
module.exports = {
    autores,
    listar_autores_repository, 
    buscar_autor_repository, 
    cadastrar_autor_repository,
    atualizar_autor_repository, 
    remover_autor_repository 
};