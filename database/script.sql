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