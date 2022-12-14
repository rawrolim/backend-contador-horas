const ControleHorario = require("../Models/controleHorario");

exports.post = async (req,res) => {
    try {
        const controleHorario = await ControleHorario.create(req.body);
        return res.status(200).send({ controleHorario });
    }catch(err){
        return res.status(400).send({erro: ''+err });
    }
}

exports.get = async (req, res) => {
    try {
        var controleHorarios;
        if(req.header("usuario_id")){
            controleHorarios = await ControleHorario.find({"usuario_id": req.header("usuario_id")});
        }else if(req.params){
            controleHorarios = await ControleHorario.find(req.params);
        }else{
            controleHorarios = await ControleHorario.find();
        }
        return res.status(200).send({controleHorarios});
    }catch(err){
        return res.status(400).send({erro: ''+err });
    }
}

exports.put = async (req, res) => {
    try {
        await ControleHorario.findByIdAndUpdate(req.params.id, req.body);
        const controleHorario = await ControleHorario.findOne({ "_id": req.params.id });
        return res.status(200).send({ controleHorario });
    } catch(err){
        return res.status(400).send({erro: ''+err });
    }
}

exports.delete = async (req,res) => {
    try {
        await ControleHorario.findByIdAndDelete(req.body.id);
        return res.status(200).send({});
    } catch(err){
        return res.status(400).send({erro: ''+err });
    }
}

exports.concluir = async (req,res) => {
    try {
        await ControleHorario.findByIdAndUpdate(req.params.id, { status: true, data_hora_fim: Date.now });
        const controleHorario = await ControleHorario.findOne({ "_id": req.params.id });
        return res.status(200).send({ controleHorario });
    } catch(err){
        return res.status(400).send({erro: ''+err });
    }
}