// Libs
const { Router } = require('express'); // Faça a importação do Router da lib Express para especificar cada caminho.

// Data
const api = require('./Api'); // Faça a importação da lib da API.
const router = Router(); // Instancie router

// Functions
function ReturnRes(res, code, message, err='') {
    res.status(code).send(message); // Retorne o response ao Client.
    if (code == 200) {
        console.log(`A conexão foi retornada com Status Code: ${code}\n`);
    } else if (code == 202) {
        console.log(`A conexão foi retornada com Status Code: ${code}\n`);
    } else if (code == 400) {
        console.log(`A conexão foi retornada com Status Code: ${code}\n`);
    } else {
        console.log(`A conexão foi retornada com Status Code: ${code}. Erro: ${err}\n`);
    }
}

// Code
router.get('/Get_AllIPs',(req,res) => { // Caso a request tenha este caminho, execute o código a frente.
    console.log('Conexão GET estabelecida em: /Get_AllIPs');
    api.Get_AllIPs().then(ip => { // Promise da API para conseguir todos os IPs.
        ReturnRes(res,200,ip); // Retorne para o client o response com código 200.
    }).catch((err) => { // Em caso de erro da Promise.
        ReturnRes(res,500,'Erro interno no servidor.', err); // Retorne para o client que o server crashou.
        
    });
});

router.get('/Get_IPs',(req,res) => {
    console.log('Conexão POST estabelecida em: /Get_IPs');
    api.Get_IPs().then(ip => { // Promise da API para conseguir a lista de IPs censurada.
        ReturnRes(res, ip[0], ip[1]); // Retorne o response ao Client caso dê certo.
    }).catch(err=> { // Em caso de erro da Promise.
        ReturnRes(res, 500, 'Erro interno no servidor', err);  // Retorne para o client que o server crashou.
    });
});

router.post('/Ban_IP',(req,res) => {
    console.log('Conexão POST estabelecida em: /Ban_IP');
    if (req.headers.ip != undefined) { // Se não houver ip no header, retorne erro.
        api.Ban_IP(req.headers.ip).then(code => { // Promise da API para o banimento de um IP.
            if (code == 400) { // Retorne o response com código 400 (Bad Request) ao Client.
                ReturnRes(res, 400, 'Formato da request incorreta.');
            } else if (code == 406) { // Retorne o responde com o código 406 (Not Acceptable) ao Client.
                ReturnRes(res, 406, 'O Ip informado ja adicionado.');
            }else { // Retorne o response com código 202 (Accepted) ao Client.
                ReturnRes(res, 202, 'O IP foi banido com sucesso.');
            }
        }).catch(err => {
            console.log(err);
            ReturnRes(res, 500, 'Erro interno no servidor.'); // Retorne o response com código 500 (Internal Server erro) ao Client.
        });
    } else { // Se não houver ip no header.
        ReturnRes(res,400, 'Formato da request incorreta, ip não encontrado.'); // Retorne o response com código 400 (Bad Request) ao Client.
    }
});

module.exports = router;