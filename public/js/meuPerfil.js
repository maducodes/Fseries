function atualizarIcone() {
    profileIcon.src = sessionStorage.URL_ICONE
    iconSubnav.src = sessionStorage.URL_ICONE
    nomePerfil.innerHTML = sessionStorage.NOME_USUARIO
    saudacoes.innerHTML = `Bem vindo, ${sessionStorage.NOME_USUARIO}`
}

function listarperfil() {
    var id_usuario = sessionStorage.ID_USUARIO
    fetch(`/usuario/listar?value=${id_usuario}`)
    .then(data => data.json())
    .then((data) => {
        if (data.length) {
            input_nome.value = data[0].nome_usuario
            input_email.value = data[0].email_usuario
            input_cpf.value = data[0].cpf_usuario
            sessionStorage.NOME_USUARIO = data[0].nome_usuario
        }
    }).catch(function (e) {
        console.log(e)
    });
}

function trocaNav(id) {
    listarperfil()
    if (id == 'perfil') {
        perfilNav.style.display = ''
        favoritos.style.display = 'none'
        iconePerfil.style.display = 'none'
    } else if (id == 'favoritos') {
        listarFavoritos()
        perfilNav.style.display = 'none'
        favoritos.style.display = ''
        iconePerfil.style.display = 'none'
    } else if (id == 'senha') {
        perfilNav.style.display = 'none'
        favoritos.style.display = 'none'
        iconePerfil.style.display = 'none'
    } else {
        listarIcone()
        iconePerfil.style.display = ''
        perfilNav.style.display = 'none'
        favoritos.style.display = 'none'
    }
}

function editarPerfil() {
    var nome = input_nome.value
    var email = input_email.value
    var cpf = input_cpf.value

    if (nome.length && email.length && cpf.length == 11 && email.indexOf('@') != -1) {
        fetch("/usuario/editar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                idUserServer: sessionStorage.ID_USUARIO,
                nomeServer: nome,
                cpfServer: cpf,
                emailServer: email
            })
        }).then(function (resposta) {
            if (resposta.ok) {
                console.log('perfil editado')
            } else {
                throw ("Houve um erro ao tentar realizar o cadastro!");
            }
        }).catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
    }
}

function listarFavoritos() {
    var id_usuario = sessionStorage.ID_USUARIO

    fetch(`/favorito/listar?value=${id_usuario}`)
        .then(data => data.json())
        .then((data) => {
            if (data.length) {
                console.log(data)
                lista_favoritos.innerHTML = ''
                for (var posicao = 0; posicao < data.length; posicao++) {
                    lista_favoritos.innerHTML += `
                    <div class="item-favorito" onclick="redirectCatalogo(${data[posicao].id_catalogo})">
                        <img src="${data[posicao].thumbnail_catalogo}">
                        <p class="p-favorito">${data[posicao].nome_catalogo}</p>
                    </div>
                    `
                }
            }
        }).catch(function (e) {
            console.log(e)
        });
}

function listarIcone() {
    fetch(`/icone/listar`)
        .then(data => data.json())
        .then((data) => {
            if (data.length) {
                listar_icone.innerHTML = ''
                for (var posicao = 0; posicao < data.length; posicao++) {
                    listar_icone.innerHTML += `
                <div class="item-icone" onclick="editarIcone(${data[posicao].id_icone})">
                    <img src="${data[posicao].url_icone}">
                    <p class="p-favorito">${data[posicao].nome_icone}</p>
                </div>
                `
                }
            }
        }).catch(function (e) {
            console.log(e)
        });
}

function editarIcone(id_icone) {
    var id_icon = id_icone
    var id_user = sessionStorage.ID_USUARIO

    fetch("/icone/editar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id_usuarioServer: id_user,
            id_iconeServer: id_icon
        })
    }).then(function (resposta) {
        if (resposta.ok) {
            fetch(`/icone//listar-por-id-user?value=${id_user}`)
                .then(data => data.json())
                .then((data) => {
                  sessionStorage.URL_ICONE = data[0].url_icone
                  window.location.reload()
                }).catch(function (e) {
                    console.log(e)
                });
        } else {
            throw ("Houve um erro ao tentar atualizar o icone!");
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });
}

function redirectCatalogo(id_catalogo) {
    var id = id_catalogo
    window.location.href = `/catalogo.html?idCatalogo=${id}`
}