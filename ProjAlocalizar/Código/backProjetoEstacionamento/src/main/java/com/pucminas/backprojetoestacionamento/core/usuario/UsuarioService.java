package com.pucminas.backprojetoestacionamento.core.usuario;

import com.pucminas.backprojetoestacionamento.dataprovider.usuario.IUsuarioRepository;
import com.pucminas.backprojetoestacionamento.model.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/*Code review -> Sugestão: Considere criar uma interface por exemplo "IUsuarioService",
 * para que sua classe "SalvarNovoUsuarioUseCase" não fique acoplada e mantem o codigo limpo.
*/
@Service
public class UsuarioService {

    @Autowired
    IUsuarioRepository usuarioRepository;

    /*
     * Code review -> Sugestão: Crie classes para tratamento de excessões ao inves
     * de retornar null.
     * Esse tratamento reduz os erros como NullPointerExceptions.
     */
    public Usuario buscarId(Long id) {
        return usuarioRepository.findById(id).orElse(null);
    }

    public Usuario salvarUsuario(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    /*
     * Code review -> Sugestão: Crie classes para tratamento de excessões ao inves
     * de retornar null. Verifique se o usuario é null e caso seja lança uma exceção.
     * Esse tratamento reduz os erros que podem ocorrer caso o null não seja trado corretamente.
     */
    public Usuario deletarUsuario(String cpf) {
        if (usuarioRepository.findUsuarioByCpfCnpj(cpf) != null) {
            Usuario usuario = usuarioRepository.findUsuarioByCpfCnpj(cpf);
            usuario.setAtivo(false);
            usuarioRepository.save(usuario);

            return usuario;
        }
        return null;
    }

    /*
     * Code review -> Sugestão: Remova metodos inutilizados ou codigo sem uso.
     * Isso trara um código mais limpo. 
     */

    // public Usuario editarUsuario(RequestEditarUsuarioDTO params) {
    // if(usuarioRepository.findById(params.getMatricula()).isPresent()) {
    // Usuario usuario = usuarioRepository.findById(params.getMatricula()).get();
    //
    // if(params.getNome()!=null)
    // usuario.setNome(params.getNome());
    // if(params.getSenha()!=null)
    // usuario.setSenha(params.getSenha());
    //
    //
    // usuarioRepository.save(usuario);
    //
    // return usuario;
    // }
    // return null;
    // }

    /*
     * Code review -> Sugestão: Crie classes para tratamento de excessões ao inves
     * de retornar null. Verifique se o usuario é null e caso seja lança uma exceção.
     * Esse tratamento reduz os erros que podem ocorrer caso o null não seja trado corretamente.
     */
    public Usuario login(String cpf, String Senha) {
        if (usuarioRepository.findUsuarioByCpfCnpj(cpf) != null) {
            if (usuarioRepository.findUsuarioByCpfCnpj(cpf).getSenha().equals(Senha)) {
                return usuarioRepository.findUsuarioByCpfCnpj(cpf);
            }
        }
        return null;
    }
}
