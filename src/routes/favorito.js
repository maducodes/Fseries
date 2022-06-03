var express = require("express");
var router = express.Router();

var favoritoController = require("../controllers/favoritoController");

router.get("/listar", function (req, res) {
    favoritoController.listar(req, res);
});

router.get("/isFavorito", function (req, res) {
    favoritoController.isFavorito(req, res);
});

router.post("/favoritar", function (req, res) {
    favoritoController.favoritar(req, res);
});

router.post("/desfavoritar", function (req, res) {
    favoritoController.desFavoritar(req, res);
});

module.exports = router;