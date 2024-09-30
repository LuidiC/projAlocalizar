package com.pucminas.backprojetoestacionamento.usecase.usuario;

import com.pucminas.backprojetoestacionamento.common.enums.TipoUsuario;
import com.pucminas.backprojetoestacionamento.core.usuario.UsuarioService;
import com.pucminas.backprojetoestacionamento.model.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ObterUsuarioUseCase {

    @Autowired
    UsuarioService usuarioService;


    public Usuario obterUsuarioPorId(String cpf, String senha) {
        return usuarioService.login(cpf, senha);
    }


}
