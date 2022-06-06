var express = require("express");
var router = express.Router();

var graficoController = require("../controllers/graficoController");

router.get("/categorias-visualizadas", function (req, res) {
    graficoController.categoriasVisualizadas(req, res);
});

router.get("/favoritos-mes", function (req, res) {
    graficoController.favoritosMes(req, res);
});

module.exports = router;