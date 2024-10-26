package com.pucminas.backprojetoestacionamento.core.aluguel;

import com.pucminas.backprojetoestacionamento.common.enums.EstadoAluguel;
import com.pucminas.backprojetoestacionamento.dataprovider.aluguel.IAluguelRepository;
import com.pucminas.backprojetoestacionamento.model.Aluguel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/*Code review -> Sugestão: Considere criar uma interface por exemplo "IAluguelService",
 * para que sua classe "SalvarNovoUsuarioUseCase" não fique acoplada e mantem o codigo limpo.
*/

@Service
public class AluguelService {

    @Autowired
    IAluguelRepository aluguelRepository;

    public Aluguel salvar(Aluguel aluguel) {
        return aluguelRepository.save(aluguel);
    }

    public Aluguel aderirAluguel(Long id) {
        Aluguel aluguel = aluguelRepository.findById(id).get();
        aluguel.setAderido(EstadoAluguel.ADERIDO);
        return aluguelRepository.save(aluguel);
    }

    public Aluguel recusarAluguel(Long id) {
        Aluguel aluguel = aluguelRepository.findById(id).get();
        aluguel.setAderido(EstadoAluguel.RECUSADO);
        return aluguelRepository.save(aluguel);
    }

    public List<Aluguel> buscarAluguelPorCliente(Long idCliente) {
        return aluguelRepository.findAluguelByClienteId(idCliente);
    }

    public List<Aluguel> buscarAluguelPorProprietario(Long idProprietario) {
        return aluguelRepository.findAluguelByProprietarioId(idProprietario);
    }
}
