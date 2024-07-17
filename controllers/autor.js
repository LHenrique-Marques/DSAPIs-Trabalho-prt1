const express = require('express');
const body_parser = require('body-parser');
const services = require('../services/autor.js');
const indx = express();
indx.use(body_parser.json());
function listar_autores_controller(req,res) {
  try{
    res.json(services.listar_autores_services());
  } 
  catch(error){
    res.status(500).json({error:error.message});
  }
};
function cadastrar_autor_controller(req,res) {
  try{
    res.status(201).json({message:'Autor cadastrado!',autor: services.cadastrar_autor_services(req.body)});
  }
  catch(error){
    res.status(400).json({error:error.message});
  }
};
function deletar_autor_controller(req,res) {
  try{
    res.json({message:'Autor deletado!',autor:services.deletar_autor_services(parseInt(req.params.id))});
  }
  catch(error){
    res.status(400).json({error:error.message});
  }
};
function atualizar_autor_controller(req,res){
  try{
    res.json({message:"Autor atualizado!",autor:services.atualizar_autor_services(req.body.atributo,req.body.atributo_atualizado,req.params.id)});
  }
  catch(erro){
    res.status(400).json({error:erro.message});
  }
};
module.exports = {
  listar_autores_controller,
  cadastrar_autor_controller,
  deletar_autor_controller,
  atualizar_autor_controller
};