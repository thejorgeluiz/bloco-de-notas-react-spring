package bloco_notas.demo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface NotaRepository
    extends JpaRepository<Nota, Long> {

    // Métodos antigos, removidos após atualizar o controller
    List<Nota> findByExcluidaFalse();

    List<Nota> findByExcluidaTrueOrderByDataExclusaoDesc();

    // Retorna as notas ativas de um usuário
    List<Nota> findByUsuarioIdAndExcluidaFalse(
        Long usuarioId
    );

    // Retorna a lixeira de um usuário
    List<Nota> findByUsuarioIdAndExcluidaTrueOrderByDataExclusaoDesc(
        Long usuarioId
    );

    // Localiza uma nota somente se ela pertencer ao usuário
    Optional<Nota> findByIdAndUsuarioId(
        Long id,
        Long usuarioId
    );
}