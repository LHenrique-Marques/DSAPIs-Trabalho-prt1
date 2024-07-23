const autor_repository = require('../repository/autor');

async function listar_autores_services() {
    try {
        return await autor_repository.listar_autores_repository();
    } catch (err) {
        console.error('Erro ao listar autores:', err.message);
        throw new Error("Não foi possível listar autores.");
    }
}

async function cadastrar_autor_services(autor) {
    if (autor && autor.nome && autor.nacionalidade) {
        try {
            return await autor_repository.cadastrar_autor_repository(autor);
        } catch (err) {
            console.error('Erro ao cadastrar autor:', err.message);
            throw new Error("Não foi possível cadastrar o autor.");
        }
    } else {
        throw new Error("Autor deve ter nome e nacionalidade.");
    }
}

async function buscar_por_id_services(id) {
    try {
        const autor = await autor_repository.buscar_por_id_repository(id);
        if (!autor) {
            throw new Error("Autor não encontrado.");
        }
        return autor;
    } catch (err) {
        console.error('Erro ao buscar autor por ID:', err.message);
        throw new Error("Não foi possível encontrar o autor.");
    }
}

async function atualizar_autor_services(id, autor) {
    if (autor && autor.nome && autor.nacionalidade) {
        try {
            const autor_atualizado = await autor_repository.atualizar_autor_repository(id, autor);
            if (!autor_atualizado) {
                throw new Error("Autor não encontrado para atualização.");
            }
            return autor_atualizado;
        } catch (err) {
            console.error('Erro ao atualizar autor:', err.message);
            throw new Error("Não foi possível atualizar o autor.");
        }
    } else {
        throw new Error("Autor deve ter nome e nacionalidade.");
    }
}

async function deletar_autor_services(id) {
    try {
        const autor_deletado = await autor_repository.deletar_autor_repository(id);
        if (!autor_deletado) {
            throw new Error("Autor não encontrado para exclusão.");
        }
        return autor_deletado;
    } catch (err) {
        console.error('Erro ao deletar autor:', err.message);
        throw new Error("Não foi possível deletar o autor.");
    }
}

module.exports = {
    listar_autores_services,
    cadastrar_autor_services,
    buscar_por_id_services,
    atualizar_autor_services,
    deletar_autor_services
};
