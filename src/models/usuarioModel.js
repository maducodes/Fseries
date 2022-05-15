var database = require("../database/config")

function listar() {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
        SELECT * FROM usuario;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function entrar(email, senha) {
    var instrucao = `
        SELECT * FROM usuario WHERE email_usuario = '${email}' AND senha_usuario = '${senha}';
    `;
    return database.executar(instrucao);
}

function cadastrar(nome, cpf, dataNasc, email, senha, admin, icone) {
    var instrucao = `
        INSERT INTO usuario (nome_usuario, email_usuario, senha_usuario, data_nascimento, tipo_admin, cpf_usuario) values ('${nome}', '${email}', '${senha}', '${dataNasc}', '${admin}', '${cpf}');
    `;
    return database.executar(instrucao);
}

module.exports = {
    entrar,
    cadastrar,
    listar,
};