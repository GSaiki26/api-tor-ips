# Rest API - Tor IPs list

## Descrição:

Basicamente, o objetivo deste projeto é a criação de uma Rest API que possua 3 endpoints:

- Endpoint GET: Aqui será a request no método GET será usada para se conseguir todos os IPs da lista;
```
    GET /ip
```

- Endpoint DELETE: Já a request no método POST com a informação de um IP Tor;
```
    DELETE /ip
```

- Endpoint GET: Por fim, outro request GET que retornará a lista de todos os IPs Tor menos aqueles que foram recebidos pelo endpoint POST.
```
    GET /ip/all
```

## Documentação:

### Requisitos:

Para conseguir iniciar o programa corretamente, será necessário ser feito a instalação dos seguintes programas:

- Docker;

- Docker-Compose;

Apenas com a instalação destes dois programas, a instalação de outros serviços como o NodeJS, Postgres e o python, serão feitos dentro dos containers do Docker.

### Inicialização:

Para se iniciar o projeto, será necessário seguir os seguintes passos:

1. Executar o seguinte comando:

- `docker-compose up; // Aqui será feito a inicialização dos containers.`

### Uso:

- **_API GET /ip/all:_** Basta fazer uma requisição GET para este Endpoint que será retornado um objeto JSON com uma array ('list') de Ips Tor, sendo nome uma string e uma array de seu seus ips. Em caso de operação bem sucedida, retorna 200.

- **_API GET /ip:_** Neste Endpoint GET, será retornado uma array "censurada", isto é, será apenas retornado uma array de Ips Tor que nãopossuem registros no Banco de Dados da API. Em caso de operação bem sucedida, retorna 200.

- **_API DELETE /ip/:ip:_** Por fim, temos o Endpoint POST, que para seu uso, será necessário fornecer o ip INDIVIDUALMENTE no Header da request com o simples nome de ip. Exemplo: '100.10.14.116'. Em caso de operação bem sucedida, retorne 202, enquanto para ip inválido, retorne 406, e por ultimo em caso da API não encontrar o ip no header, retorne 400;
