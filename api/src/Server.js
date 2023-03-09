// Lib - Divisão para a definição de bibliotecas.
const express = require('express'); // Faça a importação da lib para a criação do server

// Data - Divisão para guardar as váriaveis globais.
const port = 2684; // Declarar a porta que o server irá abrir.
const server = express(); // Defina server com o valor de express
const api = require('./Api.js'); // Importe a instância da API.
const router = require('./Routes.js'); // Importe o router.

// Code - Divisão para código sem função.
server.use(router); // use as rotas do router.js .
server.listen(port); // Coloque o servidor online.
console.log(`A API esta ligada na porta ${port}`);