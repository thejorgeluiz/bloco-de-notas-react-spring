package bloco_notas.demo;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;

@Entity //Esta classe deve virar uma tabela no banco.
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
@Column(nullable = false)
private Boolean fixada = false;

  @Column(nullable = false)
private Boolean excluida = false;

private LocalDateTime dataExclusao;

public Boolean getExcluida() {
    return excluida;
}

public void setExcluida(Boolean excluida) {
    this.excluida = excluida;
}

public LocalDateTime getDataExclusao() {
    return dataExclusao;
}

public void setDataExclusao(LocalDateTime dataExclusao) {
    this.dataExclusao = dataExclusao;
}

    private LocalDateTime dataCriacao;
@Column(columnDefinition = "TEXT", nullable = false)
    private String texto;
public Boolean getFixada() {
    return fixada;
}

public void setFixada(Boolean fixada) {
    this.fixada = fixada;
}

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