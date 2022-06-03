function validarSessao() {
    if (sessionStorage.ADMIN_ID != 1) {
        window.location.href = 'index.html'
    }
}