var database = require("../database/config")

function aumentaVisualizacao(id_catalogo) {
    var instrucao = `
        UPDATE catalogo SET quantidade_visualizacao = quantidade_visualizacao + 1 
        WHERE id_catalogo = ${id_catalogo};
    `;
    return database.executar(instrucao);
}

module.exports = {
    aumentaVisualizacao
};