// Servidor.

// $ npm start -> Inicia o servidor. 
// http://localhost:9000/

const express = require("express")

// Cria o servidor.
const server = express()

// // Pega o Banco de Dados do Gerente.
const db_gerente = require("./database/db_gerente.js")

// Pega o Banco de Dados do Caminhoneiro.
const db_caminhoneiro = require("./database/db_caminhoneiro.js")

// Pega o Banco de Dados da Autorização.
const db_autorizacao = require("./database/db_autorizacao.js")

// Pega o Banco de Dados da Autorização.
const db_nota_fiscal = require("./database/db_nota_fiscal.js")

// Configurar pasta pública.
server.use(express.static("public"))

// Habilitar o uso do request.body
server.use(express.urlencoded({extended: true}))

// Utilizando Template Engine.
const nunjucks = require("nunjucks")

nunjucks.configure("src/views", {

    express: server,

    noCache: true

})

// Página Inicial. 
server.get("/", (request, answer) => {

    return answer.render("index.html")

})

// // Página de Cadastro do Caminhoneiro.
server.get("/cadastro-caminhoneiro", (request, answer) => {

    return answer.render("cadastro-caminhoneiro.html")

})

// Página de Login do Caminhoneiro.
server.get("/login-caminhoneiro", (request, answer) => {

    return answer.render("login-caminhoneiro.html")

})

// // // Página da Aba do Caminhoneiro.
server.get("/acesso-caminhoneiro", (request, answer) => {

    return answer.render("acesso-caminhoneiro.html")

})

// // Página de Cadastro de Autorização de Carregamento.
server.get("/cadastro-autorizacao", (request, answer) => {

    return answer.render("cadastro-autorizacao.html")

})

// // Página de Cadastro do Gerente.
server.get("/cadastro-gerente", (request, answer) => {

    return answer.render("cadastro-gerente.html")

})

// Página de Login do Gerente.
server.get("/login-gerente", (request, answer) => {

    return answer.render("login-gerente.html")

})

// Página de Login do Gerente.
server.get("/cadastro-concluido", (request, answer) => {

    return answer.render("cadastro-concluido.html")

})

//  Página da Aba do Gerente.
server.get("/acesso-gerente", (request, answer) => {

    return answer.render("acesso-gerente.html")

})

// // Página da Aba do Gerente.
server.get("/nova-nota-fiscal", (request, answer) => {

    return answer.render("nova-nota-fiscal.html")

})

// // Página de armazenamento dos dados do Gerente.
server.post("/salva-cadastro-gerente", (request, answer) => {

    // Dados da tabela.
    const query = `
    
        INSERT INTO places (

            nome,
            cpf,
            senha,
            senha_confirmacao,
            codigo_permissao
            
        ) VALUES (?,?,?,?,?);
    `

    const values = [

        request.body.nome,
        request.body.cpf,
        request.body.senha,
        request.body.senha_confirmacao,
        request.body.codigo_permissao

    ]

    function afterInsertData(err) {

        if (err) {

            return answer.render("cadastro-gerente.html")

        }

        return answer.render("login-gerente.html")

    }

    db_gerente.run(query, values, afterInsertData)

})

// // Página de armazenamento dos dados do Caminhoneiro.
server.post("/salva-cadastro-caminhoneiro", (request, answer) => {

    // Dados da tabela.
    const query = `
    
        INSERT INTO places (

            nome,
            assinatura_imagem, 
            cpf,
            cnh,
            senha,
            senha_confirmacao,
            placa_cavalo,
            placa_reboque
            
        ) VALUES (?,?,?,?,?,?,?,?);
    `

    const values = [

        request.body.nome,
        request.body.assinatura_imagem,
        request.body.cpf,
        request.body.cnh,
        request.body.senha,
        request.body.senha_confirmacao,
        request.body.placa_cavalo,
        request.body.placa_reboque

    ]

    function afterInsertData(err) {

        if (err) {

            return answer.render("cadastro-caminhoneiro.html")

        }

        return answer.render("login-caminhoneiro.html")

    }

    db_caminhoneiro.run(query, values, afterInsertData)

})

