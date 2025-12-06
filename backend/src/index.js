// TRABALHO LP 2
// Felipe Akio Nishimura
// Gabriel Rozendo Pontes
// José Vitor Vernize Martos

const express = require('express');
const cors = require('cors');
const chalk = require('chalk');
const ConsultaRoutes = require('./routes/ConsultaRoutes');
const PacienteRoutes = require('./routes/PacienteRoutes');

const app = express();                 
const port = 5000;                     
const host = 'localhost';              

app.use(cors());                       
app.use(express.json());               
app.use('/consulta', ConsultaRoutes);  
app.use('/paciente', PacienteRoutes);  


app.listen(port, async () =>
{
   console.clear();
   console.log('Servidor rodando com sucesso!');
   console.log(`http://${host}:${port}`);
   console.log('mongodb://127.0.0.1:27017/projeto2B');
});