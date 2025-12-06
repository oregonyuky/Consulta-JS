const express = require('express');
const rotas = express.Router();

const PacienteController = require('../controllers/PacienteController');
const PacienteValidate = require('../middlewares/PacienteValidate');


rotas.post('/', PacienteValidate, PacienteController.criar);


rotas.put('/:id', PacienteValidate, PacienteController.atualizar);


rotas.get('/', PacienteController.listar);
rotas.get('/:id', PacienteController.buscar);


rotas.delete('/:id', PacienteController.deletar);

module.exports = rotas;