const mongoose = require('mongoose');
const url = 'mongodb://127.0.0.1:27017/projeto2B';

mongoose.connect(url)
    .catch(err => console.error("Erro ao conectar no MongoDB:", err));

module.exports = mongoose;