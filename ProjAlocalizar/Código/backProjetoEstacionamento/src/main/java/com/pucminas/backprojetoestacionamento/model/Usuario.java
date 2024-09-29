package com.pucminas.backprojetoestacionamento.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
@Entity(name = "Usuarios")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Usuario {
    @Id
    @NotEmpty
    private String Matricula;

    @NotEmpty
    private String nome;

    @NotEmpty
    private String senha;


    @NotNull
    boolean ativo = true;
}
