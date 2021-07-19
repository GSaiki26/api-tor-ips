// Lib - Divisão para a definição de bibliotecas.
const axios = require('axios'); // Importar axios para a utilização de requests.
const fs = require('fs'); // Importar para utilizar na leitura e escrita de arquivos.
const db = require('./Db'); // Importar a instância do db.

// Data - Divisão para guardar as váriaveis globais.
    // Variavel vai armezar as urls dos sites a serem 'lidos'.
const url = ['https://www.dan.me.uk/torlist/','http://onionoo.torproject.org/summary?limit=5000'];
let dbStarted = false; // Variavel que vai armazenar a informação se o banco de dados ja foi inicializado.
class API {
    async Get_AllIPs() { // Função que será chamada no Server.js
        return await Get_AllIPs(); // Chame a função NÃO LOCAL desse objeto.
    }
    async Get_IPs() { 
        return await Get_IPs() // Conseguir a lista de Ips censuradas.
    }
    async Ban_IP(ip) { // Chame a função que será usada para fazer uma querry ao Db.
        const code = await Ban_IP(ip).catch(err => { // Em caso de erro, durante a promise:
            console.log('Erro durante Ban_IP() '+err); // Defina code como 500 para (Internal server error).
            code = 500; 
        });
        return code;
    }
}
// Functions - Divisão voltada às funções.
async function Get_IPListFromDanMe(ip) { // Tratar os ip do site: https://www.dan.me.uk/torlist/
    console.log('Iniciando Get_IPListFromDanMe().');
    // Data
    let threat = ''; // Declaração para o uso dentro do escopo do try abaixo.
    // Code
    res = await axios.get(url[0]).then(async res => { // Faça a request para o site.
        console.log('Get_IPListFromDanMe(): Request deDanme Aceita com sucesso!');
        fs.writeFileSync('Danme.txt',res.data); // Escreva o conteudo do site em um json, para o uso quando a request for mal sucedida.
        res = res.data.replace('\\n','\n'); // res ficará com o valor de data por culpa do salvamento de dados dentro de um arquivo.
    }).catch(async err => { // Em caso de erro, leia o arquivo .txt
        console.log('Request de Danme Recusada! Lendo arquivo Danme.txt');
        try {
            const res = await fs.readFileSync('./Danme.txt').toString(); // Leia o arquivo com os ips armazenados do site Danme.
            threat = res; // Defina threat como res, para o tratamento do dados abaixo.
        } catch (error) { // Em caso de erro, será retornado a lista completamente vazia à função que o chamou.
            console.log('A lista de IPs do Site https://www.dan.me.uk/torlist/ nao esta baixada e foi limitada!'); 
            return ip;
        };
    });
    threat = threat.split('\n'); // De split na string retornada com cada Ip.
    for (let i = 0; i < threat.length;i++) { // Um loop para cada elemento dentro da Array.
        ip.list.push(['UNNAMED',[threat[i]]]); // Loop para colocar todos os ips, na lista.
    }
    return ip; // Retorne Ip com a lista de IPs já escrito no arquivo!
}

async function Get_IPListFromOnionoo(ip) { // Tratar os ip do site: https://onionoo.torproject.org/summary?limit=5000
    console.log('Iniciando Get_IPListFromOnionoo().');
    // Code
    try { // Caso haja erro durante a request.
        res = await axios.get(url[1]); // Fazer a request para o site de IPs 1.
    } catch (err) { // Em caso de erro, imprima o erro.
        console.log(`API erro na request ao Onionoo. Erro: ${err}`);
    }
    threat = res.data.relays; // Threat agora é uma lista de Ip, nome do Ip e outras informações irrelevantes.
    for (let i = 0; i < threat.length;i++) { // Um loop para cada elemento dentro da Array.
        ip.list.push([threat[i].n,threat[i].a]); //Coloque os dados necessário dentro do objeto ip.
    }
    return ip;
}

// Main Functions - Divisão voltada para os 3 Endpoints.
async function Get_AllIPs() {
    console.log('Iniciando get_ALLIps().');
    // Data
    let ip = { // Aqui será feito a checagem de 30 minutos para se fazer a request.
        'list':[
            //['localhost',[127.0.0.1]] Comentada para usar como base. ['nome',['ip1','talvez ip2']]
        ]
    };
   
    //Code
    ip = await Get_IPListFromDanMe(ip); // Chame a função que retornada a Lista de Ips do DanMe. Nota: Os Ips não possuem nome, logo, eles serão marcados como "UNNAMED".
    ip = await Get_IPListFromOnionoo(ip); // Chame a função que retornada a Lista de Ips do Onionoo.
    return ip;
}

async function Get_Ips() { // Função que retornará a lista de Ips censurada.

}

async function Ban_IP(ip) { // Função que servirá para banir ip do site.
    console.log(`Iniciando Ban_IP(ip:${ip}).`);
    // Data
    let code = 202; // Variavel definida para se conseguir o código de retorno final.
    // Code
    if (!(ip.length >= 11 && ip.length <= 16) || (ip.length == 40)) { // Essa é uma limitação da quantidade de caracteres do ip recebido.
        code = 400; return code;
    }
    await db.Db_Execute(`INSERT INTO Banned_IPs VALUES (${ip});`).then(result=>{
        code = result; // Result será o valor do status code.
    });
    return code;
}

// Code - Divisão para código sem função.

module.exports = new API();