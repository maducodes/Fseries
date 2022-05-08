function voltar() {
    window.location.href = "index.html";
}

function entrar() {
    var email = inputEmail.value
    var senha = inputSenha.value

    if (email && senha && email.indexOf('@') > 1 && email.indexOf('.') > 1) {
        fetch("/usuarios/autenticar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                emailServer: email,
                senhaServer: senha
            })
        }).then(function (resposta) {
            if (resposta.ok) {
                resposta.json().then(json => {
                    sessionStorage.ID_USUARIO = json.id_usuario;
                    sessionStorage.NOME_USUARIO = json.nome;
                    sessionStorage.EMAIL_USUARIO = json.email;
                });
            } else {
                resposta.text().then(texto => {
                    console.error(texto);
                });
            }
        }).catch(function (erro) {
            console.log(erro);
        })
    } else {
        span_cadastroLogin.style.display = 'block'
    }
}

var etapa = 0
var isClickedButton = false

function cadastrar() {
    isClickedButton = true
    var nome = inputNome.value
    var cpf = inputCpf.value
    var dataNascimento = InputNascimento.value
    var email = inputEmail.value
    var senha = inputSenha.value
    var confirmarSenha = inputConfirmarSenha.value

    if (etapa == 0 && nome.length > 2 && cpf.length) {
        etapa0.style.display = 'none'
        etapa1.style.display = 'block'
        etapaLabel.innerHTML = 'ETAPA 2 DE 3'
        etapa++
        isClickedButton = false
    } else if (etapa == 1 && dataNascimento.length && email.length && email.indexOf('@') > 1 && email.indexOf('.') > 1) {
        etapa0.style.display = 'none'
        etapa1.style.display = 'none'
        etapa2.style.display = 'block'
        etapaLabel.innerHTML = 'ETAPA 2 DE 3'
        etapa++
        isClickedButton = false
    } else if (etapa == 2 && nome.length && email.length && (senha.length >= 8) && (email.indexOf('@') > 1) && (email.indexOf('.') > 1) && senha == confirmarSenha) {
        let cpfSemPontuacao = inputCpf.value.replace(/([^0-9])+/g, "");
        fetch("/usuarios/cadastrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nomeServer: nome,
                cpfServer: cpfSemPontuacao,
                dataNascimentoServer: dataNascimento,
                emailServer: email,
                senhaServer: senha,
            })
        }).then(function (resposta) {
            if (resposta.ok) {
                console.log('cadastro realizado')
            } else {
                throw ("Houve um erro ao tentar realizar o cadastro!");
            }
        }).catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
    }

    if (etapa == 0 && isClickedButton && (!nome.length)) {
        span_nome.style.display = ''
    } else {
        span_nome.style.display = 'none'
    }

    if (etapa == 0 && isClickedButton && (!cpf.length)) {
        span_cpf.style.display = ''
    } else {
        span_cpf.style.display = 'none'
    }

    if (etapa == 1 && isClickedButton && (!dataNascimento.value)) {
        span_dataNasc.style.display = ''
    } else {
        span_dataNasc.style.display = 'none'
    }

    if (etapa == 1 && isClickedButton && (!email.length || email.indexOf('@') || email.indexOf('.') > 1)) {
        span_email.style.display = ''
    } else {
        span_email.style.display = 'none'
    }

    if (etapa == 2 && isClickedButton && (!senha.length)) {
        span_senha.style.display = ''
    } else {
        span_senha.style.display = 'none'
    }

    if (etapa == 2 && isClickedButton && (senha != confirmarSenha)) {
        senhaeconfirmar.style.display = ''
    } else {
        senhaeconfirmar.style.display = 'none'
    }

}

function validarEmail() {
    const email = inputEmail.value
    if ((email) && (email.indexOf('@') > 1) && (email.indexOf('.') > 1)) {
        fetch("/usuarios/validaremail", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                emailServer: email
            })
        }).then(function (resposta) {
            if (!resposta.ok) {
                resposta.json().then(json => {
                    const data = JSON.stringify(json)
                    if (data.length) {
                        span_email_existente.style.display = '' 
                    }
                });
            } else {
                span_email_existente.style.display = 'none'
            }
        }).catch(function (erro) {
            console.log(erro);
        })
    }
}

function validarCPF() {
    let cpfSemPontuacao = inputCpf.value.replace(/([^0-9])+/g, "");
    if (cpfSemPontuacao) {
        fetch("/usuarios/validaremail", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                cpfServer: cpfSemPontuacao
            })
        }).then(function (resposta) {
            if (!resposta.ok) {
                resposta.json().then(json => {
                    const data = JSON.stringify(json)
                    if (data.length) {
                        span_cpf_existente.style.display = '' 
                    }
                });
            } else {
                span_cpf_existente.style.display = 'none'
            }
        }).catch(function (erro) {
            console.log(erro);
        })
    }
}

function mascaraCPF() {
    const tamanhoInput = inputCpf.maxLength;
    let valorInput = inputCpf.value
    const mascaras = {
        0: valorInput.replace(/[^\d]/g, "").replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
    }
    if (valorInput.length === tamanhoInput) {
        inputCpf.value = mascaras[0]
    }

    validarCPF()
}