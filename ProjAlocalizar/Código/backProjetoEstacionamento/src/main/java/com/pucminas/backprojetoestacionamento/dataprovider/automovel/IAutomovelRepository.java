package com.pucminas.backprojetoestacionamento.dataprovider.automovel;

import com.pucminas.backprojetoestacionamento.model.Automovel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IAutomovelRepository extends JpaRepository<Automovel, String> {

}
