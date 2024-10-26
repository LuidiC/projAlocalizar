package com.pucminas.backprojetoestacionamento.core.automovel;

import com.pucminas.backprojetoestacionamento.dataprovider.automovel.IAutomovelRepository;
import com.pucminas.backprojetoestacionamento.model.Automovel;
import com.pucminas.backprojetoestacionamento.model.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/*Code review -> Sugestão: Considere criar uma interface por exemplo "IAutomovelService",
 * para que sua classe "SalvarNovoUsuarioUseCase" não fique acoplada e mantem o codigo limpo.
*/
@Service
public class AutomovelService {
    @Autowired
    IAutomovelRepository automovelRepository;

    public Automovel salvar(Automovel automovel) {
        return automovelRepository.save(automovel);
    }

    public List<Automovel> listarPorProprietario(Usuario usuario) {
        return automovelRepository.findAutomovelByProprietario(usuario);
    }

    /*
     * Code review -> Sugestão: Crie classes para tratamento de excessões ao inves
     * de retornar null.
     * Esse tratamento reduz os erros como NullPointerExceptions.
     */
    public Automovel buscar(String placa) {
        return automovelRepository.findById(placa).orElse(null);
    }

    public List<Automovel> listarTodos() {
        return automovelRepository.findAll();
    }

    /*
     * Code review -> Sugestão: Crie classes para tratamento de excessões ao inves
     * de retornar null. Verifique se o usuario é null e caso seja lança uma exceção.
     * Esse tratamento reduz os erros que podem ocorrer caso o null não seja trado corretamente.
     */
    public Automovel atualizar(String placa, Automovel automovelAtualizado) {
        Automovel automovelExistente = buscar(placa);
        if (automovelExistente != null) {
            automovelExistente.setModelo(automovelAtualizado.getModelo());
            automovelExistente.setMarca(automovelAtualizado.getMarca());
            automovelExistente.setAno(automovelAtualizado.getAno());
            automovelExistente.setDisponivel(automovelAtualizado.getDisponivel());
            automovelExistente.setProprietario(automovelAtualizado.getProprietario());
            return automovelRepository.save(automovelExistente);
        }
        return null;
    }

    public boolean excluir(String placa) {
        if (buscar(placa) != null) {
            automovelRepository.deleteById(placa);
            return true;
        }
        return false;
    }
}
