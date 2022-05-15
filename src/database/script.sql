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
    quantidade_episodios int,
    quantidade_temporadas int,
    quantidade_visualizacao bigint,
    elenco_catalogo varchar(255),
    thumbnail_catalogo varchar(1000),
    background_catalogo varchar(1000),
    sinopse_catalogo text,
    link_video varchar(1000),
    fk_categoria int, foreign key (fk_categoria) references categoria(id_categoria)
);

create table favoritos (
	id_catalogo int primary key auto_increment,
    fk_usuario int, foreign key (fk_usuario) references usuario(id_usuario),
    fk_catalogo int, foreign key (fk_catalogo) references catalogo(id_catalogo)
);

create table assinanteNewsletter(
	id_assinante int primary key auto_increment,
    email_assinante varchar(255)
);

select * from iconePerfil;
select * from usuario;
select * from categoria;
select * from catalogo;
select * from favoritos;
select * from assinanteNewsletter;

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

insert into catalogo values 
(null, 'Bridgerton', 'Netflix', 16, 2, 0, 'Phoebe Dynevor, Jonathan Bailey, Regé-Jean Page', 'https://i.ibb.co/Y8D4N6y/card.png', 'https://i.ibb.co/s2ymDVC/background.png', 'Anthony inicia a procura por uma esposa, Eloise é apresentada à sociedade e Lady Danbury ajuda a rainha a escolher o maior diamante entre as debutantes da temporada.', 'https://www.youtube.com/watch?v=pyi8QAlHR8k&t=1s', 3),
(null, 'Anne with an e', 'Netflix', 27, 3, 0, 'Amybeth McNulty, Geraldine James, Lucas Jade Zumann', 'https://i.ibb.co/yQ3JC2g/wp3790884-anne-with-an-e-wallpapers.jpg', 'https://i.ibb.co/rmjjGVK/wp3790855-anne-with-an-e-wallpapers.jpg', 'Depois de treze anos sofrendo no sistema de assistência social, a orfã Anne é mandada para morar com uma solteirona e seu irmão. Munida de sua imaginação e de seu intelecto, a pequena Anne vai transformar a vida de sua família adotiva e da cidade que lhe abrigou, lutando pela sua aceitação e pelo seu lugar no mundo.', 'https://www.youtube.com/watch?v=bBervTlBurY&t=7s', 10),
(null, 'Gravity Falls', 'Disney+', 35, 2, 0, 'Jason Ritter, Kristen Schaal, Alex Hirsch', 'https://i.ibb.co/PYW89CS/gravity-falls-movie-poster-md.jpg', 'https://i.ibb.co/f2TbvfD/693780.jpg', 'Dipper e Mabel Pines são dois irmãos que são mandados para a loja do tio-avô Stan, em Gravity Falls, Oregon, para passarem lá o verão. Eles acham que as férias serão entediantes, mas quando Dipper encontra um estranho diário na floresta, eles descobrem que estranhos segredos estão fincados na cidade. Bem-vindos a Gravity Falls, a norte do normal e a oeste do esquisito.','https://www.youtube.com/watch?v=FQ9popDtEtc&list=PLHtiBDWLRlWua8lgUKFOZ1IX74rDFBNLh',
 9);