// Lib - Divisão para a definição de bibliotecas.
const http = require('http'); // Faça a importação da lib para a criação do server


// Data - Divisão para guardar as váriaveis globais.
const API = require('Api.js');
const port = 80;

// Functions - Divisão voltada às funções.


// Code - Divisão para código sem função.
http.createServer().listen(port);