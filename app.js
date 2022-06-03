process.env.AMBIENTE_PROCESSO = "desenvolvimento";
// process.env.AMBIENTE_PROCESSO = "producao";

var express = require("express");
var cors = require("cors");
var path = require("path");
var PORTA = 3333;

var app = express();

var indexRouter = require("./src/routes/index");
var usuarioRouter = require("./src/routes/usuarios");
var iconeRouter = require("./src/routes/icone");
var catalogoRouter = require("./src/routes/catalogo");
var favoritoRouter = require("./src/routes/favorito");
var assistirRouter = require("./src/routes/assistir");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

app.use("/", indexRouter);
app.use("/usuario", usuarioRouter);
app.use("/icone", iconeRouter);
app.use("/catalogo", catalogoRouter);
app.use("/favorito", favoritoRouter);
app.use("/assistir", assistirRouter)

app.listen(PORTA, function () {
console.log(`Servidor do seu site já está rodando!!
Acesse o caminho a seguir para visualizar: http://localhost:${PORTA}
Você está rodando sua aplicação em Ambiente de ${process.env.AMBIENTE_PROCESSO} \n`);
});