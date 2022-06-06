create database fseries;
use fseries;

create table iconePerfil (
	id_icone int primary key auto_increment,
    url_icone varchar(1000),
    nome_icone varchar(255)
);

create table usuario (
	id_usuario int primary key auto_increment,
    nome_usuario varchar(255),
    email_usuario varchar(255),
    cpf_usuario varchar(11),
    senha_usuario varchar(255),
    data_nascimento date,
    tipo_admin tinyint,
    fk_icone int, foreign key (fk_icone) references iconePerfil(id_icone)
);

create table categoria (
	id_categoria int primary key auto_increment,
    nome_categoria varchar(255)
);

create table catalogo (
	id_catalogo int primary key auto_increment,
    nome_catalogo varchar(255),
    emissora_catalogo varchar(255),
    quantidade_visualizacao bigint,
    elenco_catalogo varchar(255),
    thumbnail_catalogo varchar(1000),
    sinopse_catalogo text,
    url_background varchar(1000),
    fk_categoria int, foreign key (fk_categoria) references categoria(id_categoria)
);

create table temporada (
	id_temporada int primary key auto_increment,
    numero_temporada int,
    fk_catalogo int, foreign key (fk_catalogo) references catalogo(id_catalogo)
);

create table episodio (
	id_episodio int primary key auto_increment,
    nome_episodio varchar(255),
    numero_episodio int,
    url_episodio varchar(1000),
    fk_temporada int, foreign key (fk_temporada) references temporada(id_temporada)
);

create table favoritos (
	id_favorito int primary key auto_increment,
    fk_usuario int, foreign key (fk_usuario) references usuario(id_usuario),
    fk_catalogo int, foreign key (fk_catalogo) references catalogo(id_catalogo),
    data_favorito datetime default current_timestamp
);

select * from categoria;
insert into categoria values 
(null, 'Ação'),
(null, 'Comédia'),
(null, 'Romance'),
(null, 'Aventura'),
(null, 'Crime'),
(null, 'Policial'),
(null, 'Suspense'),
(null, 'Ficção científica'),
(null, 'Animação'),
(null, 'Drama');
 
SELECT * FROM iconePerfil;
INSERT INTO iconeperfil (nome_icone, url_icone) VALUES 
('Wanda', 'https://i.ibb.co/C7XK43V/wanda.png'),
('Valente', 'https://i.ibb.co/pjFgbh6/valente.png'),
('Round 6', 'https://i.ibb.co/G9tRYGL/round6.png'),
('Mabel', 'https://i.ibb.co/8jgwfq4/mabel.png'),
('Lucifer', 'https://i.ibb.co/sC7b2pK/lucifer2.png'),
('Chloe', 'https://i.ibb.co/SJkdf2p/lucifer.png'),
('La casa de papel', 'https://i.ibb.co/QNbG9qr/la-casa-de-papel.png'),
('Groot', 'https://i.ibb.co/XysPmkw/groot.png'),
('Descendentes', 'https://i.ibb.co/NLM21RX/descendentes.png'),
('Dark', 'https://i.ibb.co/30PhD1w/dark.png'),
('Carmen Sandiego', 'https://i.ibb.co/r3RtPNK/carmensandiego.png'),
('daphne - Bridgerton', 'https://i.ibb.co/Svw67Mc/bridgerton2.png'),
('Bojack Horseman', 'https://i.ibb.co/WF4hGTq/bojackhorseman.png'),
('Edwina - Bridgerton', 'https://i.ibb.co/F8LF3sm/brideton.png'),
('fseries', 'https://i.ibb.co/JxvkPqs/favicon.png');

SELECT * FROM usuario;
INSERT INTO usuario (nome_usuario, email_usuario, senha_usuario, data_nascimento, tipo_admin, fk_icone, cpf_usuario) 
VALUES ('Maria Eduarda', 'maaahjx@gmail.com', '12345678', '2003/09/01', 1, 14, 52355271860);

select * from favoritos;
select * from catalogo where id_catalogo = 29;
insert into favoritos (fk_usuario, fk_catalogo) values (1, 39);




-- total de usuarios
select count(usuario.id_usuario) from usuario;

select*from favoritos;

-- total de visualizacao
select sum(quantidade_visualizacao) as 'total_visualizacao' from catalogo;

-- total de favoritos e series total de curtidas
select count(favoritos.id_favorito) as 'quantidade_favoritos', count(distinct(fk_catalogo)) as 'quantidade_catalogo' from favoritos;

-- favoritos por mes


select count(*) from favoritos where cast(data_favorito as date) between '2022-06-01' and '2022-06-05';

SELECT MONTH(cast(data_favorito as date)) AS mes, count(*) AS quantidade_favoritos 
FROM favoritos GROUP BY MONTH(cast(data_favorito AS DATE))
ORDER BY MONTH(cast(data_favorito as date)) ASC;

select * from favoritos;

SELECT cast(data_favorito as date) , Count(*)
FROM favoritos;

-- categorias mais visualizadas
SELECT sum(quantidade_visualizacao) AS 'total_visualizacao', categoria.nome_categoria FROM catalogo
INNER JOIN categoria ON categoria.id_categoria = catalogo.fk_categoria
GROUP BY categoria.id_categoria ORDER BY sum(quantidade_visualizacao) DESC limit 5;

-- lista de usuarios
select nome_usuario, email_usuario from usuario;

-- lista de series
select catalogo.nome_catalogo, catalogo.quantidade_visualizacao, categoria.nome_categoria from catalogo
INNER JOIN categoria on categoria.id_categoria = catalogo.fk_categoria;