
const mongoose = require('../config/database');
const Schema = mongoose.Schema;

const Paciente = new Schema({
   prontuario:{ type: String, required: true, unique: true },
   nome: { type: String, required: true },
   cpf: { type: String, required: true },
   nascimento:{ type: Date,   required: true },
   telefone: { type: String },
   endereco: { type: String },
   vinculo: 
   { 
      type: String,
      enum: ['Plano de Saúde', 'Particular'],
      required: true
   }
});

module.exports = mongoose.model('Paciente', Paciente);
