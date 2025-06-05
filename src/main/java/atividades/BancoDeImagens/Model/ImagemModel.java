package atividades.BancoDeImagens.Model;

import jakarta.annotation.Generated;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name ="Imagens")
@Getter
@Setter
@NoArgsConstructor
public class ImagemModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    @Column(length = 100)
    private String url;

}