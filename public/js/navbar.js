function validarSessao() {
    if (!sessionStorage.ID_USUARIO) {
        saudacoes.innerHTML = 'Entrar'
        divPerfilorLogout.style.display = 'none'
    } else {
        saudacoes.innerHTML = `Bem vindo, ${sessionStorage.NOME_USUARIO}`
    }
}

function atualizarIcone() {
    if (sessionStorage.URL_ICONE) {
        profileIcon.src = sessionStorage.URL_ICONE
    }
}

function openModal() {
    if (divPerfilorLogout.style.display == 'none' && sessionStorage.ID_USUARIO) {
        divPerfilorLogout.style.display = 'block'
    } else if (divPerfilorLogout.style.display == 'none' && !sessionStorage.ID_USUARIO && saudacoes.innerHTML == 'Entrar') {
        window.location.href = "login.html"
    } else {
        divPerfilorLogout.style.display = 'none'
    }
}

function redirectCatalogo(id_catalogo) {
    var id = id_catalogo
    window.location.href = `/catalogo.html?idCatalogo=${id}`
}

function onSearch() {
    var value = searchInput.value
    if (value.length > 2) {
        resultadoPesquisa.style.display = ''
        fetch(`/catalogo/listar-por-nome?value=${value}`)
            .then(data => data.json())
            .then((data) => {
                for (let posicao = 0; posicao < data.length; posicao++) {
                    resultadoPesquisa.innerHTML = `
                        <div class="itemResult" onclick="redirectCatalogo(${data[posicao].id_catalogo})">
                            <div>
                                <img src="${data[posicao].thumbnail_catalogo}" alt="${data[posicao].nome_catalogo}">
                            </div>
                           <div class="box">
                           <span>${data[posicao].nome_catalogo}</span>
                           <span>${data[posicao].emissora_catalogo}</span>
                           </div>
                        </div>
                    `

                }
            }).catch(function (e) {
                console.log(e)
            });
    } else {
        resultadoPesquisa.style.display = 'none'
    }
}

function myprofile() {
    console.log('open profile')
}

function sair() {
    sessionStorage.clear()
    window.location.href = "/index.html"
}

function perfil() {
    window.location.href = "/meuperfil.html"
}