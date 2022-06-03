function atualizarIcone() {
    if (sessionStorage.URL_ICONE) {
        profileIcon.src = sessionStorage.URL_ICONE
    }
}

function listar() {
    fetch(`/catalogo/listar`)
        .then(data => data.json())
        .then((data) => {
            const posicao = Math.floor(Math.random() * data.length);

            //variavel
            var porcentagem = 0
            var numero = Number(data[posicao].quantidade_visualizacao)

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
            
            backgroundPrincipal.style.backgroundImage = `url('${data[posicao].url_background}')`
            conteudoPrincipal.innerHTML = `
                <h1>${data[posicao].nome_catalogo}</h1>
                <p>Uma série original <span style="color: #fff;">${data[posicao].emissora_catalogo}</span>
                <span>${porcentagem}% relevância</span></p>
                    <div>
                        <button onclick="play(${data[0].id_catalogo})"><img src="assets/img/dashboard/play.svg"
                                alt="Assistir">ASSISTIR</button>
                        <img onclick="redirectCatalogo(${data[posicao].id_catalogo})" class="informacao" src="assets/img/dashboard/info.svg"
                            alt="Mais informações" />
                    </div>
            `

            setInterval(() => {
                const posicao = Math.floor(Math.random() * data.length);
                backgroundPrincipal.style.backgroundImage = `url('${data[posicao].url_background}')`
                conteudoPrincipal.innerHTML = `
                    <h1>${data[posicao].nome_catalogo}</h1>
                    <p>Uma série original <span style="color: #fff;">${data[posicao].emissora_catalogo}</span>
                    <span>${porcentagem}% relevância</span></p>
                        <div>
                            <button onclick="play(${data[0].id_catalogo})"><img src="assets/img/dashboard/play.svg"
                                    alt="Assistir">ASSISTIR</button>
                            <img onclick="redirectCatalogo(${data[posicao].id_catalogo})" class="informacao" src="assets/img/dashboard/info.svg"
                                alt="Mais informações" />
                        </div>
                `
            }, 5000);
        }).catch(function (e) {
            console.log(e)
        });
}

function redirectCatalogo(id_catalogo) {
    var id = id_catalogo
    window.location.href = `/catalogo.html?idCatalogo=${id}`
}

function listarPorRelevancia() {
    maiorRelevancia.innerHTML = ''
    fetch(`/catalogo/listar-por-relevante`)
        .then(data => data.json())
        .then((data) => {
            var item = data
            titleRelevante.innerHTML = `Mais relevantes`
            for (let posicao = 0; posicao < item.length; posicao++) {
                maiorRelevancia.innerHTML += `
                    <div class="item" onclick="redirectCatalogo(${item[posicao].id_catalogo})">
                        <div>
                            <img src="${item[posicao].thumbnail_catalogo}" alt="${item[posicao].nome_catalogo}">
                        </div>
                    </div>
                `
            }
        }).catch(function (e) {
            console.log(e)
        });
}

function listarPorCategoria(idCateogoria, idCarrousel, idTitleCarrousel) {
    idCarrousel.innerHTML = ''
    fetch(`catalogo/listar-por-categoria?value=${idCateogoria}`)
        .then(data => data.json())
        .then((data) => {
            if (data.length) {
                idTitleCarrousel.innerHTML = `${data[0].nome_categoria}`
                for (let posicao = 0; posicao < data.length; posicao++) {
                    idCarrousel.innerHTML += `
                    <div class="item" onclick="redirectCatalogo(${data[posicao].id_catalogo})">
                        <div>
                            <img src="${data[posicao].thumbnail_catalogo}" alt="${data[posicao].nome_catalogo}">
                        </div>
                    </div>
                `
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


function fecharModalAssistir() {
    openModalAssistir.style.display = 'none'
}