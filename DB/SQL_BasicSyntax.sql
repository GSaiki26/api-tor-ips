CREATE DATABASE Proof; -- Crie o banco de dados
Use Proof;  -- Selecione o Db proof.
CREATE TABLE Banned_IPs(ip varchar(40) NOT NULL, UNIQUE(ip)); -- Crie uma tabela com uma row ip não nula e única.