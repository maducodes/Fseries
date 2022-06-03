var database = require("../database/config")

function listarTemporadas(id_catalogo) {
    var instrucao = `
        SELECT temporada.* FROM catalogo
        LEFT JOIN temporada ON id_catalogo = fk_catalogo
        WHERE id_catalogo = ${id_catalogo};
    `;
    return database.executar(instrucao);
}

function listarEpisodios(id_temporada) {
    var instrucao = `
    SELECT episodio.* from catalogo
    LEFT JOIN temporada ON id_catalogo = fk_catalogo
    LEFT JOIN episodio ON id_temporada = fk_temporada
    WHERE id_temporada = ${id_temporada};
    `;
    return database.executar(instrucao);
}

function listarEpisodio(id_episodio) {
    console.log(id_episodio, 'aqui na model')
    var instrucao = `
    SELECT * from episodio
    WHERE id_episodio = ${id_episodio};
    `;
    return database.executar(instrucao);
}

module.exports = {
    listarTemporadas,
    listarEpisodios,
    listarEpisodio
};