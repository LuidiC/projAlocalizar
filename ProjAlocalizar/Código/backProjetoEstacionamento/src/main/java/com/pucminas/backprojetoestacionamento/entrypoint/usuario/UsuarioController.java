package com.pucminas.backprojetoestacionamento.entrypoint.usuario;

import com.pucminas.backprojetoestacionamento.model.Usuario;
import com.pucminas.backprojetoestacionamento.usecase.usuario.DeletarUsuarioUseCase;
import com.pucminas.backprojetoestacionamento.usecase.usuario.ObterUsuarioUseCase;
import com.pucminas.backprojetoestacionamento.usecase.usuario.SalvarNovoUsuarioUseCase;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/usuario")
public class UsuarioController {
    @Autowired
    SalvarNovoUsuarioUseCase salvarNovoUsuarioUseCase;

    @Autowired
    DeletarUsuarioUseCase deletarUsuarioUseCase;

    @Autowired
    ObterUsuarioUseCase obterUsuarioUseCase;

    @PostMapping("/novoUsuario")
    public ResponseEntity<Usuario> salvaNovoUsuario(@RequestBody Usuario usuario) {
        return ResponseEntity.ok(salvarNovoUsuarioUseCase.salvarNovoUsuario(usuario));
    }

    @DeleteMapping("/deletarUsuario")
    public ResponseEntity<Usuario> deletarUsuario(@RequestBody String usuario) {
        return ResponseEntity.ok(deletarUsuarioUseCase.deletarUsuario(usuario));
    }

    @GetMapping("/login")
    public ResponseEntity<Usuario> obterUsuario(@RequestParam String cpf, @RequestParam String senha) {
        return ResponseEntity.ok(obterUsuarioUseCase.obterUsuarioPorId(cpf, senha));
    }

}
