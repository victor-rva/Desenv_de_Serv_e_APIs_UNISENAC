CREATE DATABASE loja_online;

USE loja_online;

CREATE TABLE cidades(
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(50)
);

CREATE TABLE clientes (
id INT NOT NULL PRIMARY KEY AUTO_INCREMENT ,
nome VARCHAR(100) NOT NULL ,
altura DOUBLE ,
nascimento DATE DEFAULT '1980-01-01' ,
cidade_id INT ,
FOREIGN KEY (cidade_id) REFERENCES cidades(id)
);

CREATE TABLE pedidos (
id INT NOT NULL PRIMARY KEY AUTO_INCREMENT ,
horario DATETIME ,
endereco VARCHAR(100) NOT NULL ,
cliente_id INT ,
FOREIGN KEY (cliente_id) REFERENCES clientes(id)
);

CREATE TABLE categorias(
id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(100) 
);

CREATE TABLE produtos (
id int NOT NULL primary key auto_increment,
nome VARCHAR(100),
preco DOUBLE,
quantidade DOUBLE,
categoria_id INT,
FOREIGN KEY(categoria_id) REFERENCES categorias(id)
);

CREATE TABLE pedidos_produtos(
pedido_id INT NOT NULL ,
produto_id INT NOT NULL ,
preco DOUBLE,
quantidade DOUBLE,
PRIMARY KEY (pedido_id, produto_id),
foreign key(pedido_id) references pedidos (id),
foreign key(produto_id) references produtos (id)
);
