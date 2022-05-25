var database = require("../database/config")

function listar(id_usuario) {
    var instrucao = `
    SELECT * FROM iconeperfil INNER JOIN usuario ON iconeperfil.id_icone = usuario.fk_icone WHERE id_usuario = ${id_usuario};
    `;
    return database.executar(instrucao);
}

function entrar(email, senha) {
    var instrucao = `
        SELECT * FROM usuario 
        INNER JOIN iconePerfil AS icone ON icone.id_icone = usuario.fk_icone 
        WHERE email_usuario = '${email}' AND senha_usuario = '${senha}';
    `;
    return database.executar(instrucao);
}

function cadastrar(nome, cpf, dataNasc, email, senha, icone) {
    var instrucao = `
        INSERT INTO usuario (nome_usuario, email_usuario, senha_usuario, data_nascimento, tipo_admin, fk_icone, cpf_usuario) 
        values ('${nome}','${email}', '${senha}', '${dataNasc}', ${0}, ${icone}, '${cpf}');
    `;
    return database.executar(instrucao);
}

function editar(id_usuario,nome, cpf, dataNasc, email, senha, icone) {
    var instrucao = `
    UPDATE usuario SET nome_usuario = '${nome}', email_usuario = '${email}', senha_usuario = '${senha}', 
    data_nascimento = '${dataNasc}', fk_icone = ${icone}, cpf_usuario = '${cpf}' where id_usuario = ${id_usuario}
    `;
    return database.executar(instrucao)
}

module.exports = {
    listar,
    entrar,
    cadastrar,
    editar
};