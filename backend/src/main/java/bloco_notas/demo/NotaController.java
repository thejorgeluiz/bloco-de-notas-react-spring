package bloco_notas.demo;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/notas")
public class NotaController {

    @Autowired
    private NotaRepository repository;

    @PostMapping
    public Nota salvar(@RequestBody Nota nota) {
        return repository.save(nota);
    }

    // Retorna somente notas que não estão na lixeira
    @GetMapping
    public List<Nota> listar() {
        return repository.findByExcluidaFalse();
    }

    // Retorna as notas da lixeira
    @GetMapping("/lixeira")
    public List<Nota> listarLixeira() {
        return repository.findByExcluidaTrueOrderByDataExclusaoDesc();
    }

    // Move a nota para a lixeira
    @DeleteMapping("/{id}")
    public void excluir(@PathVariable Long id) {
        Nota nota = repository.findById(id).orElseThrow();

        nota.setExcluida(true);
        nota.setDataExclusao(LocalDateTime.now());

        repository.save(nota);
    }

    // Restaura uma nota da lixeira
    @PutMapping("/{id}/restaurar")
    public Nota restaurar(@PathVariable Long id) {
        Nota nota = repository.findById(id).orElseThrow();

        nota.setExcluida(false);
        nota.setDataExclusao(null);

        return repository.save(nota);
    }

    // Exclui definitivamente do banco
    @DeleteMapping("/{id}/definitivo")
    public void excluirDefinitivamente(@PathVariable Long id) {
        repository.deleteById(id);
    }

    @PutMapping("/{id}")
    public Nota atualizar(
        @PathVariable Long id,
        @RequestBody Nota notaAtualizada
    ) {
        Nota nota = repository.findById(id).orElseThrow();

        nota.setTexto(notaAtualizada.getTexto());

        return repository.save(nota);
    }

    @PutMapping("/{id}/fixar")
    public Nota alternarFixacao(@PathVariable Long id) {
        Nota nota = repository.findById(id).orElseThrow();

        nota.setFixada(!Boolean.TRUE.equals(nota.getFixada()));

        return repository.save(nota);
    }
}