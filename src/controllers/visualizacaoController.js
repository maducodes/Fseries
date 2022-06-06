var visualizacaoModel = require("../models/visualizacaoModel");

function aumentaVisualizacao(req, res) {
    var id_catalogo = req.body.idCatalogo

    visualizacaoModel.aumentaVisualizacao(id_catalogo)
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


function quantidadeVisualizacao(req, res) {
    visualizacaoModel.quantidadeVisualizacao()
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
    aumentaVisualizacao,
    quantidadeVisualizacao
}