var iconeModel = require("../models/iconeModel");

var sessoes = [];

function listar(req, res) {
    iconeModel.listar()
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
}

function cadastrar(req, res) {
    var url = req.body.urlServer
    var nome = req.body.nomeServer
    if (nome == undefined) {
        res.status(400).send("O nome do icone está indefinido!");
    } else if (url == undefined) {
        res.status(400).send("A url do icone está indefinida!");
    } else {
        iconeModel.cadastrar(nome, url)
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
    }
}

module.exports = {
    listar,
    cadastrar
}