const express = require('express');
const body_parser = require('body-parser');
const services = require('../services/autor.js');
const indx = express();
indx.use(body_parser.json());

async function listar_autores_controller(req, res) {
    try {
        const autores = await services.listar_autores_services();
        res.status(200).json(autores);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function cadastrar_autor_controller(req, res) {
    const autor = req.body;
    try {
        const autor_inserido = await services.cadastrar_autor_services(autor);
        res.status(201).json(autor_inserido);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function deletar_autor_controller(req, res) {
    try {
        const id = parseInt(req.params.id);
        const autor_deletado = await services.deletar_autor_services(id);
        res.json({ message: 'Autor deletado com sucesso!', autor: autor_deletado });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function atualizar_autor_controller(req, res) {
    const autor = req.body;
    const id = parseInt(req.params.id);
    try {
        const autor_atualizado = await services.atualizar_autor_services(id, autor);
        res.json(autor_atualizado);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    listar_autores_controller,
    cadastrar_autor_controller,
    deletar_autor_controller,
    atualizar_autor_controller
};
