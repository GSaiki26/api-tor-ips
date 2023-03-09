// Libs
const mysql = require('mysql2'); // Faça a importação da lib do banco de dados.

// Functions
class Db { // Classe que será retornada ao require.
    async Db_Execute(querry) { // Função para a comunicação com o banco de dados.
        console.log('Iniciando Db_Execute()...');
        // Code 
        let code, result;
        await Db_Connect().then(async con => {
            try { // Tente executar a quarry.
                result = await con.query(querry);
                console.log(`A querry ${querry} foi executada com sucesso!`);
                code = 202;
            } catch (err) { // Em caso de erro, escreva o erro no console, e retorne 500;
                if (err.toString().indexOf('Duplicate entry') != -1) { // Caso seja encontrado este trecho do erro, o ip já foi adicionado.
                    console.log('O ip informado já foi adicionado!');
                    code = 406;
                } else {
                    console.log(`A querry não foi executada devido a um erro. Erro: ${err}`);
                    code = 500;
                }
            }
        });
        return [result, code];
    }
}
async function Db_Connect() { // Função que retornará a conexão com o banco de dados.
    console.log('Iniciando Db_Connect()...');
    // Code
    try {
        var con = mysql.createPool({ // Crie o objeto com as informações básicas.
            host:'mysql-con',
            user:'root',
            password:'Proof',
            database:'Proof'
        });
    } catch (err) {
        console.log(`Erro ao conectar-se ao Banco de Dados. Erro: ${err}`);
    }
    console.log('Conectado ao Banco de Dados com sucesso!');
    return con.promise();
}
// Code
module.exports = new Db(); // O modulo exportado será uma instância de Db.