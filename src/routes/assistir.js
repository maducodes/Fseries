var express = require("express");
var router = express.Router();

var assistirController = require("../controllers/assistirController");

router.get("/listar-temporadas", function (req, res) {
    assistirController.listarTemporadas(req, res);
});

router.get("/listar-episodios", function (req, res) {
    assistirController.listarEpisodios(req, res);
});

router.get("/listar-episodio", function (req, res) {
    assistirController.listarEpisodio(req, res);
});


module.exports = router;