var database = require("../database/config")

function listar(id_usuario) {
    var instrucao = `
        SELECT catalogo.id_catalogo, catalogo.nome_catalogo, catalogo.thumbnail_catalogo, catalogo.fk_categoria FROM usuario 
        LEFT JOIN favoritos ON usuario.id_usuario = favoritos.fk_usuario
        INNER JOIN catalogo ON catalogo.id_catalogo = favoritos.fk_catalogo
        WHERE usuario.id_usuario = ${id_usuario};
    `;
    return database.executar(instrucao);
}

function mediaFavoritos() {
    var instrucao = `
    SELECT count(favoritos.id_favorito) as 'quantidade_favoritos', count(distinct(fk_catalogo)) as 'quantidade_catalogo' from favoritos;
    `;
    return database.executar(instrucao);
}

function isFavorito(id_catalogo, id_usuario) {
    var instrucao = `
    SELECT usuario.id_usuario, favoritos.* FROM usuario 
    INNER JOIN favoritos ON usuario.id_usuario = favoritos.fk_usuario
    INNER JOIN catalogo ON catalogo.id_catalogo = favoritos.fk_catalogo
    WHERE fk_usuario = ${id_usuario} AND fk_catalogo = ${id_catalogo};
    `;
    return database.executar(instrucao);
}

function favoritar(id_catalogo, id_usuario) {
    console.log(id_catalogo, id_usuario, "id na modal")
    var instrucao = `
        INSERT INTO favoritos (fk_usuario, fk_catalogo) values (${id_usuario}, ${id_catalogo})
    `;
    console.log(instrucao)
    return database.executar(instrucao);
}

function desFavoritar(id_catalogo, id_usuario) {
    var instrucao = `
        DELETE FROM favoritos WHERE fk_catalogo = ${id_catalogo} AND fk_usuario = ${id_usuario};
    `;
    return database.executar(instrucao);
}

module.exports = {
    listar,
    isFavorito,
    favoritar,
    desFavoritar,
    mediaFavoritos
};