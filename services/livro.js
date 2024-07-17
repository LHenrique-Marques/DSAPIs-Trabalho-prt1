const livro_repository = require('../repository/livro');
const usuario_repository = require('../repository/usuario');
function listar_livro_service(){
    let dados = livro_repository.listar_livros_repository();
    if(dados){
        return dados;
    }
    else{
        throw new Error("Sem livros.");
    }
}
function cadastrar_livro_service(livro) {
    if(!livro.titulo || !livro.autor || !livro.ano){
        throw new Error("Titulo,autor e ano são obrigatorios.");
    }
    let novo_livro = livro_repository.cadastrar_livro_repository(livro);
    if(novo_livro){
        return novo_livro;
    }
    else{
        throw new Error("Erro ao cadastrar livro.");
    }
};
function deletar_livro_service(id) {
    let livro = livro_repository.remover_livro_repository(id);
    if(livro){
        return livro;
    }
    else{
        throw new Error("livro inexistente.");
    }
};
function atualizar_livro_service(atributo, atributo_atualizado, id) {
    if(["id","titulo", "autor","ano"].includes(atributo)){
        const lista_atualizada = livro_repository.atualizar_livro_repository(id,atributo, atributo_atualizado);
        if(lista_atualizada){
            return lista_atualizada;
        } 
    } 
    else{
        throw new Error("Não foi possível atualizar o livro.");
    }
};
function retirar_livro_service(usuarioid, livroid) {
    const livro = livro_repository.livros.find(l => l.id == livroid)
    const usuario = usuario_repository.usuarios.find(l => l.id == usuarioid)
    if(!livro || livro.disponivel != true){
        throw new Error("O livro não está disponível para retirada.");
    }
    if(!usuario || usuario.livros.length >= 3){
        throw new Error("O usuário já possui o máximo de livros permitidos.");
    }
    return livro_repository.retirar_livro_repository(usuarioid, livroid);
};
function devolver_livro_service(usuarioid, livroid) {
    const livro = livro_repository.livros.find(l => l.id == livroid)
    const usuario = usuario_repository.usuarios.find(l => l.id == usuarioid)
    const livro_alugado = usuario.livros.find(l => l.id === livro.id);
    if (!livro_alugado) {
        throw new Error("Este livro não está alugado para este usuário.");
    }
    const data_atual = new Date();

    if (livro_alugado.data_entrega && livro_alugado.data_entrega < data_atual) {
        const soma_dias = Math.ceil((data_atual - livro_alugado.data_entrega) / (1000 * 60 * 60 * 24));
        console.log(`Atenção: Você está devolvendo o livro com ${soma_dias} dias de atraso.`);
    }
    return livro_repository.devolver_livro_repository(usuarioid, livroid);
};
module.exports = {
    listar_livro_service,
    cadastrar_livro_service,
    deletar_livro_service,
    atualizar_livro_service,
    retirar_livro_service,
    devolver_livro_service
    
};