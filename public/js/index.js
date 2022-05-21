function verMais() {
    window.location.href = 'catalogo.html'
}

function atualizarIcone() {
    if (sessionStorage.URL_ICONE) {
        profileIcon.src = sessionStorage.URL_ICONE
    }
}