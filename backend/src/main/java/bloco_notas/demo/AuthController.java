package bloco_notas.demo;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "${FRONTEND_URL:http://localhost:5173}")
@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthController(
        UsuarioRepository usuarioRepository,
        PasswordEncoder passwordEncoder
    ) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/cadastro")
    public ResponseEntity<?> cadastrar(
        @RequestBody CadastroRequest cadastro
    ) {
        if (
            cadastro.nome() == null ||
            cadastro.email() == null ||
            cadastro.senha() == null ||
            cadastro.nome().isBlank() ||
            cadastro.email().isBlank() ||
            cadastro.senha().isBlank()
        ) {
            return ResponseEntity.badRequest().body(
                Map.of("mensagem", "Preencha todos os campos.")
            );
        }

        String email = cadastro.email().trim().toLowerCase();

        if (usuarioRepository.existsByEmail(email)) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(
                Map.of("mensagem", "Este e-mail já está cadastrado.")
            );
        }

        if (cadastro.senha().length() < 8) {
            return ResponseEntity.badRequest().body(
                Map.of(
                    "mensagem",
                    "A senha deve possuir pelo menos 8 caracteres."
                )
            );
        }

        Usuario usuario = new Usuario();
        usuario.setNome(cadastro.nome().trim());
        usuario.setEmail(email);
        usuario.setSenha(passwordEncoder.encode(cadastro.senha()));

        Usuario usuarioSalvo = usuarioRepository.save(usuario);

        UsuarioResponse resposta = new UsuarioResponse(
            usuarioSalvo.getId(),
            usuarioSalvo.getNome(),
            usuarioSalvo.getEmail()
        );

        return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(resposta);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest login) {

        if (
            login.email() == null ||
            login.senha() == null ||
            login.email().isBlank() ||
            login.senha().isBlank()
        ) {
            return ResponseEntity.badRequest().body(
                Map.of("mensagem", "Informe o e-mail e a senha.")
            );
        }

        String email = login.email().trim().toLowerCase();

        Usuario usuario = usuarioRepository
            .findByEmail(email)
            .orElse(null);

        if (
            usuario == null ||
            !passwordEncoder.matches(
                login.senha(),
                usuario.getSenha()
            )
        ) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                Map.of("mensagem", "E-mail ou senha inválidos.")
            );
        }

        UsuarioResponse resposta = new UsuarioResponse(
            usuario.getId(),
            usuario.getNome(),
            usuario.getEmail()
        );

        return ResponseEntity.ok(resposta);
    }
}