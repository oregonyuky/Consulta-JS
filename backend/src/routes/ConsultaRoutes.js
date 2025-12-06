
const express = require('express');
const rotas = express.Router();

const ConsultaController = require('../controllers/ConsultaController');
const ConsultaValidate = require('../middlewares/ConsultaValidate');


rotas.post('/', ConsultaValidate, ConsultaController.criar);


rotas.put('/:id', ConsultaValidate, ConsultaController.atualizar);
rotas.put('/concluida/:id/:termino', ConsultaController.concluida);


rotas.get('/atrasadas', ConsultaController.atrasadas);
rotas.get('/hoje', ConsultaController.consultaHoje);
rotas.get('/semana', ConsultaController.consultaSemana);
rotas.get('/mes', ConsultaController.consultaMes);
rotas.get('/ano', ConsultaController.consultaAno);


rotas.get('/', ConsultaController.listar);
rotas.get('/:id', ConsultaController.buscar);

rotas.delete('/:id', ConsultaController.deletar);

module.exports = rotas;