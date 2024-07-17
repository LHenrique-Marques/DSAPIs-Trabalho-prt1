const express = require('express');
const body_parser = require('body-parser');
const services = require('../services/livro.js');
const app = express();
app.use(body_parser.json());
function listar_livro_controller(req,res) {
  try{
    res.json(services.listar_livro_service());
  }
  catch(err){
    res.status(500).json({error:err.message });
  }
};
function cadastrar_livro_controller(req,res) {
  try{
    res.status(201).json({message: 'livro cadastrado com sucesso!', livro:services.cadastrar_livro_service(req.body)});
  }
  catch(error){
    res.status(400).json({err:error.message });
  }
};
function deletar_livro_controller(req,res) {
  try{
    res.json({message:'livro deletado com sucesso!',livro:services.deletar_livro_service(parseInt(req.params.id))});
  }
  catch(error){
    res.status(400).json({err:error.message});
  }
};
function atualizar_livro_controller(req,res) {
  try{
    res.json({message:"Livro atualizado!",livro:services.atualizar_livro_service(req.body.atributo,req.body.atributo_atualizado,req.params.id)});
  }
  catch(err){
    res.status(400).json({error:err.message});
  }
};
function retirar_livro_controller(req,res) {
  const{usuarioid,livroid} = req.body
  try{
    services.retirar_livro_service(usuarioid,livroid);
    res.status(200).json({message:"Livro retirado com sucesso."});
  }
  catch(error) {
    res.status(400).json({err:error.message});
  }
};
function devolver_livro_controller(req,res){
  const{usuarioid,livroid} = req.body;
  try{
      services.devolver_livro_service(usuarioid, livroid);
      res.status(201).json({message: "O livro foi retornado."});
  } catch(err){
      res.status(400).json({err: err.message})
  }
};
module.exports = {
  listar_livro_controller,
  cadastrar_livro_controller,
  deletar_livro_controller,
  atualizar_livro_controller,
  retirar_livro_controller,
  devolver_livro_controller
};