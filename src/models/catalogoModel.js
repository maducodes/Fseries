var database = require("../database/config")

function listar() {
    var instrucao = `SELECT * FROM catalogo;`;
    return database.executar(instrucao);
}

function listarporNome(valor_input) {
    var instrucao = `
    SELECT * FROM catalogo WHERE nome_catalogo LIKE '%${valor_input}%';
    `;
    return database.executar(instrucao);
}

function listarPorCategoria(id_categoria) {
    var instrucao = `
    SELECT id_categoria, categoria.nome_categoria, catalogo.id_catalogo, catalogo.thumbnail_catalogo, catalogo.nome_catalogo
    FROM catalogo INNER JOIN categoria 
    ON categoria.id_categoria = catalogo.fk_categoria WHERE id_categoria = ${id_categoria};
    `
    return database.executar(instrucao);
}

function listarPorRelevante() {
    var instrucao = `
    SELECT * FROM catalogo ORDER BY quantidade_visualizacao DESC;
    `;
    return database.executar(instrucao);
}

module.exports = {
    listar,
    listarporNome,
    listarPorRelevante,
    listarPorCategoria

};