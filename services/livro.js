const livro_repository = require('../repository/livro');
const usuario_repository = require('../repository/usuario');

async function listar_livros_service() {
    try {
        return await livro_repository.listar_livros_repository();
    } catch (err) {
        console.error('Erro ao listar livros:', err.message);
        throw new Error("Não foi possível listar livros.");
    }
}

async function cadastrar_livro_service(livro) {
    if (livro && livro.titulo && livro.autor && livro.ano) {
        try {
            return await livro_repository.cadastrar_livro_repository(livro);
        } catch (err) {
            console.error('Erro ao cadastrar livro:', err.message);
            throw new Error("Não foi possível cadastrar o livro.");
        }
    } else {
        throw new Error("Livro deve ter título, autor e ano.");
    }
}

async function deletar_livro_service(id) {
    try {
        const livro_deletado = await livro_repository.deletar_livro_repository(id);
        if (!livro_deletado) {
            throw new Error("Livro não encontrado para exclusão.");
        }
        return livro_deletado;
    } catch (err) {
        console.error('Erro ao deletar livro:', err.message);
        throw new Error("Não foi possível deletar o livro.");
    }
}

async function atualizar_livro_service(id, livro) {
    if (livro && livro.titulo && livro.autor && livro.ano) {
        try {
            const livro_atualizado = await livro_repository.atualizar_livro_repository(id, livro);
            if (!livro_atualizado) {
                throw new Error("Livro não encontrado para atualização.");
            }
            return livro_atualizado;
        } catch (err) {
            console.error('Erro ao atualizar livro:', err.message);
            throw new Error("Não foi possível atualizar o livro.");
        }
    } else {
        throw new Error("Livro deve ter título, autor e ano.");
    }
}

async function retirar_livro_service(id_usuario, id_livro) {
    try {
        return await livro_repository.retirar_livro_repository(id_usuario, id_livro);
    } catch (err) {
        console.error('Erro ao retirar livro:', err.message);
        throw new Error("Não foi possível retirar o livro.");
    }
}

async function devolver_livro_service(id_usuario, id_livro) {
    try {
        return await livro_repository.devolver_livro_repository(id_usuario, id_livro);
    } catch (err) {
        console.error('Erro ao devolver livro:', err.message);
        throw new Error("Não foi possível devolver o livro.");
    }
}

module.exports = {
    listar_livros_service,
    cadastrar_livro_service,
    deletar_livro_service,
    atualizar_livro_service,
    retirar_livro_service,
    devolver_livro_service
};
