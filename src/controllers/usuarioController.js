var usuarioModel = require("../models/usuarioModel");

var sessoes = [];

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
                    console.log(`\nResultados encontrados: ${resultado.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

                    if (resultado.length == 1) {
                        console.log(resultado);
                        res.json(resultado[0]);
                    } else if (resultado.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
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
    var dataNasc = req.body.dataNascimentoServer
    var email = req.body.emailServer
    var senha = req.body.senhaServer
    var icone = req.body.iconeServer

    usuarioModel.editar(id_usuario, nome, cpf, dataNasc, email, senha, icone)
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

module.exports = {
    entrar,
    cadastrar,
    editar
}