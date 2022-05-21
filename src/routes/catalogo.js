var express = require("express");
var router = express.Router();

var catalogoController = require("../controllers/catalogoController");

router.get("/listar", function (req, res) {
    catalogoController.listar(req, res);
});

module.exports = router;