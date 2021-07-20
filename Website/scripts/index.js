// Main Functions
async function Get_AllIPs() { // Função que será usada para conseguir todos os Ips;
    await Request('http://nodejs-con:2684/GetAllIPs','API_IPsList'); // Função que será usada para fazer o request Get da API.
}
async function Get_IPs() { // Função que será usada para conseguir a lista de Ips censurada.
    await Request('http://nodejs-con:2684/GetIPs','API_IPsList'); // Função que será usada para fazer o request Get da API.
}
async function Ban_IP() { // Função que banirá um ip do db.
    const opt = {
        method:'POST',
        Headers: {
            'ip':document.getElementById('Input_API_IP').value
        }
    };
    Request('http://nodejs-con:2684/Ban_IP','API_BanResult','opt');
}

// Functions
async function Request(url,tag,opt={method:'GET'}) { // Função que será usada para fazer o request Get da API.
    ClearOutput();
    fetch(url).then(res=>{ // Após a request, retorne a lista de Ips.
        const ips = JSON.parse(res.text()); // Converta o resultado da API para Json
        document.getElementById(tag).innerHTML = ips; // Escreva a lista de Ips.
    }).catch(err=> {
        document.getElementById(tag).innerHTML = err; // Escreva o erro na lista de Ips.
    });
}

function ClearOutput() { // Função que será usada para limpar os output do Request.
    document.getElementById('API_IPsList').innerHTML = '';
    document.getElementById('API_BanResult').innerHTML = '';
}