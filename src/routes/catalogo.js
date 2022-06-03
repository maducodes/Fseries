var express = require("express");
var router = express.Router();

var catalogoController = require("../controllers/catalogoController");

router.get("/listar", function (req, res) {
    catalogoController.listar(req, res);
});

router.get("/listar-por-nome", function (req, res) {
    catalogoController.listarporNome(req, res);
});

router.get("/listar-por-categoria", function (req, res) {
    catalogoController.listarPorCategoria(req, res);
});

router.get("/listar-por-relevante", function (req, res) {
    catalogoController.listarPorRelevante(req, res);
});

router.get("/listar-por-id", function (req, res) {
    catalogoController.listarPorId(req, res);
});

module.exports = router;