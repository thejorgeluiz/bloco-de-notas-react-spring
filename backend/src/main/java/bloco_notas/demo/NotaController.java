package bloco_notas.demo;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@CrossOrigin(origins = "${FRONTEND_URL:http://localhost:5173}")
@RestController
@RequestMapping("/notas")
public class NotaController {

    private final NotaRepository notaRepository;
    private final UsuarioRepository usuarioRepository;

    public NotaController(
        NotaRepository notaRepository,
        UsuarioRepository usuarioRepository
    ) {
        this.notaRepository = notaRepository;
        this.usuarioRepository = usuarioRepository;
    }

    @PostMapping
    public Nota salvar(
        @RequestBody Nota nota,
        @AuthenticationPrincipal Jwt jwt
    ) {
        if (
            nota.getTexto() == null ||
            nota.getTexto().isBlank()
        ) {
            throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST,
                "O texto da nota não pode estar vazio."
            );
        }

        Usuario usuario = buscarUsuario(jwt);

        nota.setTexto(nota.getTexto().trim());
        nota.setUsuario(usuario);

        return notaRepository.save(nota);
    }

    @GetMapping
    public List<Nota> listar(
        @AuthenticationPrincipal Jwt jwt
    ) {
        return notaRepository
            .findByUsuarioIdAndExcluidaFalse(
                obterUsuarioId(jwt)
            );
    }

    @GetMapping("/lixeira")
    public List<Nota> listarLixeira(
        @AuthenticationPrincipal Jwt jwt
    ) {
        return notaRepository
            .findByUsuarioIdAndExcluidaTrueOrderByDataExclusaoDesc(
                obterUsuarioId(jwt)
            );
    }

    @DeleteMapping("/{id}")
    public void excluir(
        @PathVariable Long id,
        @AuthenticationPrincipal Jwt jwt
    ) {
        Nota nota = buscarNotaDoUsuario(id, jwt);

        nota.setExcluida(true);
        nota.setDataExclusao(LocalDateTime.now());

        notaRepository.save(nota);
    }

    @PutMapping("/{id}/restaurar")
    public Nota restaurar(
        @PathVariable Long id,
        @AuthenticationPrincipal Jwt jwt
    ) {
        Nota nota = buscarNotaDoUsuario(id, jwt);

        nota.setExcluida(false);
        nota.setDataExclusao(null);

        return notaRepository.save(nota);
    }

    @DeleteMapping("/{id}/definitivo")
    public void excluirDefinitivamente(
        @PathVariable Long id,
        @AuthenticationPrincipal Jwt jwt
    ) {
        Nota nota = buscarNotaDoUsuario(id, jwt);

        notaRepository.delete(nota);
    }

    @PutMapping("/{id}")
    public Nota atualizar(
        @PathVariable Long id,
        @RequestBody Nota notaAtualizada,
        @AuthenticationPrincipal Jwt jwt
    ) {
        if (
            notaAtualizada.getTexto() == null ||
            notaAtualizada.getTexto().isBlank()
        ) {
            throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST,
                "O texto da nota não pode estar vazio."
            );
        }

        Nota nota = buscarNotaDoUsuario(id, jwt);

        nota.setTexto(notaAtualizada.getTexto().trim());
        nota.setDataAtualizacao(LocalDateTime.now());

        return notaRepository.save(nota);
    }

    @PutMapping("/{id}/fixar")
    public Nota alternarFixacao(
        @PathVariable Long id,
        @AuthenticationPrincipal Jwt jwt
    ) {
        Nota nota = buscarNotaDoUsuario(id, jwt);

        nota.setFixada(
            !Boolean.TRUE.equals(nota.getFixada())
        );

        return notaRepository.save(nota);
    }

    private Long obterUsuarioId(Jwt jwt) {
        if (jwt == null || jwt.getSubject() == null) {
            throw new ResponseStatusException(
                HttpStatus.UNAUTHORIZED,
                "Autenticação necessária."
            );
        }

        return Long.valueOf(jwt.getSubject());
    }

    private Usuario buscarUsuario(Jwt jwt) {
        return usuarioRepository
            .findById(obterUsuarioId(jwt))
            .orElseThrow(() ->
                new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "Usuário não encontrado."
                )
            );
    }

    private Nota buscarNotaDoUsuario(
        Long notaId,
        Jwt jwt
    ) {
        return notaRepository
            .findByIdAndUsuarioId(
                notaId,
                obterUsuarioId(jwt)
            )
            .orElseThrow(() ->
                new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "Nota não encontrada."
                )
            );
    }
}