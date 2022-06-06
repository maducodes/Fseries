var express = require("express");
var router = express.Router();

var visualizacaoController = require("../controllers/visualizacaoController");

router.post("/aumentar-visualizacao", function (req, res) {
    visualizacaoController.aumentaVisualizacao(req, res);
});

router.get("/quantidade-visualizacao", function (req, res) {
    visualizacaoController.quantidadeVisualizacao(req, res);
});

module.exports = router;