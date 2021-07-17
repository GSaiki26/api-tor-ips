## Parar qualquer instância do container.
./NodeJS_Stop.sh;

## Criar a imagem no docker do Node.
docker build -t nodejs-img -f dockerfile .;

## Criar o container no docker do Node.
docker run --name nodejs-con nodejs-img;