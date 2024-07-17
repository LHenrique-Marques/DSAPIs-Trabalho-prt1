const autor_repository = require('../repository/autor.js');
function listar_autores_services(){
    let dados = autor_repository.listar_autores_repository();
    if(dados){
        return dados;
    }
    else{
        throw new Error("Sem autores.");
    }
}
function cadastrar_autor_services(autor){
    if(!autor.nome || !autor.nacionalidade){
        throw new Error("Nome e nacionalidade são obrigatórios.");
    }
    let novo_autor = autor_repository.cadastrar_autor_repository(autor);
    if(novo_autor){
        return novo_autor;
    }
    else{
        throw new Error("Erro ao cadastrar autor.");
    }
};
function deletar_autor_services(id){
    let autor = autor_repository.remover_autor_repository(id);
    if(autor){
        return autor;
    }
    else{
        throw new Error("Autor inexistente.");
    }
};
function atualizar_autor_services(atributo, atributo_atualizado, id){
    if(["nome","nacionalidade"].includes(atributo)){
        const lista_atualizada = autor_repository.atualizar_autor_repository(id,atributo, atributo_atualizado);
        if (lista_atualizada){
            return lista_atualizada;
        }
    }
    else{
        throw new Error("Não foi possivel atualizar o autor.")
    }
}
module.exports ={
    listar_autores_services,
    cadastrar_autor_services,
    deletar_autor_services,
    atualizar_autor_services
};