## Parar qualquer instância do container
./MySQL_Stop.sh;

## Criar a imagem no docker do MySQL
docker build -t mysql-img -f dockerfile .;

## Criar o container no docker do MySQL
docker run -d --name mysql-con mysql-img --link nodejs-con;

## Esperar o serviço do MySQL iniciar (Demorei horas para perceber isso)
echo Esperando 120 segundos para o serviço se iniciar.;
sleep 120s;

## Criar uma rede no docker para a conexão de ambos os containers (MySQL e NodeJS), e o colocar o container na mesma.

## Pegar bash dentro do container
echo 'Conseguindo a bash...\r\n'; 
docker exec -i 'mysql-con' mysql -uroot -pProof < MySQL_Default.sql;