var database = require("../database/config")

function listar() {
    var instrucao = `
        SELECT * FROM iconePerfil;
    `;
    return database.executar(instrucao);
}

function cadastrar(nome, url) {
    var instrucao = `
        INSERT INTO iconePerfil (nome_icone, url_icone) values ('${nome}', '${url}');
    `;
    return database.executar(instrucao);
}

module.exports = {
    listar,
    cadastrar,
};