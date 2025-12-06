
const PacienteModel = require('../models/PacienteModel');
const ConsultaModel = require('../models/ConsultaModel');

class PacienteController
{

   static async criar(req, res)
   {
      const paciente = new PacienteModel(req.body);

      await paciente.save()
         .then(resp => res.status(200).json(resp))
         .catch(err  => res.status(500).json(err));
   }


   static async atualizar(req, res)
   {
      await PacienteModel.findByIdAndUpdate(
         { _id: req.params.id },
         req.body,
         { new: true }
      )
      .then(resp => res.status(200).json(resp))
      .catch(err  => res.status(500).json(err));
   }

   
   static async listar(req, res)
   {
      let filtros = {};

      if (req.query.nome)
         filtros.nome = { $regex: req.query.nome, $options: 'i' };

      if (req.query.vinculo)
         filtros.vinculo = req.query.vinculo;

      await PacienteModel.find(filtros)
         .sort('nome')
         .then(resp => res.status(200).json(resp))
         .catch(err  => res.status(500).json(err));
   }


   static async buscar(req, res)
   {
      await PacienteModel.findById(req.params.id)
         .then(resp => res.status(200).json(resp))
         .catch(err  => res.status(500).json(err));
   }


   static async deletar(req, res)
   {
      const temConsulta = await ConsultaModel.findOne({ paciente_id: req.params.id });

      if (temConsulta) {
          return res.status(400).json({ 
              erro: 'Não é possível excluir o paciente pois existem consultas agendadas ou no histórico para ele.' 
          });
      }

      await PacienteModel.deleteOne({ _id: req.params.id })
         .then(resp => res.status(200).json(resp))
         .catch(err  => res.status(500).json(err));
   }

}

module.exports = PacienteController;