// // Página de armazenamento dos dados da Autorização.
server.post("/salva-cadastro-autorizacao", (request, answer) => {

    // Dados da tabela.
    const query = `
    
        INSERT INTO places (

            empresa_entregadora,
            empresa_receptora,
            local_saida,
            local_destino,
            tipo_carga,
            peso_carga,
            data,
            horario,
            cpf
            
        ) VALUES (?,?,?,?,?,?,?,?,?);
    `

    const values = [

        request.body.empresa_entregadora,
        request.body.empresa_receptora,
        request.body.local_saida,
        request.body.local_destino,
        request.body.tipo_carga,
        request.body.peso_carga,
        request.body.data,
        request.body.horario,
        request.body.cpf

    ]

    function afterInsertData(err) {

        if (err) {

            return answer.render("cadastro-autorizacao.html")

        }

        return answer.render("acesso-caminhoneiro.html")

    }

    db_autorizacao.run(query, values, afterInsertData)

})

// Página de armazenamento dos dados da Nota Fiscal.
server.post("/salva-nota-fiscal", (request, answer) => {

    db_autorizacao.run(`DELETE FROM places WHERE cpf = ?`, [request.body.cpf], function(err) {

                    if (err) {
            
                        return console.log(err)
            
                    }
            
                    console.log("Registro deletado com sucesso!")
            
                    })

    // Dados da tabela.
    const query = `
    
        INSERT INTO places (

            peso_veiculo,
            peso_carga,
            horario_emissao,
            cpf
            
        ) VALUES (?,?,?,?);
    `

    const values = [

        request.body.peso_veiculo,
        request.body.peso_carga,
        request.body.horario_emissao,
        request.body.cpf

    ]

    function afterInsertData(err) {

        if (err) {

            return answer.render("acesso-gerente.html")

        }

        return answer.render("acesso-gerente.html")

    }

    db_nota_fiscal.run(query, values, afterInsertData)

})

// Página da Acesso Gerente.
server.get("/salva-login-gerente", (request, answer) => {

    var cpf = request.query.cpf

    var password = request.query.senha

    // // // Pegar os dados da tabela.
    db_gerente.all(`SELECT * FROM places`, function(err, rows){

        if (err) {

            return console.log(err)
        
        }
            
        for (row in rows){

            var verification = true

            if (rows[row].cpf == cpf && rows[row].senha == password) {

                verification = false

                break

        }} 

        if (verification == false) {
    
            // Pegar os dados da tabela.
            db_autorizacao.all(`SELECT * FROM places`, function(err, rows){

                if (err) {
    
                    return console.log(err)
    
                }
    
                const total = rows.length

                return answer.render("acesso-gerente.html", {places: rows[0], total})

            })
    
        } else {
    
            return answer.render("login-gerente.html")
    
        }

    })
    
})

// Página de Login do motorista.
server.get("/salva-login-motorista", (request, answer) => {

    var cpf = request.query.cpf

    var password = request.query.senha

    // // Pegar os dados da tabela.
    db_caminhoneiro.all(`SELECT * FROM places`, function(err, rows){

        if (err) {

            return console.log(err)
        
        }
            
        for (row in rows){

            if (rows[row].cpf == cpf && rows[row].senha == password) {

                verification = false

                break

        }}
        
        if (verification == false) {
    
            // // Pegar os dados da tabela.
            db_nota_fiscal.all(`SELECT * FROM places WHERE cpf LIKE '%${cpf}%'`, function(err, rows){

                if (err) {
    
                    return console.log(err)
    
                }
    
                const total = rows.length

                return answer.render("acesso-caminhoneiro.html", {places: rows, total})

            })
    
        } else {
    
            return answer.render("login-caminhoneiro.html")
    
        }

    }) 

})

// Liga o servidor.
server.listen(9000) // Porta 9000.



