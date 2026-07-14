package bloco_notas.demo;

public record CadastroRequest(
    String nome,
    String email,
    String senha
) {
}