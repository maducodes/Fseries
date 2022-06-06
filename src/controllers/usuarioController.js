var usuarioModel = require("../models/usuarioModel");

var sessoes = [];

function listar(req, res) {
    var id_usuario = req.query.value;

    if (id_usuario == undefined) {
        res.status(400).send("Seu id está indefinido!");
    } else {
        usuarioModel.listar(id_usuario)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o listar! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function listarUsuarios(req, res) {
    usuarioModel.listarUsuarios()
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao realizar o listar! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function quantidadeUsuarios(req, res) {
    usuarioModel.quantidadeUsuarios()
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao realizar o listar! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function entrar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.entrar(email, senha)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o login! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(403).json(erro.sqlMessage);
                }
            );
    }

}

function cadastrar(req, res) {
    var nome = req.body.nomeServer
    var cpf = req.body.cpfServer
    var dataNasc = req.body.dataNascimentoServer
    var email = req.body.emailServer
    var senha = req.body.senhaServer
    var icone = req.body.iconeServer

    if (nome == undefined) {
        res.status(400).send("Seu nome está indefinido!");
    } else if (cpf == undefined) {
        res.status(400).send("Seu CPF está indefinido!");
    } else if (dataNasc == undefined) {
        res.status(400).send("Sua data de nascimento está indefinida!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está indefinida!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {
        usuarioModel.cadastrar(nome, cpf, dataNasc, email, senha, icone)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function editar(req, res) {
    var id_usuario = req.body.idUserServer
    var nome = req.body.nomeServer
    var cpf = req.body.cpfServer
    var email = req.body.emailServer

    usuarioModel.editar(id_usuario, nome, cpf, email)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao realizar o editar! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function validarCPF(req, res) {
    var cpf = req.body.cpfServer
    if (cpf == undefined) {
        res.status(400).send("Seu cpf está indefinido!");
    } else {
        usuarioModel.validarCPF(cpf)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o validar cpf! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {
    listar,
    entrar,
    cadastrar,
    editar,
    validarCPF,
    quantidadeUsuarios,
    listarUsuarios
}