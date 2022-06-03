var express = require("express");
var router = express.Router();

var iconeController = require("../controllers/iconeController");

router.get("/listar", function (req, res) {
    iconeController.listar(req, res);
});

router.get("/listar-por-id-user", function (req, res) {
    iconeController.ListarPorIdUser(req, res);
});

router.post("/cadastrar", function (req, res) {
    iconeController.cadastrar(req, res);
});

router.post("/editar", function (req, res) {
    iconeController.editar(req, res);
});

module.exports = router;