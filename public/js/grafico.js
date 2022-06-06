let proximaAtualizacao;

window.onload = obterDadosGrafico();

async function obterDadosGrafico() {
    if (proximaAtualizacao != undefined) {
        clearTimeout(proximaAtualizacao);
    }

    await fetch(`/metricas/favoritos-mes`)
        .then(data => data.json())
        .then(async (respostaFavoritos) => {
            await fetch(`/metricas/categorias-visualizadas`)
                .then(data => data.json())
                .then((respostaCategorias) => {
                    plotarGrafico(respostaFavoritos, respostaCategorias);
                })
        })
}

function plotarGrafico(respostaFavoritos, respostaCategorias) {
    //Grafico de line
    var respostaDadosMes = []
    for (i = 0; i < respostaFavoritos.length; i++) {
        respostaDadosMes.push(respostaFavoritos[i].quantidade_favoritos)
    }
    const dataFavorito = {
        labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho'],
        datasets: [
            {
                label: 'Quantidade favoritos',
                data: respostaDadosMes,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(153, 102, 255, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(153, 102, 255, 0.2)'
                ],
                borderWidth: 1
            }
        ]
    };
    const configMedidaMes = {
        type: 'line',
        data: dataFavorito,
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                }
            }
        }
    };
    window.myChartFavorito = new Chart(
        document.getElementById('medidaMes'),
        configMedidaMes
    );

    //Grafico de Doughnut
    var respostaDadosCategoria = []
    var nomesCategoria = []
    for (i = 0; i < respostaCategorias.length; i++) {
        respostaDadosCategoria.push(respostaCategorias[i].total_visualizacao)
        nomesCategoria.push(respostaCategorias[i].nome_categoria)
    }
    const dataCategoria = {
        labels: nomesCategoria,
        datasets: [{
            data: respostaDadosCategoria,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)'
            ],
            borderWidth: 1
        }]
    }

    const configCategoria = {
        type: 'doughnut',
        data: dataCategoria,
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                }
            },
            legend: {
                display: false
            }
        }
    };

    window.myChartCategoria = new Chart(
        document.getElementById('categoriaVisualizada'),
        configCategoria
    );

    setTimeout(() => atualizarGrafico(dataFavorito, myChartFavorito, dataCategoria, myChartCategoria, nomesCategoria), 5000);
}

function atualizarGrafico(dataFavorito, myChartFavorito, dataCategoria, myChartCategoria, nomesCategoria) {
    console.log('atualizei')
    fetch(`/metricas/favoritos-mes`)
        .then(data => data.json())
        .then((NewrespostaFavoritos) => {
            for (i = 0; i < NewrespostaFavoritos.length; i++) {
                dataFavorito.datasets[0].data[i] = NewrespostaFavoritos[i].quantidade_favoritos
            }
            window.myChartFavorito.update();
        })

    fetch(`/metricas/categorias-visualizadas`)
        .then(data => data.json())
        .then((NewrespostaCategorias) => {
            for (i = 0; i < NewrespostaCategorias.length; i++) {
                dataCategoria.datasets[0].data[i] = NewrespostaCategorias[i].total_visualizacao
                nomesCategoria[i] = NewrespostaCategorias[i].nome_categoria
            }
            window.myChartCategoria.update();
        })

    proximaAtualizacao = setTimeout(() => atualizarGrafico(dataFavorito, myChartFavorito, dataCategoria, myChartCategoria, nomesCategoria), 5000);
}
