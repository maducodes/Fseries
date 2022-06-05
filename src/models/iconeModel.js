var database = require("../database/config")

function listar() {
    var instrucao = `
        SELECT * FROM iconePerfil;
    `;
    return database.executar(instrucao);
}

function ListarPorIdUser(id_usuario) {
    var instrucao = `
    SELECT iconeperfil.url_icone 
    FROM usuario 
    JOIN iconeperfil ON iconeperfil.id_icone = usuario.fk_icone 
    WHERE id_usuario = ${id_usuario};
    `;
    return database.executar(instrucao);
}

function cadastrar(nome, url) {
    var instrucao = `
        INSERT INTO iconePerfil (nome_icone, url_icone) values ('${nome}', '${url}');
    `;
    return database.executar(instrucao);
}

function editar(id_icone, id_usuario) {
    var instrucao = `
        UPDATE usuario SET fk_icone = ${id_icone} WHERE id_usuario = ${id_usuario};
    `;
    return database.executar(instrucao);
}

module.exports = {
    listar,
    cadastrar,
    editar,
    ListarPorIdUser
};