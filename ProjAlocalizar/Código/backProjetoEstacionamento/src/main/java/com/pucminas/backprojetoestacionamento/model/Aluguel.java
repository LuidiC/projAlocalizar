package com.pucminas.backprojetoestacionamento.model;

import com.pucminas.backprojetoestacionamento.common.enums.EstadoAluguel;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Data
@Entity(name = "alugueis")
public class Aluguel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "automovel_placa")
    Automovel automovel;

    @ManyToOne
    @JoinColumn(name = "cliente_id")
    Usuario cliente;

    @ManyToOne
    @JoinColumn(name = "proprietario_id")
    Usuario proprietario;

    LocalDate dataAluguel;

    Integer diasAluguel;

    EstadoAluguel aderido = EstadoAluguel.PENDENTE;
}
