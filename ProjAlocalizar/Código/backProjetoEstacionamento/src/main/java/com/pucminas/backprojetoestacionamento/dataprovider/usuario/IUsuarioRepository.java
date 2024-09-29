package com.pucminas.backprojetoestacionamento.dataprovider.usuario;


import com.pucminas.backprojetoestacionamento.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IUsuarioRepository extends JpaRepository<Usuario, String> {

}
