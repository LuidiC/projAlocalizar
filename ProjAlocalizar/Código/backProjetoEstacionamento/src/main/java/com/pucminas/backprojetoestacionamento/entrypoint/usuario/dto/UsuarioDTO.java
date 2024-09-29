package com.pucminas.backprojetoestacionamento.entrypoint.usuario.dto;

import com.pucminas.backendprojmatricula.common.enums.TipoUsuario;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode
public class UsuarioDTO {
    private String matricula;
    private String nome;
    private boolean ativo;
    private TipoUsuario tipoUsuario;
}
