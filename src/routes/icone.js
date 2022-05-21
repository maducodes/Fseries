var express = require("express");
var router = express.Router();

var iconeController = require("../controllers/iconeController");

router.get("/listar", function (req, res) {
    iconeController.listar(req, res);
})

router.post("/cadastrar", function (req, res) {
    iconeController.cadastrar(req, res);
})

module.exports = router;