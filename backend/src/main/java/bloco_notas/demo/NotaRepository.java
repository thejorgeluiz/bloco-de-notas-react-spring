package bloco_notas.demo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface NotaRepository
    extends JpaRepository<Nota, Long> {

    List<Nota> findByUsuarioIdAndExcluidaFalse(
        Long usuarioId
    );

    List<Nota> findByUsuarioIdAndExcluidaTrueOrderByDataExclusaoDesc(
        Long usuarioId
    );

    Optional<Nota> findByIdAndUsuarioId(
        Long id,
        Long usuarioId
    );
}