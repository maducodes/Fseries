var favoritoModel = require("../models/favoritoModel");

var sessoes = [];

function listar(req, res) {
    var id_usuario = req.query.value

    favoritoModel.listar(id_usuario)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(
                    "\nHouve um erro ao realizar o cadastro! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function isFavorito(req, res) {
    var id_usuario = req.query.idUsuario
    var id_catalogo = req.query.idCatalogo

    favoritoModel.isFavorito(id_catalogo, id_usuario)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(
                    "\nHouve um erro ao realizar o cadastro! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function favoritar(req, res) {
    var id_usuario = req.body.idUsuario
    var id_catalogo = req.body.idCatalogo

    if (id_usuario, id_catalogo) {
        favoritoModel.favoritar(id_catalogo, id_usuario)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    } else {
        res.status(400).json("Houve um erro ao chamar o favoritar: Passe os parametros corretos")
    }
}

function desFavoritar(req, res) {
    var id_usuario = req.body.idUsuario
    var id_catalogo = req.body.idCatalogo

    if (id_usuario, id_catalogo) {
        favoritoModel.desFavoritar(id_catalogo, id_usuario)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    } else {
        res.status(400).json("Houve um erro ao chamar o favoritar: Passe os parametros corretos")
    }
}

function mediaFavoritos(req, res) {
    favoritoModel.mediaFavoritos()
    .then(
        function (resultado) {
            res.json(resultado);
        }
    ).catch(
        function (erro) {
            console.log(
                "\nHouve um erro ao realizar o cadastro! Erro: ",
                erro.sqlMessage
            );
            res.status(500).json(erro.sqlMessage);
        }
    );
}

module.exports = {
    listar,
    isFavorito,
    favoritar,
    desFavoritar,
    mediaFavoritos
}