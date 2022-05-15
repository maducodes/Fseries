function validarSessao() {
    if (!sessionStorage.ID_USUARIO) {
        saudacoes.innerHTML = 'Entrar'
        divPerfilorLogout.style.display = 'none'
    } else {
        saudacoes.innerHTML = `Bem vindo, ${sessionStorage.NOME_USUARIO}`
    }
}

function openModal() {
    if(divPerfilorLogout.style.display == 'none' && sessionStorage.ID_USUARIO) {
        divPerfilorLogout.style.display = 'block'
    } else if (divPerfilorLogout.style.display == 'none' && !sessionStorage.ID_USUARIO && saudacoes.innerHTML == 'Entrar') {
        window.location.href = "login.html"
    } else {
        divPerfilorLogout.style.display = 'none'
    }
}

function onSearch() {
    var pesquisa = searchInput.value
    console.log('to sendo chamado' + pesquisa)
}

function myprofile() {
    console.log('open profile')
}

function sair() {
    sessionStorage.clear()
    window.location.reload()
}