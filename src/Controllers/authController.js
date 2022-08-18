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
            userId: usuario.id, 
            userEmail: usuario.email, 
            exp: Math.floor(Date.now() / 1000) + (60 * 60),
            refreshToken: generateToken()
        };

        usuario.refreshToken = jwtData.refreshToken;

        try{
            await Usuario.findByIdAndUpdate(usuario.id, { refreshToken: usuario.refreshToken });
        }catch(err){
            throw Error("Erro para atualizar o refresh token no usuario.");
        }

        var token = jwt.sign(jwtData, process.env.SECRET_KEY);
        
        res.status(200).send({token});

    }catch(err){
        return res.status(400).send({erro: ''+err });
    }
}

exports.verificaToken = async (req, res) => {
    try {
        const usuario = await jwt.verify(req.body.token, process.env.SECRET_KEY);

        res.status(200).send({usuario});
    }catch(err){
        return res.status(400).send({erro: ''+err });
    }
}

exports.refreshToken = async (req,res) => {
    try{
        const usuario = Usuario.findOne({ refreshToken: req.body.refreshToken, email: req.body.email });

        if(!usuario){
            throw Error("Erro de refresh token");
        }

        const jwtData = { 
            userId: usuario.id, 
            userEmail: usuario.email, 
            exp: Math.floor(Date.now() / 1000) + (60),
            refreshToken: generateToken()
        };

        usuario.refreshToken = jwtData.refreshToken;

        try{
            await Usuario.findByIdAndUpdate(usuario.id, { refreshToken: usuario.refreshToken });
        }catch(err){
            throw Error("Erro para atualizar o refresh token no usuario.");
        }

        var token = jwt.sign(jwtData, process.env.SECRET_KEY);

        res.status(200).send({token});
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