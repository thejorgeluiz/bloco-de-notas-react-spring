package bloco_notas.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/notas")
public class NotaController {
  @PutMapping("/{id}/fixar")
public Nota alternarFixacao(@PathVariable Long id) {
    Nota nota = repository.findById(id).orElseThrow();

    nota.setFixada(!Boolean.TRUE.equals(nota.getFixada()));

    return repository.save(nota);
}

    @Autowired
    private NotaRepository repository;

    @PostMapping
    public Nota salvar(@RequestBody Nota nota) {
        return repository.save(nota);
    }

    @GetMapping
    public List<Nota> listar() {
    return repository.findAll();
  }
  @DeleteMapping("/{id}")
  public void excluir(@PathVariable Long id) {
    repository.deleteById(id);
}

@PutMapping("/{id}")
public Nota atualizar(@PathVariable Long id, @RequestBody Nota notaAtualizada) {

    Nota nota = repository.findById(id).orElseThrow();

    nota.setTexto(notaAtualizada.getTexto());

    return repository.save(nota);
}

}