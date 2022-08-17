const Usuario = require("../Models/usuario");

exports.post = async (req,res) => {
    try {
        const usuario = await Usuario.create(req.body);
        return res.send({ usuario });
    }catch(err){
        return res.status(400).send({erro: 'Auth fail' });
    }
}