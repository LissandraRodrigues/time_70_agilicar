// Javascript responsável pela criação do Bando de Dados de Nota Fiscal.

// Importa a dependência do SQLite 3.
const sqlite3 = require("sqlite3").verbose()

// Cria um objeto do Bando de Dados do Nota Fiscal.
const db_nota_fiscal = new sqlite3.Database("./src/database/nota_fiscal.db")

module.exports = db_nota_fiscal

db_nota_fiscal.serialize(() => {

    // Cria uma tabela, caso ela ainda exista. 
    db_nota_fiscal.run(`

        CREATE TABLE IF NOT EXISTS places (

            id INTEGER PRIMARY KEY AUTOINCREMENT,
            peso_veiculo TEXT,
            peso_carga TEXT,
            horario_emissao TEXT,
            cpf TEXT
         
        );

    `)

})