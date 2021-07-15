// Libs - Uma "Divisória" para as bibliotecas
const express = require('express'); // Importar a lib Express

// Data
const app = express();

// Methods - "Divisória" para todos os métodos
app.get('/Get-AllIPs',(req, res) => { // Caso seja feito uma request GET no '/Get-AllIps'
    const App = require('./App');
    res.status('200').send(App.yo);
});

// Code - "Divisória" para todo o código que será executado.
const port = 80;
app.listen(port,() => {
    console.log(`Server online na porta ${port}`);
})