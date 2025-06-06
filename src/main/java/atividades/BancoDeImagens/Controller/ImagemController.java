package atividades.BancoDeImagens.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import atividades.BancoDeImagens.Model.ImagemModel;
import atividades.BancoDeImagens.Service.ImagemService;

@RestController
@RequestMapping("/api/Imagens")
public class ImagemController {
    @Autowired
    private ImagemService service;

    @GetMapping
    public List<ImagemModel> listarTodos(){
        return service.listarTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ImagemModel> buscarPorId(@PathVariable  Long id) {
        return service.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ImagemModel salvar(@RequestBody ImagemModel imagemModel){
        return service.salvar(imagemModel);
    }

    @PutMapping("/{id}")
    public ResponseEntity <ImagemModel> atualizar (@PathVariable Long id, @RequestBody ImagemModel imagemModel){

        if (!service.buscarPorId(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(service.salvar(imagemModel));

    }

   @DeleteMapping("/{id}")
public ResponseEntity<Void> deletar(@PathVariable Long id) {
    if (!service.buscarPorId(id).isPresent()) {
        return ResponseEntity.notFound().build();
    }

    service.deletar(id);
    return ResponseEntity.noContent().build();
}

}