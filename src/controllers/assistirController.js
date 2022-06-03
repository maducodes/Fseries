var assistirModel = require("../models/assistirModel");

function listarTemporadas(req, res) {
    var value = req.query.idCatalogo

    assistirModel.listarTemporadas(value)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(
                    "\nHouve um erro ao realizar o listar por categoria! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function listarEpisodios(req, res) {
    var value = req.query.idTemporada

    assistirModel.listarEpisodios(value)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(
                    "\nHouve um erro ao realizar o listar por categoria! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function listarEpisodio(req, res) {
    var value = req.query.idEpisodio
    console.log(value, 'aqui na model')

    assistirModel.listarEpisodio(value)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(
                    "\nHouve um erro ao realizar o listar por categoria! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

module.exports = {
    listarTemporadas,
    listarEpisodios,
    listarEpisodio
}