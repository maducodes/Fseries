var database = require("../database/config")

function categoriasVisualizadas() {
    var instrucao = `
    SELECT sum(quantidade_visualizacao) AS 'total_visualizacao', categoria.nome_categoria FROM catalogo
    INNER JOIN categoria ON categoria.id_categoria = catalogo.fk_categoria
    GROUP BY categoria.id_categoria ORDER BY sum(quantidade_visualizacao) DESC limit 5;
    `;
    return database.executar(instrucao);
}

function favoritosMes() {
    var instrucao = `
    SELECT MONTH(cast(data_favorito as date)) AS mes, count(*) AS quantidade_favoritos 
    FROM favoritos GROUP BY MONTH(cast(data_favorito AS DATE))
    ORDER BY MONTH(cast(data_favorito as date)) ASC;
    `;
    return database.executar(instrucao);
}

module.exports = {
    categoriasVisualizadas,
    favoritosMes
};