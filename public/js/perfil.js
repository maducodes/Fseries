function validarLogin() {
    if (!sessionStorage.ID_USUARIO) {
        window.location.href = "index.html";
    }
}

function voltar() {
    window.location.href = "index.html";
}

function encontrarUsuario() {
    var idUsuario = sessionStorage.ID_USUARIO
    fetch(`usuario/listar?value=${idUsuario}`)
        .then(data => data.json())
        .then(() => {
        }).catch(function (e) {
            console.log(e)
        });
}

function editarPerfil() {
        
}