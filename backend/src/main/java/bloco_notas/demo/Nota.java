package bloco_notas.demo;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;

@Entity
public class Nota {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String texto;

    @Column(nullable = false)
    private Boolean fixada = false;

    @Column(nullable = false)
    private Boolean excluida = false;

    private LocalDateTime dataCriacao;

    private LocalDateTime dataAtualizacao;

    private LocalDateTime dataExclusao;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

    @PrePersist
    public void prePersist() {
        dataCriacao = LocalDateTime.now();
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

    public Boolean getFixada() {
        return fixada;
    }

    public void setFixada(Boolean fixada) {
        this.fixada = fixada;
    }

    public Boolean getExcluida() {
        return excluida;
    }

    public void setExcluida(Boolean excluida) {
        this.excluida = excluida;
    }

    public LocalDateTime getDataCriacao() {
        return dataCriacao;
    }

    public LocalDateTime getDataAtualizacao() {
        return dataAtualizacao;
    }

    public void setDataAtualizacao(
        LocalDateTime dataAtualizacao
    ) {
        this.dataAtualizacao = dataAtualizacao;
    }

    public LocalDateTime getDataExclusao() {
        return dataExclusao;
    }

    public void setDataExclusao(
        LocalDateTime dataExclusao
    ) {
        this.dataExclusao = dataExclusao;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }
}