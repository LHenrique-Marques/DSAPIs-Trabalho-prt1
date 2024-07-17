const express = require("express");
const rota = express.Router();
const autor_controller = require("../controllers/autor.js");
rota.get("/", autor_controller.listar_autores_controller);
rota.post("/", autor_controller.cadastrar_autor_controller);
rota.post("/deletar/:id", autor_controller.deletar_autor_controller);
rota.put("/atualizar/:id", autor_controller.atualizar_autor_controller);
module.exports = rota;
