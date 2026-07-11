package bloco_notas.demo;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;

@Entity //"Esta classe deve virar uma tabela no banco."
public class Nota {

    @Id //É a chave primária da tabela.
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @PrePersist
    public void prePersist() {
    dataCriacao = LocalDateTime.now();
}
public LocalDateTime getDataCriacao() {
    return dataCriacao;
}

    private LocalDateTime dataCriacao;

    private String texto;

    public Long getId() {
        return id;
    }

    public String getTexto() {
        return texto;
    }

    public void setTexto(String texto) {
        this.texto = texto;
    }
}