const express = require('express');
const body_parser = require('body-parser');
const services = require('../services/livro.js');
const indx = express();
indx.use(body_parser.json());

async function listar_livros_controller(req, res) {
    try {
        const livros = await services.listar_livros_service();
        res.status(200).json(livros);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function cadastrar_livro_controller(req, res) {
    const livro = req.body;
    try {
        const livro_inserido = await services.cadastrar_livro_service(livro);
        res.status(201).json(livro_inserido);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function deletar_livro_controller(req, res) {
    try {
        const id = parseInt(req.params.id);
        const livro_deletado = await services.deletar_livro_service(id);
        res.json({ message: 'Livro deletado com sucesso!', livro: livro_deletado });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function atualizar_livro_controller(req, res) {
    const livro = req.body;
    const id = parseInt(req.params.id);
    try {
        const livro_atualizado = await services.atualizar_livro_service(id, livro);
        res.json(livro_atualizado);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function retirar_livro_controller(req, res) {
    const { id_usuario, id_livro } = req.body;
    try {
        const retirada = await services.retirar_livro_service(id_usuario, id_livro);
        res.status(200).json(retirada);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function devolver_livro_controller(req, res) {
    const { id_usuario, id_livro } = req.body;
    try {
        const devolucao = await services.devolver_livro_service(id_usuario, id_livro);
        res.status(200).json(devolucao);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    listar_livros_controller,
    cadastrar_livro_controller,
    deletar_livro_controller,
    atualizar_livro_controller,
    retirar_livro_controller,
    devolver_livro_controller
};
