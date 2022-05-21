var database = require("../database/config")

function entrar(email, senha) {
    var instrucao = `
        SELECT * FROM usuario WHERE email_usuario = '${email}' AND senha_usuario = '${senha}';
    `;
    return database.executar(instrucao);
}

function cadastrar(nome, cpf, dataNasc, email, senha, admin, icone) {
    var instrucao = `
        INSERT INTO usuario (nome_usuario, email_usuario, senha_usuario, data_nascimento, tipo_admin, fk_icone, cpf_usuario) 
        values ('${nome}','${email}', '${senha}', '${dataNasc}', ${admin}, ${icone}, '${cpf}');
    `;
    return database.executar(instrucao);
}

module.exports = {
    entrar,
    cadastrar,
};