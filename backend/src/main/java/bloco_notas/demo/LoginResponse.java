package bloco_notas.demo;

public record LoginResponse(
    String token,
    UsuarioResponse usuario
) {
}