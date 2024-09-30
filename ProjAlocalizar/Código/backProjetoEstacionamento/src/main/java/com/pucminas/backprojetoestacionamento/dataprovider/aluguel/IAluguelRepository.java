package com.pucminas.backprojetoestacionamento.dataprovider.aluguel;

import com.pucminas.backprojetoestacionamento.model.Aluguel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IAluguelRepository extends JpaRepository<Aluguel, Long> {

    List<Aluguel> findAluguelByClienteId(Long clienteId);

    List<Aluguel> findAluguelByProprietarioId(Long proprietarioId);
}
