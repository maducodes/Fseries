var database = require("../database/config")

function listar(valor_input) {
    var instrucao = `
    SELECT * FROM catalogo WHERE nome_catalogo LIKE '%${valor_input}%';
    `;
    return database.executar(instrucao);
}

module.exports = {
    listar,
};