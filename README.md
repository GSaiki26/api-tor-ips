# Rest API - Tor IPs list

## Descrição:
Basicamente, o objetivo deste projeto é a criação de uma Rest API que possua 3 endpoints:

* Endpoint GET: Aqui será a request no método GET será usada para se conseguir todos os IPs da lista;

* Endpoint POST: Já a request no método POST com a informação de um IP Tor;

* Endpoint GET: Por fim, outro request GET que retornará a lista de todos os IPs Tor menos aqueles que foram recebidos pelo endpoint POST.

## Documentação:

### Requisitos:
Para conseguir iniciar o programa corretamente, será necessário ser feito a instalação dos seguintes programas:

* Docker;

* Docker-Compose;

Apenas com a instalação destes dois programas, a instalação de outros serviços como o NodeJS, MySQL PHP, serão feitos dentro dos containers do Docker.

### Inicialização:
Para se iniciar a API, será necessário seguir os seguintes passos:

1. Executar o arquivo ***Start_Docker.sh*** presente na pasta raiz do projeto ou utilizar o seguinte comando do docker-compose:
```docker-compose up; // Aqui será feito a inicialização dos containers.```

2. Esperar os serviços do container MySQL se inicializarem e executar o arquivo: ***Start_MySQL.sh*** presente na pasta raiz, ou executar o comando: 
``` docker exec -i mysql-con mysql -uroot -pProof < SQL_BasicSyntax.sql;1 // Já aqui, o esquema padrão do banco de dados - ou seja, o database e o table que serão utilizados dentro da API - será salvo dentro do container. ```


### Uso:
API/Get_AllIPs: Basta fazer uma requisição GET para este Endpoint que será retornado um objeto JSON com uma array ('list') de Ips Tor, sendo nome uma string e uma array de seu seus ips. Em caso de operação bem sucedida, retorna 200.

API/Get_IPs: Neste Endpoint GET, será retornado uma array "censurada", isto é, será apenas retornado uma array de Ips Tor que nãopossuem registros no Banco de Dados da API. Em caso de operação bem sucedida, retorna 200.

API/Ban_IP: Por fim, temos o Endpoint POST, que para seu uso, será necessário fornecer o ip INDIVIDUALMENTE no Header da request com o simples nome de ip. Exemplo: '100.10.14.116'. Em caso de operação bem sucedida, retorne 202, enquanto para ip inválido, retorne 406.