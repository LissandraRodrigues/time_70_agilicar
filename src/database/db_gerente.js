// Javascript responsável pela criação do Bando de Dados do Gerente.

// Importa a dependência do SQLite 3.
const sqlite3 = require("sqlite3").verbose()

// Cria um objeto do Bando de Dados do Gerente.
const db_gerente = new sqlite3.Database("./src/database/gerente.db")

module.exports = db_gerente

db_gerente.serialize(() => {

    // Cria uma tabela, caso ela ainda exista. 
    db_gerente.run(`

        CREATE TABLE IF NOT EXISTS places (

            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT,
            cpf TEXT,
            senha TEXT,
            senha_confirmacao TEXT,
            codigo_permissao TEXT
         
        );

    `)

})

