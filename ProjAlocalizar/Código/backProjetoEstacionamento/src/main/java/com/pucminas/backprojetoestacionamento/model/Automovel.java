package com.pucminas.backprojetoestacionamento.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity(name = "automovel")
public class Automovel {
    @Id
    String matricula;

    String placa;

    String modelo;

    String marca;

    Integer ano;
}
