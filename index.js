const express = require('express');
const indx = express();
const porta = 8800;
const autor_router = require('./routes/autor.js'); 
const livro_router = require('./routes/livro.js'); 
const usuario_router = require('./routes/usuario.js'); 
indx.use(express.json());
indx.use("/autor", autor_router);
indx.use("/livro", livro_router);
indx.use("/usuario", usuario_router);
indx.listen(porta, ()=> {
    console.log("Link do Servidor: "+porta);
})
























