package com.pucminas.backprojetoestacionamento.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Data
@Entity(name = "automovel")
public class Automovel {
    @Id
    String placa;

    String modelo;

    String marca;

    Integer ano;

    Boolean disponivel = true;

    @ManyToOne
    @JoinColumn(name = "proprietario_id")
    Usuario proprietario;
}
