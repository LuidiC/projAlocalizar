    package com.pucminas.backprojetoestacionamento.core.usuario;

    import com.pucminas.backprojetoestacionamento.dataprovider.usuario.IUsuarioRepository;
    import com.pucminas.backprojetoestacionamento.model.Usuario;
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.stereotype.Service;

    @Service
    public class UsuarioService {

        @Autowired
        IUsuarioRepository usuarioRepository;


        public Usuario salvarUsuario(Usuario usuario) {
            return usuarioRepository.save(usuario);
        }

        public Usuario deletarUsuario(String cpf) {
            if(usuarioRepository.findUsuarioByCpfCnpj(cpf) != null) {
                Usuario usuario = usuarioRepository.findUsuarioByCpfCnpj(cpf);
                usuario.setAtivo(false);
                usuarioRepository.save(usuario);

                return usuario;
            }
            return null;
        }

//        public Usuario editarUsuario(RequestEditarUsuarioDTO params) {
//            if(usuarioRepository.findById(params.getMatricula()).isPresent()) {
//                Usuario usuario = usuarioRepository.findById(params.getMatricula()).get();
//
//                if(params.getNome()!=null)
//                    usuario.setNome(params.getNome());
//                if(params.getSenha()!=null)
//                    usuario.setSenha(params.getSenha());
//
//
//                usuarioRepository.save(usuario);
//
//                return usuario;
//            }
//            return null;
//        }

        public Usuario login(String cpf, String Senha) {
            if(usuarioRepository.findUsuarioByCpfCnpj(cpf) != null) {
                if(usuarioRepository.findUsuarioByCpfCnpj(cpf).getSenha().equals(Senha)) {
                    return usuarioRepository.findUsuarioByCpfCnpj(cpf);
                }
            }
            return null;
        }
    }
