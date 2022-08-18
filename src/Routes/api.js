const express = require("express");
const authController = require('../Controllers/authController');
const usuarioController = require('../Controllers/usuarioController');
const controleHorarioController = require('../Controllers/controleHorarioController');

const api = express.Router();

api.get("/", function(req,res,next){
    res.status(200).send({
        title: "Rota de API"
    });
});

api.post("/login", authController.login);
api.post("/refresh_token", authController.refreshToken);
api.post("/verifica_token", authController.verificaToken);

api.post("/usuario", authController.verificaToken, usuarioController.post);
api.get("/usuario", authController.verificaToken, usuarioController.get);
api.get("/usuario/:id", authController.verificaToken, usuarioController.get);
api.put("/usuario/:id", authController.verificaToken, usuarioController.put);
api.delete("/usuario/:id", authController.verificaToken, usuarioController.delete);

api.post("/controle_horario", authController.verificaToken, controleHorarioController.post);
api.post("/concluir", authController.verificaToken, controleHorarioController.concluir);
api.get("/controle_horario", authController.verificaToken, controleHorarioController.get);
api.get("/controle_horario/:id", authController.verificaToken, controleHorarioController.get);
api.put("/controle_horario/:id", authController.verificaToken, controleHorarioController.put);
api.delete("/controle_horario/:id", authController.verificaToken, controleHorarioController.delete);


module.exports = api;