var graficoModel = require("../models/graficoModel");

function favoritosMes(req, res) {
    graficoModel.favoritosMes()
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

function categoriasVisualizadas(req, res) {
    graficoModel.categoriasVisualizadas()
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
    categoriasVisualizadas,
    favoritosMes
}