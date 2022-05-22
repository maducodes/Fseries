function atualizarIcone() {
    if (sessionStorage.URL_ICONE) {
        profileIcon.src = sessionStorage.URL_ICONE
    }
}