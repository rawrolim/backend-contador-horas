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
api.post("/usuario", usuarioController.post);

api.get("/usuario", authController.verificaTokenMiddlware, usuarioController.get);
api.get("/usuario/:id", authController.verificaTokenMiddlware, usuarioController.get);
api.put("/usuario/:id", authController.verificaTokenMiddlware, usuarioController.put);
api.delete("/usuario/:id", authController.verificaTokenMiddlware, usuarioController.delete);

api.post("/controle_horario", authController.verificaTokenMiddlware, controleHorarioController.post);
api.post("/concluir", authController.verificaTokenMiddlware, controleHorarioController.concluir);
api.get("/controle_horario", authController.verificaTokenMiddlware, controleHorarioController.get);
api.get("/controle_horario/:id", authController.verificaTokenMiddlware, controleHorarioController.get);
api.put("/controle_horario/:id", authController.verificaTokenMiddlware, controleHorarioController.put);
api.delete("/controle_horario/:id", authController.verificaTokenMiddlware, controleHorarioController.delete);


module.exports = api;