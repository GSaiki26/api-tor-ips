// Libs
const mysql = require('mysql2'); // Faça a importação da lib do banco de dados.

// Functions
class Db { // Classe que será retornada ao require.
    async Db_Connect() { // Função que retornará a conexão com o banco de dados.
        console.log('Iniciando Db_Connect().');
        const con = mysql.createPool({
            host:'mysql-con',
            user:'root',
            password:'Proof',
            database:'Proof'
        });
        console.log('Conectado ao Banco de Dados com sucesso!');
        return con;
    }
    
    async Db_Execute(querry) { // Função para a comunicação com o banco de dados.
        console.log('Iniciando Db_Execute().');
        // Code 
        let code;
        await this.Db_Connect().then(con => {
            try { // Tente executar a quarry.
                con.execute(querry); console.log(`A querry ${querry} foi executada com sucesso!`);
                code = 202;
            } catch (err) { // Em caso de erro, escreva o erro no console, e retorne 500;
                console.log(`A querry não foi executada devido a um erro. Erro: ${err}`);
                code = 500;
            }
            con.destroy(); // Destrua a conexão atual do banco de dados.
        });
        return code;
    }
}

// Code
module.exports = new Db();