package com.pucminas.backprojetoestacionamento.entrypoint.aluguel;

import com.pucminas.backprojetoestacionamento.core.aluguel.AluguelService;
import com.pucminas.backprojetoestacionamento.model.Aluguel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/aluguel")
public class AluguelController {

    @Autowired
    AluguelService aluguelService;

    @PostMapping
    public ResponseEntity<Aluguel> criar(@RequestBody Aluguel aluguel) {
        Aluguel novoAluguel = aluguelService.salvar(aluguel);
        return ResponseEntity.ok(novoAluguel);
    }

    @PutMapping("/aderir")
    public ResponseEntity<Aluguel> aderir(@RequestParam Long id) {
        Aluguel aluguel = aluguelService.aderirAluguel(id);
        return ResponseEntity.ok(aluguel);
    }

    @PutMapping("/recusar")
    public ResponseEntity<Aluguel> recusar(@RequestParam Long id) {
        Aluguel aluguel = aluguelService.recusarAluguel(id);
        return ResponseEntity.ok(aluguel);
    }

    @GetMapping("/cliente")
    public ResponseEntity<List<Aluguel>> buscarPorCliente(@RequestParam Long idCliente) {
        List<Aluguel> alugueis = aluguelService.buscarAluguelPorCliente(idCliente);
        return ResponseEntity.ok(alugueis);
    }

    @GetMapping("/proprietario")
    public ResponseEntity<List<Aluguel>> buscarPorProprietario(@RequestParam Long idProprietario) {
        List<Aluguel> alugueis = aluguelService.buscarAluguelPorProprietario(idProprietario);
        return ResponseEntity.ok(alugueis);
    }
}
