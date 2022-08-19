const md5 = require("md5");
const Usuario = require("../Models/usuario");
const jwt = require('jsonwebtoken');

exports.login = async (req,res) => {
    try {
        const usuario = await Usuario.findOne({email:req.body.email, senha: md5(req.body.senha) });
        
        if(!usuario){
            throw Error("Erro de usuário");
        }

        const jwtData = { 
            userId: usuario._id, 
            userEmail: usuario.email, 
            exp: Math.floor(Date.now() / 1000) + (60 * 5),
            refreshToken: generateToken()
        };

        usuario.refreshToken = jwtData.refreshToken;

        try{
            await Usuario.findByIdAndUpdate(usuario._id, { refreshToken: usuario.refreshToken });
        }catch(err){
            throw Error("Erro para atualizar o refresh token no usuario.");
        }

        var token = jwt.sign(jwtData, process.env.SECRET_KEY);
        
        res.status(200).send({token});

    }catch(err){
        return res.status(400).send({erro: ''+err });
    }
}

exports.verificaToken = async (req, res, next) => {
    try {
        var usuario = jwt.verify(req.body.token, process.env.SECRET_KEY);
        
        var usuarioRs = await Usuario.findOne({ refreshToken: usuario.refreshToken, email: usuario.userEmail });

        if(!usuarioRs){
            throw Error("O refresh token enviado na requisição não é o mesmo do banco de dados.");
        }

        res.status(200).send({usuarioRs});
    }catch(err){
        return res.status(400).send({erro: ''+err });
    }
}

exports.verificaTokenMiddlware = async (req, res, next) => {
    try {
        var usuario = jwt.verify(req.body.token, process.env.SECRET_KEY);
        
        var usuarioRs = await Usuario.findOne({ refreshToken: usuario.refreshToken, email: usuario.userEmail });

        if(!usuarioRs){
            throw Error("O refresh token enviado na requisição não é o mesmo do banco de dados.");
        }

        next();
    }catch(err){
        return res.status(400).send({erro: ''+err });
    }
}

exports.refreshToken = async (req,res) => {
    try{
        const usuario = await Usuario.findOne({ refreshToken: req.body.refreshToken, email: req.body.email });

        if(!usuario){
            throw Error("Erro de refresh token");
        }

        const jwtData = { 
            userId: usuario._id, 
            userEmail: usuario.email, 
            exp: Math.floor(Date.now() / 1000) + (60 * 5),
            refreshToken: generateToken()
        };

        try{
            await Usuario.findByIdAndUpdate(usuario._id, { refreshToken: jwtData.refreshToken });
        }catch(err){
            throw Error("Erro para atualizar o refresh token no usuario.");
        }

        const token = jwt.sign(jwtData, process.env.SECRET_KEY);

        res.status(200).send({ token });
    }catch(err){
        return res.status(400).send({erro: ''+err });
    }
}


function rand(){
    return Math.random().toString(36).substr(2); 
};

function generateToken(){
    var token=""
    for(var i=0;i<16;i++){
        token += rand();
    }
    return token;
};