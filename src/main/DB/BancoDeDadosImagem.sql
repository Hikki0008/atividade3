CREATE DATABASE imagens_banco
    DEFAULT CHARACTER SET = 'utf8mb4';
    Use Imagens_banco;

    CREATE TABLE imagem(
        id BIGINT(20) NOT NULL AUTO_INCREMENT,
        nome VARCHAR(100) NOT NULL,
        url TEXT DEFAULT NULL,
        PRIMARY kEY (id)
    );
    SELECT * from imagem