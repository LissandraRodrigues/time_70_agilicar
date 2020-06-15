// Javascript responsável pela criação do Bando de Dados de Autorização.

// Importa a dependência do SQLite 3.
const sqlite3 = require("sqlite3").verbose()

// Cria um objeto do Bando de Dados do Autorização.
const db_autorizacao = new sqlite3.Database("./src/database/autorizacao.db")

module.exports = db_autorizacao

db_autorizacao.serialize(() => {

    // Cria uma tabela, caso ela ainda exista. 
    db_autorizacao.run(`

        CREATE TABLE IF NOT EXISTS places (

            id INTEGER PRIMARY KEY AUTOINCREMENT,
            empresa_entregadora TEXT,
            empresa_receptora TEXT,
            local_saida TEXT,
            local_destino TEXT,
            tipo_carga TEXT,
            peso_carga TEXT,
            data TEXT,
            horario TEXT,
            cpf TEXT
         
        );

    `)

})