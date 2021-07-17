// Lib - Divisão para a definição de bibliotecas.
const axios = require('axios'); // Importar axios para a utilização de requests.
const fs = require('fs'); // Importar para utilizar na leitura e escrita de arquivos.
const { exit } = require('process'); // Importar essa lib para o fechamento da API.

// Data - Divisão para guardar as váriaveis globais.
    // Variavel vai armezar as urls dos sites a serem 'lidos'.
const url = ['https://www.dan.me.uk/torlist/','http://onionoo.torproject.org/summary?limit=5000']; 
class API {
    async Get_AllIPs() { // Função que será chamada no Server.js
        return await Get_AllIPs(); // Chame a função NÃO LOCAL desse objeto.
    }
    async Get_IPs() {
        return null;
    }
    async Ban_IP(ip) {
        ip = '192.168.0.1';
        if (ip.length < 33) {
            const mySQL = require('mysql');
        } else {
            throw 'Ip no formato errado.';
        }
    }
}


// Functions - Divisão voltada às funções.
async function Get_IPListFromDanMe(ip) { // Tratar os ip do site: https://www.dan.me.uk/torlist/
    console.log('Iniciando Get_IPListFromDanMe().');
    // Data
    let res;

    // Code
    try { // Caso haja erro durante a request.
        res = await axios.get(url[0]); // Faça a request para o site.
        fs.writeFileSync('Danme.txt',threat);
    } catch (err){ 
        // Em caso de erro, leia o arquivo .txt
        fs.readFileSync('Danme.txt','utf-8',(err,data)=> {
            if (err) {console.log('A lista de IPs do Site https://www.dan.me.uk/torlist/ nao esta baixada e foi limitada!'); return ip}
            res = data;
        });
    }
    const threat = toString(res.data).split('\\n'); // De split na string retornada com cada Ip.
    for (let i = 0; i < threat;i++) {
        ip.list.push(['Name_Not_Defined',threat[i]]); // Loop para colocar todos os ips, na lista.
    }
    fs.writeFile('ip.json', JSON.stringify(ip), err=> {console.log(`API erro no FileStream.${err}`); exit();}); // Em caso de erro na request, feche o programa.
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
    for (let i = 0; i < threat.length;i++) {
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
    ip = await Get_IPListFromDanMe(ip);
    ip = await Get_IPListFromOnionoo(ip);
    return ip;
}

// Code - Divisão para código sem função.

module.exports = API;