const services = require('../services/usuario.js');

async function listar_usuarios_controller(req, res) {
    try {
        const usuarios = await services.listar_usuarios_services();
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function cadastrar_usuario_controller(req, res) {
    const usuario = req.body;
    try {
        const usuario_inserido = await services.cadastrar_usuario_service(usuario);
        res.status(201).json(usuario_inserido);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    listar_usuarios_controller,
    cadastrar_usuario_controller
};
