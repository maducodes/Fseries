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
    url_video varchar(1000),
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
	id_catalogo int primary key auto_increment,
    fk_usuario int, foreign key (fk_usuario) references usuario(id_usuario),
    fk_catalogo int, foreign key (fk_catalogo) references catalogo(id_catalogo)
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
('Edwina - Bridgerton', 'https://i.ibb.co/F8LF3sm/brideton.png');

SELECT * FROM usuario;
INSERT INTO usuario (nome_usuario, email_usuario, senha_usuario, data_nascimento, tipo_admin, fk_icone, cpf_usuario) 
VALUES ('Maria Eduarda', 'maaahjx@gmail.com', '12345678', '2003/09/01', 1, 14, 52355271860);

SELECT * FROM favoritos
LEFT JOIN catalogo ON catalogo.id_catalogo = favoritos.fk_catalogo
INNER JOIN temporada ON catalogo.id_catalogo = temporada.fk_catalogo
INNER JOIN episodio ON temporada.id_temporada = episodio.fk_temporada;

SELECT * FROM catalogo;
INSERT INTO catalogo (nome_catalogo, emissora_catalogo, quantidade_visualizacao, elenco_catalogo, thumbnail_catalogo, sinopse_catalogo,
url_video, fk_categoria)
VALUES ('Bridgerton', 'Netflix', 0, 'Phoebe Dynevor, Jonathan Bailey, Regé-Jean Page',
 'https://i.ibb.co/Y8D4N6y/card.png', 'Anthony inicia a procura por uma esposa, 
 Eloise é apresentada à sociedade e Lady Danbury ajuda a rainha a escolher o maior 
 diamante entre as debutantes da temporada.', 'https://www.youtube.com/watch?v=pyi8QAlHR8k&t=1s', 3),
 ('Vikins', 'Netflix', 0, 'Alex Høgh Andersen, Gustaf Skarsgård, Marco Ilsø',
 'https://i.ibb.co/ZThwHWx/vikins.jpg', 'Esta série dramática acompanha a vida do viking Ragnar Lothbrok em sua jornada 
 para ampliar o domínio nórdico e desafiar um líder incompetente e sem visão.', 'https://www.youtube.com/watch?v=nHMQBg6Zduc', 4),
 ('Brooklyn Nine Nine', 'Netflix', 0, 'Andy Samberg, Andre Braugher, Stephanie Beatriz',
 'https://i.ibb.co/qyJhsMq/brooklyn.jpg', 'O brilhante e imaturo detetive Jake Peralta precisa aprender a seguir as r
 egras e trabalhar em equipe quando um capitão exigente assume o comando de seu esquadrão.', 'https://www.youtube.com/watch?v=sEOuJ4z5aTc', 2),
('The Mandalorian', 'Disney +', 0, 'Pedro Pascal, Troy Kotsur, Ming-Na Wen',
 'https://i.ibb.co/PTFMhrB/2728562-jpg-c-310-420-49-62-f-jpg-q-x-xxyxx.jpg" alt="2728562-jpg-c-310-420-49-62-f-jpg-q-x-xxyxx',
 'Em The Mandalorian, Din Djarin (Pedro Pascal) é um guerreiro solitário que trabalha como caçador de recompensa. Ele embarca numa jornada pelos territórios esquecidos da galáxia, 
 logo após a queda do Império e antes da criação da temida Primeira Ordem.', 'https://www.youtube.com/watch?v=rV-BmMbWEj4', 9),
 ('Carmen Sandiego', 'Netflix', 0, "Gina Rodriguez, Finn Wolfhard, Liam O'Brien",
 'https://i.ibb.co/Th0fQyk/carmensandiego.jpg', 'A órfã Carmen se inscreve na Academia V.I.L.E., uma escola de ladrões. 
 Com o codinome de Ovelha Negra, ela faz amigos rapidamente... e inimigos também.', 'https://www.youtube.com/watch?v=yh2dFPgAWqc', 9);

SELECT * FROM temporada;
INSERT INTO temporada (numero_temporada, fk_catalogo) VALUES 
(1, 3),
(2, 3);

INSERT INTO temporada (numero_temporada, fk_catalogo) VALUES 
(1, 5),
(2, 5),
(3, 5);


SELECT * FROM episodio;
INSERT INTO episodio (nome_episodio, url_episodio, fk_temporada, numero_episodio) VALUES 
('Diamante Raro', 'https://www.youtube.com/watch?v=tiDVB2DvYps', 1, 1),
('Choque e Deleite', 'https://www.youtube.com/watch?v=tLmBAtfDp6s', 2, 2);