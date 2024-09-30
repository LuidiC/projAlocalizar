package com.pucminas.backprojetoestacionamento.model;

import com.pucminas.backprojetoestacionamento.common.enums.TipoUsuario;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
@Entity(name = "Usuarios")
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String cpfCnpj;

    @NotEmpty
    private String nome;

    @NotEmpty
    private String senha;

    @NotEmpty
    private String endereco;

    @NotEmpty
    private String profissao;

    @NotEmpty
    private TipoUsuario tipoUsuario;

    @NotNull
    boolean ativo = true;
}
