var iconeModel = require("../models/iconeModel");

function listar(req, res) {
    iconeModel.listar()
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

function ListarPorIdUser(req, res) {
    var value = req.query.value
    iconeModel.ListarPorIdUser(value)
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
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function editar(req, res) {
    var id_icone = req.body.id_iconeServer
    var id_usuario = req.body.id_usuarioServer

    iconeModel.editar(id_icone, id_usuario)
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
    cadastrar,
    editar,
    ListarPorIdUser
}