package com.pucminas.backprojetoestacionamento.dataprovider.automovel;

import com.pucminas.backprojetoestacionamento.model.Automovel;
import com.pucminas.backprojetoestacionamento.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IAutomovelRepository extends JpaRepository<Automovel, String> {
    List<Automovel> findAutomovelByProprietario(Usuario proprietario);
}
