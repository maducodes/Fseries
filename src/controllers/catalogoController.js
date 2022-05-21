var catalogoModel = require("../models/catalogoModel");

var sessoes = [];

function listar(req, res) {
    var value = req.query.value

    catalogoModel.listar(value)
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

module.exports = {
    listar
}