package com.pucminas.backprojetoestacionamento.core.automovel;

import com.pucminas.backprojetoestacionamento.dataprovider.automovel.IAutomovelRepository;
import com.pucminas.backprojetoestacionamento.model.Automovel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AutomovelService {
    @Autowired
    IAutomovelRepository automovelRepository;

    public Automovel salvar(Automovel automovel) {
        return automovelRepository.save(automovel);
    }

    public Automovel buscar(String placa) {
        return automovelRepository.findById(placa).orElse(null);
    }

    public List<Automovel> listarTodos() {
        return automovelRepository.findAll();
    }

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
