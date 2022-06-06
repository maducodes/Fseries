function validarSessao() {
    if (sessionStorage.ADMIN_ID != 1) {
        window.location.href = '/index.html'
    }
}

function loadData() {
    quantidadeUsuarios()
    quantidadeVisualizacao()
    mediaFavoritos()
    listarUsuarios()
    listarSeries()
}

function quantidadeUsuarios() {
    fetch(`/usuario/quantidade-usuarios`)
        .then(data => data.json())
        .then((data) => {
            if (data.length) {
                total_ativos.innerHTML = data[0].total_usuario
            }
        })
}

function mediaFavoritos() {
    fetch(`/favorito//media-favoritos`)
        .then(data => data.json())
        .then((data) => {
            if (data.length) {
                //OPERAÇÃO MATEMATICA MEDIA DE FAVORITOS
                var quantidadeFavoritos = data[0].quantidade_favoritos
                var quantidadeCatalogos = data[0].quantidade_catalogo
                var media = quantidadeFavoritos / quantidadeCatalogos
                media_favoritos.innerHTML = media.toFixed(0)
            }
        })
}

function quantidadeVisualizacao() {
    fetch(`/visualizacao/quantidade-visualizacao`)
        .then(data => data.json())
        .then((data) => {
            if (data.length) {
                total_visualizacao.innerHTML = data[0].total_visualizacao
            }
        })
}

function listarUsuarios() {
    lista_usuarios.innerHTML = ''
    fetch(`/usuario/listar-usuarios`)
        .then(data => data.json())
        .then((data) => {
            if (data.length) {
                for (let posicao = 0; posicao < data.length; posicao++) {
                    lista_usuarios.innerHTML += `
                <div class="item">
                    <div>
                        <p>${data[posicao].nome_usuario}</p>
                        <p>${data[posicao].email_usuario}</p>
                    </div>
                </div>
            `
                }
            }
        })
}

function listarSeries() {
    lista_catalogo.innerHTML = ''
    fetch(`/catalogo/listar`)
    .then(data => data.json())
        .then((data) => {
            if (data.length) {
                for (let posicao = 0; posicao < data.length; posicao++) {
                    lista_catalogo.innerHTML += `
                     <div class="item">
                    <div>
                        <p>${data[posicao].nome_catalogo}</p>
                        <span>Categoria: ${data[posicao].nome_categoria}</span>
                    </div>
                    <div>
                        <p>Visualizações: ${data[posicao].quantidade_visualizacao}</p>
                    </div>
                   </div>
            `
                }
            }
        })
}

function openModalCatalogo() {
    openModalAssistir.style.display = ''
}

function closeModalCatalogo() {
    openModalAssistir.style.display = 'none'
}

function adicionarSerie() {
 var nomeSerie = nome.value
 var emissoraSerie = emissora.value
 var elencoSerie = elenco.value
 var thumbnailSerie = thumbnail.value
 var sinopseSerie = sinopse.value
 var backgroundSerie = background.value
 var categoriaSerie = categoria.value

 if (nomeSerie.length && emissoraSerie.length && elencoSerie.length && thumbnailSerie.length && sinopseSerie.length
    && backgroundSerie.length && categoriaSerie.length) {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
            // didOpen: () => {
            //     setInterval(() => {
            //         window.location.href = 'login.html'
            //     }, 1500);
            // }
        })
        Toast.fire({
            icon: 'success',
            title: 'Cadastrado com sucesso!'
        })
 }
}