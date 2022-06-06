var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

router.get("/listar", function (req, res) {
    usuarioController.listar(req, res);
})


router.get("/listar-usuarios", function (req, res) {
    usuarioController.listarUsuarios(req, res);
})


router.get("/quantidade-usuarios", function (req, res) {
    usuarioController.quantidadeUsuarios(req, res);
})

router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/entrar", function (req, res) {
    usuarioController.entrar(req, res);
});

router.post("/editar", function (req, res) {
    usuarioController.editar(req, res);
});

router.post("/validarcpf", function (req, res) {
    usuarioController.validarCPF(req, res);
});

module.exports = router;