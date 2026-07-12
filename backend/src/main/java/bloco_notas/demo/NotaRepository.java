package bloco_notas.demo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface NotaRepository extends JpaRepository<Nota, Long> {

    List<Nota> findByExcluidaFalse();

    List<Nota> findByExcluidaTrueOrderByDataExclusaoDesc();
}