async function loadCatalogo() {
    const urlParams = new URLSearchParams(window.location.search);
    const id_catalogo = urlParams.get('idCatalogo')
    const id_usuario = sessionStorage.ID_USUARIO
    var favorito = false

    await fetch(`/catalogo/listar-por-id?value=${id_catalogo}`)
        .then(data => data.json())
        .then(async (data) => {
            if (id_usuario) {
                await fetch(`/favorito/isFavorito?idCatalogo=${id_catalogo}&idUsuario=${id_usuario}`)
                    .then(data => data.json())
                    .then((resposta) => {
                        if (resposta.length) {
                            favorito = true
                        } else {
                            favorito = false
                        }
                    })
            } else {
                favorito = false
            }

            //variavel
            var porcentagem = 0
            var numero = Number(data[0].quantidade_visualizacao)

            //condicao
            if (numero >= 0 && numero <= 100) {
                porcentagem = 25
            } else if (numero > 100 && numero <= 200) {
                porcentagem = 50
            } else if (numero > 200 && numero <= 400) {
                porcentagem = 75
            } else {
                porcentagem = 100
            }

            containerImage.style.backgroundImage = `url(${data[0].url_background})`
            informacoes.innerHTML = `
                <div>
                <div>
                    <img id="thumbnail" src="${data[0].thumbnail_catalogo}">
                </div>
            </div>
            <div class="boxInfo">
                <div>
                    <h1>${data[0].nome_catalogo}</h1>
                    <p><span>${data[0].quantidade_temporada} temporadas</span><span> ${data[0].quantidade_episodio} episodios</span><span>${porcentagem}% relevância</span></p>
                    <div class="container-buttons">
                        <button onclick="play(${data[0].id_catalogo})"><img src="assets/img/dashboard/play.svg"
                                alt="Assistir">ASSISTIR</button>
                        <div>

                        ${favorito ? `
                        <img width="30px" height="30px" class="informacao" onclick="desfavoritar(${id_usuario},${data[0].id_catalogo})"
                        src="assets/img/catalogo/star-complete.svg" alt="Mais informações" />
                        <p onclick="desfavoritar(${id_usuario},${data[0].id_catalogo})">DESFAVORITAR</p>
                        `
                    :
                    `
                        <img width="30px" height="30px" class="informacao" onclick="favoritar(${id_usuario},${data[0].id_catalogo})"
                            src="assets/img/catalogo/star.svg" alt="Mais informações" />
                            <p onclick="favoritar(${id_usuario},${data[0].id_catalogo})">FAVORITAR</p>
                        `}
                        </div >
                    </div >
                </div >
                <div class="sinopse">
                    <p>${data[0].sinopse_catalogo}</p>
                </div>
                <div>
                    <p>Emissora: <span>${data[0].emissora_catalogo}</span></p>
                    <p>Elenco:<span>${data[0].elenco_catalogo}</p>
                    <p>Gênero:<span>${data[0].nome_categoria}</span></p>
                </div>
            </div >
            `;

            loadCarrousel(data[0].fk_categoria)
        });

    newView(id_catalogo)
}

function newView(id_catalogo) {
    fetch("/visualizacao/aumentar-visualizacao", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idCatalogo: id_catalogo
        })
    })
}

function loadCarrousel(id_categoria) {
    fetch(`catalogo/listar-por-categoria?value=${id_categoria}`)
        .then(data => data.json())
        .then((data) => {
            if (data.length) {
                for (let posicao = 0; posicao < data.length; posicao++) {
                    categoria.innerHTML += `
                        <div class="item" onclick="redirectCatalogo(${data[posicao].id_catalogo})">
                            <div>
                                <img src="${data[posicao].thumbnail_catalogo}" alt="${data[posicao].nome_catalogo}">
                            </div>
                        </div>`
                }
            }
        }).catch(function (e) {
            console.log(e)
        });
}

function play(id_catalogo) {
    temporada.innerHTML = '<option value="null">Selecione uma temporada</option>'
    fetch(`/assistir/listar-temporadas?idCatalogo=${id_catalogo}`)
        .then(data => data.json())
        .then((data) => {
            if (data[0].numero_temporada != null) {
                for (let posicao = 0; posicao < data.length; posicao++) {
                    temporada.innerHTML += `
                    <option value="${data[posicao].id_temporada}">Temporada: ${data[posicao].numero_temporada}</option>
                    `
                }
            }
            openModalAssistir.style.display = ''
        })
}

function exibirEpisodios() {
    var temp = temporada.value
    if (temp && temp != null) {
        episodio.innerHTML = '<option value="null">Selecione um episodio</option>'
        fetch(`/assistir/listar-episodios?idTemporada=${temp}`)
            .then(data => data.json())
            .then((data) => {
                if (data[0].id_episodio != null) {
                    for (let posicao = 0; posicao < data.length; posicao++) {
                        episodio.innerHTML += `
                        <option value="${data[posicao].id_episodio}">Episodio: ${data[posicao].nome_episodio}</option>
                        `
                    }
                }
            })
    }
}

function exibirEpisodio() {
    var ep = episodio.value

    if (ep && ep != null) {
        fetch(`/assistir/listar-episodio?idEpisodio=${ep}`)
            .then(data => data.json())
            .then((data) => {
                etapa1.style.display = 'none'
                etapa2.innerHTML = `
            <iframe width="100%" height="100%" src="${data[0].url_episodio}?autoplay=1&enablejsapi=1&modestbranding=1&rel=0&loop=1&controls=1&showinfo=0&mute=0&wmode=transparent"></iframe>
            `
                etapa2.style.display = ''
            })
    } else {
        spanEpisodio.style.display = ''
    }
}

function fecharModalAssistir() {
    openModalAssistir.style.display = 'none'
}

async function favoritar(id_usuario, id_catalogo) {
    if (id_usuario && id_catalogo) {
        await fetch("/favorito/favoritar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                idUsuario: id_usuario,
                idCatalogo: id_catalogo
            })
        }).then(function () {
            window.location.reload()
        }).catch(function (erro) {
            console.log(erro);
        })
    } else {
        window.location.href = "/login.html"
    }
}

async function desfavoritar(id_usuario, id_catalogo) {
    await fetch("/favorito/desfavoritar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idUsuario: id_usuario,
            idCatalogo: id_catalogo
        })
    }).then(function () {
        window.location.reload()
    }).catch(function (erro) {
        console.log(erro);
    })
}
