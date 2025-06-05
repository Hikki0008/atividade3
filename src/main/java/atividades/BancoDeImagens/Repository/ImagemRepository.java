package atividades.BancoDeImagens.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import atividades.BancoDeImagens.Model.ImagemModel;
@Repository
public interface ImagemRepository extends JpaRepository<ImagemModel, Long>{


}