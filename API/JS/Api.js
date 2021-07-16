// Lib - Divisão para a definição de bibliotecas.
const axios = require('axios'); // Importar axios para a utilização de requests.
const fs = require('fs'); // Importar para utilizar na leitura e escrita de arquivos.
const { exit } = require('process'); // Importar essa lib para o fechamento da API.

// Data - Divisão para guardar as váriaveis globais.
    // Variavel vai armezar as urls dos sites a serem 'lidos'.
const url = ['https://www.dan.me.uk/torlist/','http://onionoo.torproject.org/summary?limit=5000']; 

// Functions - Divisão voltada às funções.
async function Get_IPListFromDanMe(ip) { // Tratar os ip do site: https://www.dan.me.uk/torlist/
    let res;
    try { // Caso haja erro durante a request.
        res = await axios.get(url[0]); // Faça a request para o site.
    } catch (err){ 
        // Retorne esta mensagem na lista de IPs e retorne ip.
        if (ip.list.length == 0) {ip.list.push('A lista de IPs do Site https://www.dan.me.uk/torlist/ não está baixada e foi limitada!',[]); return ip}
        return ip; // Ele irá retornar IP pois já os ips já foram baixados para a maquina.
    }
    const threat = toString(res.data).split('\\n'); // De split na string retornada com cada Ip.
    for (let i = 0; i < threat;i++) {
        ip.list.push(['Name_Not_Defined',threat[i]]); // Loop para colocar todos os ips, na lista.
    }
    fs.writeFile('ip.json', JSON.stringify(ip),(err)=> {console.log(`API Erro: ${err}`); exit();}); // Em caso de erro na request, feche o programa.

}

async function Get_IPListFromOnionoo(ip) { // Tratar os ip do site: https://onionoo.torproject.org/summary?limit=5000
    try { // Caso haja erro durante a request.
        res = await axios.get(url[1]); // Fazer a request para o site de IPs 1.
    } catch (err) { // Em caso de erro, imprima o erro.
        console.log(err); exit();
    }
    threat = res.data.relays; // Threat agora é uma lista de Ip, nome do Ip e outras informações irrelevantes.
    for (let i = 0; i < threat.length;i++) {
        ip.list.push([threat[i].n,threat[i].a]); //Coloque os dados necessário dentro do objeto ip.
    }
    return ip;
}


// Main Functions - Divisão voltada para os 3 Endpoints.
async function Get_AllIPs() {
    // Data
    let ip = { // Aqui será feito a checagem de 30 minutos para se fazer a request.
        'list':[
            //['localhost',[127.0.0.1]] Comentada para usar como base. ['nome',['ip1','talvez ip2']]
        ]
    };
    //Code
    fs.readFile('ip.json',(err,data) => { // Ler o arquivo ip.json
        if (err) { // Tratamento de erro voltado para a checagem da existência do arquivo .json
            fs.writeFile('ip.json',JSON.stringify(ip),error => {console.log(error);exit();}); // Crie o arquivo ip.json com a data atual.
        } else {
            ip = JSON.parse(data);
        }
    });
    ip = await Get_IPListFromDanMe(ip);
    ip = await Get_IPListFromOnionoo(ip);
    return ip;
}

// Code - Divisão para código sem função.

module.exports = Get_AllIPs();