package com.pucminas.backprojetoestacionamento.usecase.usuario;


import com.pucminas.backprojetoestacionamento.core.usuario.UsuarioService;
import com.pucminas.backprojetoestacionamento.model.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class DeletarUsuarioUseCase {
    @Autowired
    UsuarioService usuarioService;

    public Usuario deletarUsuario(String usuario){
        return usuarioService.deletarUsuario(usuario);
    }
}
