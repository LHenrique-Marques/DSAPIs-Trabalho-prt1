const services = require('../services/usuario.js');
function listar_usuarios_controller(req,res){
    res.json(services.listar_usuarios_services());
}
function inserir_usuario_controller(req,res){
    let usuario = req.body;
    try{
        res.status(201).json(services.cadastrar_usuario_services(usuario));
    } 
    catch(err){
        res.status(err.id).json(err);
    }    
}
function buscar_por_id_controller(req,res){  
    try{
        res.json(services.autenticar_usuario_services(+req.params.id));
    }
    catch(err){
        res.status(err.id).json(err);
    }        
}
module.exports = {
    listar_usuarios_controller,
    inserir_usuario_controller,
    buscar_por_id_controller
}