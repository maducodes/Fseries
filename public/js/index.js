function verMais() {
    window.location.href = 'catalogo.html'
}

function atualizarIcone() {
    if (sessionStorage.URL_ICONE) {
        profileIcon.src = sessionStorage.URL_ICONE
    }
}

function listar() {
    fetch(`/catalogo/listar`)
        .then(data => data.json())
        .then((data) => {
            setInterval(() => {
                const posicao = Math.floor(Math.random() * data.length);
                backgroundPrincipal.src = `${data[posicao].thumbnail_catalogo}`
                conteudoPrincipal.innerHTML = `
                    <h1>${data[posicao].nome_catalogo}</h1>
                    <p>Uma série original <span style="color: #fff;">${data[posicao].emissora_catalogo}</span>
                    <span>${data[posicao].quantidade_visualizacao}% relevância</span></p>
                        <div>
                            <button onclick="play()"><img src="assets/img/dashboard/play.svg"
                                    alt="Assistir">ASSISTIR</button>
                            <img onclick="verMais()" class="informacao" src="assets/img/dashboard/info.svg"
                                alt="Mais informações" />
                        </div>
                `
            }, 15000);
        }).catch(function (e) {
            console.log(e)
        });
}

function listarPorRelevancia() {
    maiorRelevancia.innerHTML = ''
    fetch(`/catalogo/listar-por-relevante`)
        .then(data => data.json())
        .then((data) => {
            titleRelevante.innerHTML = `Mais relevantes`
            for (let posicao = 0; posicao < data.length; posicao++) {
                maiorRelevancia.innerHTML += `
                    <div class="item">
                        <div>
                            <img src="${data[posicao].thumbnail_catalogo}" alt="${data[posicao].nome_catalogo}">
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
                    <div class="item">
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