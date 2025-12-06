
const PacienteModel = require('../models/PacienteModel');

const PacienteValidate = async (req, resp, next) => 
{
    const { nome, cpf, nascimento, vinculo, prontuario } = req.body;


    if (!nome)
        return resp.status(400).json({ erro: 'O nome é obrigatório' });

    else if (!cpf)
        return resp.status(400).json({ erro: 'O CPF é obrigatório' });

    else if (!nascimento)
        return resp.status(400).json({ erro: 'A data de nascimento é obrigatória' });

    else if (!vinculo)
        return resp.status(400).json({ erro: 'O vínculo é obrigatório' });

    else if (!prontuario)
        return resp.status(400).json({ erro: 'O prontuário é obrigatório' });


    let existeCPF;

    if (req.params.id)
        existeCPF = await PacienteModel.findOne({cpf: cpf,_id: { $ne: req.params.id }});
    
    else
        existeCPF = await PacienteModel.findOne({ cpf: cpf });


    if (existeCPF)
        return resp.status(400).json({ erro: 'Já existe paciente com esse CPF' });


    let existeProntuario;

    if (req.params.id)
        existeProntuario = await PacienteModel.findOne({prontuario: prontuario,_id: { $ne: req.params.id }});
    
    else
        existeProntuario = await PacienteModel.findOne({ prontuario: prontuario });

    if (existeProntuario)
        return resp.status(400).json({ erro: 'Prontuário já cadastrado' });

    next();
};

module.exports = PacienteValidate;