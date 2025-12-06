
const ConsultaModel = require('../models/ConsultaModel');
const PacienteModel = require('../models/PacienteModel');
const { isPast, addHours, subHours, addDays } = require('date-fns');

const ConsultaValidate = async (req, resp, next) => 
{
   const { tipo, paciente_id, descricao, data, consulta_original_id } = req.body;


   if (!tipo)
      return resp.status(400).json({ erro: 'O tipo é obrigatório' });

   else if (!paciente_id)
      return resp.status(400).json({ erro: 'O paciente é obrigatório' });

   else if (!descricao)
      return resp.status(400).json({ erro: 'A descrição é obrigatória' });

   else if (!data)
      return resp.status(400).json({ erro: 'A data é obrigatória' });

   const paciente = await PacienteModel.findById(paciente_id);
   
   if (!paciente)
      return resp.status(400).json({ erro: 'Paciente não encontrado' });

   const dataConsulta = new Date(data);

   if (tipo === "Urgência" && isPast(dataConsulta))
      return resp.status(400).json({ erro: 'Consulta de urgência não pode ser no passado' });

   
   if (tipo === "Retorno")
   {
      if (!consulta_original_id)
         return resp.status(400).json({ erro: 'Retorno precisa de consulta_original_id' });

      const original = await ConsultaModel.findById(consulta_original_id);

      if (!original)
         return resp.status(400).json({ erro: 'Consulta original não encontrada' });

      const min = addDays(original.data, 20);
      const max = addDays(original.data, 30);

      if (dataConsulta < min || dataConsulta > max)
         return resp.status(400).json({ erro: 'Retorno deve ser 20 a 30 dias após a consulta original'});
   }

   const inicioJanela = subHours(dataConsulta, 5);
   
   let queryCirurgiaAnterior = { 
       tipo: 'Cirurgia', 
       data: { $gt: inicioJanela, $lte: dataConsulta } 
   };


   if (req.params.id) {
       queryCirurgiaAnterior._id = { $ne: req.params.id };
   }

   const bloqueioCirurgia = await ConsultaModel.findOne(queryCirurgiaAnterior);

   if (bloqueioCirurgia)
       return resp.status(400).json({erro: 'Horário bloqueado devido a uma Cirurgia em andamento.'});

   if (tipo === "Cirurgia")
   {
      const fim = addHours(dataConsulta, 5);
      
      let queryConflitoFuturo = { 
          data: { $gt: dataConsulta, $lte: fim } 
      };

      if (req.params.id) {
          queryConflitoFuturo._id = { $ne: req.params.id };
      }

      const conflito = await ConsultaModel.findOne(queryConflitoFuturo);

      if (conflito)
         return resp.status(400).json({erro: 'Esta cirurgia conflita com agendamentos nas próximas 5 horas.'});
   }


   if (tipo !== 'Urgência') { 
       let existe;

       if (req.params.id) 
          existe = await ConsultaModel.findOne({data: { $eq: dataConsulta },_id: { $ne: req.params.id }});
       else 
          existe = await ConsultaModel.findOne({data: { $eq: dataConsulta }});
       
       if (existe)
          return resp.status(400).json({ erro: 'Já existe consulta nesse horário' });
   }

   next();
};

module.exports = ConsultaValidate;