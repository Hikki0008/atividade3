package atividades.BancoDeImagens.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import atividades.BancoDeImagens.Model.ImagemModel;

public interface ImagemRepository extends JpaRepository<ImagemModel, Long>{


}