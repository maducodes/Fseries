function validarSessao() {
    if (!sessionStorage.ID_USUARIO) {
        saudacoes.innerHTML = 'Entrar'
        divPerfilorLogout.style.display = 'none'
    }
}

function openModal() {
    if(divPerfilorLogout.style.display == 'none' && sessionStorage.ID_USUARIO) {
        divPerfilorLogout.style.display = 'block'
    } else {
        divPerfilorLogout.style.display = 'none'
        window.location.href = "login.html"
    }
}

function onSearch() {
    var pesquisa = searchInput.value
    console.log('to sendo chamado' + pesquisa)
}

function myprofile() {
    console.log('open profile')
}