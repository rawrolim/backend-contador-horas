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

api.post("/login", authController.post);

api.post("/usuario", usuarioController.post);
api.get("/usuario", usuarioController.get);
api.get("/usuario/:id", usuarioController.get);
api.put("/usuario/:id", usuarioController.put);
api.delete("/usuario/:id", usuarioController.delete);

api.post("/controle_horario", controleHorarioController.post);
api.get("/controle_horario", controleHorarioController.get);
api.get("/controle_horario/:id", controleHorarioController.get);
api.put("/controle_horario/:id", controleHorarioController.put);
api.delete("/controle_horario/:id", controleHorarioController.delete);


module.exports = api;