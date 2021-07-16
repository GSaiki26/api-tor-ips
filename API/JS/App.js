// Lib - Divisão para a definição de bibliotecas.
const http = require('http'); // Importar request para a utilização de requests.
const fs = require('fs'); // Importar para utilizar na leitura e escrita de arquivos.

// Data - Divisão para guardar as váriaveis globais.

// Functions - Divisão voltada às funções.
function Get_AllIPs() {
    // Data
    let url = 'http://onionoo.torproject.org/summary?limit=5000'; // variavel vai armezar a url dos sites a serem 'lidos'.
    let ip = {
        'Data':`${new Date().getHours}:${new Date().getMinutes}`, // Aqui será feito a checagem de 30 minutos para se fazer a request.
        'List':[
            //['localhost',[127.0.0.1]] Comentada para usar como base.
        ]
    };
    //Tratar os ip do site: https://onionoo.torproject.org/summary?limit=5000
    let output=''; // Criar a variavel que vai armazenar os chunks do request.
    http.get(url,(res)=> {
        res.on('data',(chunk)=> {output+=chunk}); // Cada vez que houver data, ele irá adicionar o chunk da mesma na variavel definida.    });
    });
    console.log(output);
}
Get_AllIPs();