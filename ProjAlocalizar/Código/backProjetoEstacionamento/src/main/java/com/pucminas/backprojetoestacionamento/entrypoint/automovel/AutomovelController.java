package com.pucminas.backprojetoestacionamento.entrypoint.automovel;

import com.pucminas.backprojetoestacionamento.core.automovel.AutomovelService;
import com.pucminas.backprojetoestacionamento.core.usuario.UsuarioService;
import com.pucminas.backprojetoestacionamento.model.Automovel;
import com.pucminas.backprojetoestacionamento.model.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/automovel")
public class AutomovelController {

    @Autowired
    AutomovelService automovelService;

    @Autowired
    UsuarioService usuarioService;

    @PostMapping
    public ResponseEntity<Automovel> criar(@RequestBody Automovel automovel) {
        automovel.setProprietario(usuarioService.buscarId(automovel.getProprietario().getId()));
        Automovel novoAutomovel = automovelService.salvar(automovel);
        return ResponseEntity.ok(novoAutomovel);
    }

    @GetMapping("/buscar")
    public ResponseEntity<Automovel> buscar(@RequestParam String placa) {
        Automovel automovel = automovelService.buscar(placa);
        return automovel != null ? ResponseEntity.ok(automovel) : ResponseEntity.notFound().build();
    }

    @GetMapping("/buscarPorProprietario")
    public ResponseEntity<List<Automovel>> buscarPorProprietario(@RequestParam Usuario placa) {
        List<Automovel> automovel = automovelService.listarPorProprietario(placa);
        return automovel != null ? ResponseEntity.ok(automovel) : ResponseEntity.notFound().build();
    }

    @GetMapping("/listar")
    public ResponseEntity<List<Automovel>> listarTodos() {
        List<Automovel> automoveis = automovelService.listarTodos();
        return ResponseEntity.ok(automoveis);
    }

    @PutMapping("/atualizar")
    public ResponseEntity<Automovel> atualizar(@RequestParam String placa, @RequestBody Automovel automovelAtualizado) {
        Automovel automovel = automovelService.atualizar(placa, automovelAtualizado);
        return automovel != null ? ResponseEntity.ok(automovel) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/excluir")
    public ResponseEntity<Void> excluir(@RequestParam String placa) {
        boolean excluido = automovelService.excluir(placa);
        return excluido ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
}
