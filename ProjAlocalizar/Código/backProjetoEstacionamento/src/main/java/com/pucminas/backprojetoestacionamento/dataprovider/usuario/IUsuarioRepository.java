package com.pucminas.backprojetoestacionamento.dataprovider.usuario;


import com.pucminas.backprojetoestacionamento.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IUsuarioRepository extends JpaRepository<Usuario, Long> {
    Usuario findUsuarioByCpfCnpj(String cpf);
}
