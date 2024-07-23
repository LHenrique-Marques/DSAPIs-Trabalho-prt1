const express = require('express')
const rota = express.Router();
const usuario_controller = require('../controllers/usuario.js');
rota.get("/", usuario_controller.listar_usuarios_controller);
rota.post("/", usuario_controller.cadastrar_usuario_controller);
module.exports = rota;