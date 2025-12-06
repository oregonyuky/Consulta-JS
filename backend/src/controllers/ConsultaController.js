
const ConsultaModel = require('../models/ConsultaModel');

const {
   startOfDay, endOfDay,
   startOfWeek, endOfWeek,
   startOfMonth, endOfMonth,
   startOfYear, endOfYear
} = require('date-fns');

class ConsultaController
{
   static async criar(req, res)
   {
      const dados = req.body;
      const consulta = new ConsultaModel(dados);

      await consulta.save()
         .then(resultado => res.status(200).json(resultado))
         .catch(err => {
             console.error("ERRO AO CRIAR:", err);
             res.status(500).json(err);
         });
   }

   static async atualizar(req, res)
   {
      await ConsultaModel.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true })
         .then(resultado => res.status(200).json(resultado))
         .catch(err => {
             console.error("ERRO AO ATUALIZAR:", err);
             res.status(500).json(err);
         });
   }

   static async concluida(req, res)
   {
      await ConsultaModel.findByIdAndUpdate({ _id: req.params.id },{ termino: req.params.termino },{ new: true })
         .then(resultado => res.status(200).json(resultado))
         .catch(err => {
             console.error("ERRO AO CONCLUIR:", err);
             res.status(500).json(err);
         });
   }

   static async atrasadas(req, res) 
   {
      const hoje = new Date();
      
      let filtros = { 
          data: { $lt: hoje }, 
          termino: false 
      };

      if (req.query.tipo)
         filtros.tipo = req.query.tipo;

      if (req.query.paciente_id)
         filtros.paciente_id = req.query.paciente_id;

      await ConsultaModel.find(filtros)
         .sort('data')
         .then(resultado => res.status(200).json(resultado))
         .catch(err => {
             console.error("ERRO EM ATRASADAS:", err);
             res.status(500).json(err);
         });
   }

   static async listar(req, res)
   {
      let filtros = {};

      if (req.query.tipo)
         filtros.tipo = req.query.tipo;

      if (req.query.paciente_id)
         filtros.paciente_id = req.query.paciente_id;

      await ConsultaModel.find(filtros)
         .sort('data')
         .then(resultado => res.status(200).json(resultado))
         .catch(err => {
             console.error("ERRO AO LISTAR:", err);
             res.status(500).json(err);
         });
   }

   static async buscar(req, res)
   {
      await ConsultaModel.findById(req.params.id)
         .then(resultado => res.status(200).json(resultado))
         .catch(err => {
             console.error("ERRO AO BUSCAR:", err);
             res.status(500).json(err);
         });
   }

   static async deletar(req, res)
   {
      await ConsultaModel.deleteOne({ _id: req.params.id })
         .then(resultado => res.status(200).json(resultado))
         .catch(err => {
             console.error("ERRO AO DELETAR:", err);
             res.status(500).json(err);
         });
   }

   static async consultaHoje(req, res)
   {
      const hoje = new Date();
      let filtros = { data: { $gte: startOfDay(hoje), $lte: endOfDay(hoje) } };

      if (req.query.tipo) filtros.tipo = req.query.tipo;
      if (req.query.paciente_id) filtros.paciente_id = req.query.paciente_id;

      await ConsultaModel.find(filtros)
         .sort('data')
         .then(resultado => res.status(200).json(resultado))
         .catch(err => res.status(500).json(err));
   }

   static async consultaSemana(req, res)
   {
      const hoje = new Date();
      let filtros = { data:{$gte: startOfWeek(hoje), $lte: endOfWeek(hoje)} };

      if (req.query.tipo) filtros.tipo = req.query.tipo;
      if (req.query.paciente_id) filtros.paciente_id = req.query.paciente_id;

      await ConsultaModel.find(filtros)
      .sort('data')
      .then(resultado => res.status(200).json(resultado))
      .catch(err => res.status(500).json(err));
   }

   static async consultaMes(req, res)
   {
      const hoje = new Date();
      let filtros = { data:{$gte: startOfMonth(hoje), $lte: endOfMonth(hoje)} };

      if (req.query.tipo) filtros.tipo = req.query.tipo;
      if (req.query.paciente_id) filtros.paciente_id = req.query.paciente_id;

      await ConsultaModel.find(filtros)
         .sort('data')
         .then(resultado => res.status(200).json(resultado))
         .catch(err => res.status(500).json(err));
   }

   static async consultaAno(req, res)
   {
      const hoje = new Date();
      let filtros = { data: {$gte: startOfYear(hoje),$lte: endOfYear(hoje)} };

      if (req.query.tipo) filtros.tipo = req.query.tipo;
      if (req.query.paciente_id) filtros.paciente_id = req.query.paciente_id;

      await ConsultaModel.find(filtros)
         .sort('data')
         .then(resultado => res.status(200).json(resultado))
         .catch(err => res.status(500).json(err));
   }
}

module.exports = ConsultaController;