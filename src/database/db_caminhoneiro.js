// Javascript responsável pela criação do Bando de Dados do Caminhoneiro.

// Importa a dependência do SQLite 3.
const sqlite3 = require("sqlite3").verbose()

// Cria um objeto do Bando de Dados do Caminhoneiro.
const db_caminhoneiro = new sqlite3.Database("./src/database/caminhoneiro.db")

module.exports = db_caminhoneiro

db_caminhoneiro.serialize(() => {

    // Cria uma tabela, caso ela ainda exista. 
    db_caminhoneiro.run(`

        CREATE TABLE IF NOT EXISTS places (

            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT,
            assinatura_imagem TEXT, 
            cpf TEXT,
            cnh TEXT,
            senha TEXT,
            senha_confirmacao TEXT,
            placa_cavalo TEXT,
            placa_reboque TEXT
         
        );

    `)

})