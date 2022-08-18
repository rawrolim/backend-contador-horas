const Usuario = require("../Models/usuario");
const md5 = require("md5");

exports.post = async (req,res) => {
    try {
        req.body.senha=md5(req.body.senha);
        const usuario = await Usuario.create(req.body);
        return res.status(200).send({ usuario });
    }catch(err){
        return res.status(400).send({erro: ''+err });
    }
}

exports.get = async (req, res) => {
    try {
        var usuarios;
        if(req.params.id){
            usuarios = await Usuario.findOne({"_id":req.params.id})
        }else{
            usuarios = await Usuario.find({status:true});
        }
        return res.status(200).send({usuarios});
    }catch(err){
        return res.status(400).send({erro: ''+err });
    }
}

exports.put = async (req, res) => {
    try {
        await Usuario.findByIdAndUpdate(req.params.id, req.body);
        const usuario = await Usuario.findOne({ "_id": req.params.id });
        return res.status(200).send({ usuario });
    } catch(err){
        return res.status(400).send({erro: ''+err });
    }
}

exports.delete = async (req,res) => {
    try {
        await Usuario.findByIdAndUpdate(req.params.id, { status: false });
        const usuario = await Usuario.findOne({ "_id": req.params.id });
        return res.status(200).send({ usuario });
    } catch(err){
        return res.status(400).send({erro: ''+err });
    }
}