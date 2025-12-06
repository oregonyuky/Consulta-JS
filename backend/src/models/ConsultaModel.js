
const mongoose = require('../config/database');
const Schema = mongoose.Schema;

const Consulta = new Schema({

   paciente_id: { type: String, required: true },
   data: { type: Date, required: false },
   horario:{ type: String, required: false },
   con_original_id: { type: String, default: null },
   observacoes:{ type: String },
   termino: {type: Boolean, default: false},
   criada: {type: Date, default: Date.now()},
   tipo:
   {
      type: String,
      enum: ['Normal', 'Retorno', 'Urgência', 'Cirurgia'],
      required: true
   }
});

module.exports = mongoose.model('Consulta', Consulta);