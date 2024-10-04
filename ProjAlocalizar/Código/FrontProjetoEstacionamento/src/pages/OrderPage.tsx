import React, { useState, useEffect } from 'react';
import { Box, List, ListItem, ListItemText, Typography, Button, Pagination } from '@mui/material';
import CarIcon from '@mui/icons-material/DirectionsCar';
import PersonIcon from '@mui/icons-material/Person';
import axios from 'axios';
import { user } from '../shared/services/User';
import { Aluguel } from './MyCarsPage';
import { LockClock } from '@mui/icons-material';

const OrderPage: React.FC = () => {
  const [alugueis, setAlugueis] = useState<Aluguel[]>([]);
  const [page, setPage] = useState(1);
  const rowsPerPage = 2;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get<Aluguel[]>("http://localhost:8080/api/aluguel/proprietario", {
          params: {
            idProprietario: user.id,
          },
        });
        setAlugueis(response.data);
      } catch (error) {
        console.error("Erro ao buscar pedidos:", error);
      }
    };

    fetchOrders();
  }, []);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleAderir = async (id: number) => {
    try {
      await axios.put("http://localhost:8080/api/aluguel/aderir", null, {
        params: { id },
      });
      // Recarregar pedidos após aderir
      const updatedOrders = alugueis.map(order =>
        order.id === id ? { ...order, aderido: "ADERIDO" } : order
      );
      setAlugueis(updatedOrders);
    } catch (error) {
      console.error("Erro ao aderir o pedido:", error);
    }
  };

  const handleRecusar = async (id: number) => {
    try {
      await axios.put("http://localhost:8080/api/aluguel/recusar", null, {
        params: { id },
      });
      // Recarregar pedidos após recusar
      const updatedOrders = alugueis.map(order =>
        order.id === id ? { ...order, aderido: "RECUSADO" } : order
      );
      setAlugueis(updatedOrders);
    } catch (error) {
      console.error("Erro ao recusar o pedido:", error);
    }
  };

  // Cálculo da página atual
  const paginatedAlugueis = alugueis.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  // Mapeamento das cores com base na situação
  const statusColors: { [key: string]: string } = {
    PENDENTE: 'orange',
    ADERIDO: 'green',
    RECUSADO: 'red',
  };

  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Pedidos de Aluguel
      </Typography>
      <List>
        {paginatedAlugueis.length > 0 ? (
          paginatedAlugueis.map((car) => (
            <ListItem
              key={car.id}
              sx={{
                border: '2px solid #1976d2',
                borderRadius: '8px',
                padding: '20px',
                marginBottom: '15px',
                backgroundColor: '#f9f9f9',
                boxShadow: 3,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <CarIcon sx={{ fontSize: 40, marginRight: 2 }} />
              <ListItemText
                primary={`${car.automovel.modelo.toUpperCase()}`}
                secondary={
                  <Box>
                    <Typography>
                      <PersonIcon sx={{ verticalAlign: 'middle', marginRight: 1 }} />
                      Cliente: {car.cliente.nome}
                    </Typography>
                    <Typography>
                      <LockClock sx={{ verticalAlign: 'middle', marginRight: 1 }} />
                      Dias de Aluguel: {car.diasAluguel}
                    </Typography>
                    <Typography sx={{ color: statusColors[car.aderido] || 'black' }}>
                      Situação: {car.aderido}
                    </Typography>
                    <Box sx={{ marginTop: 1 }}>
                      <Button 
                        variant="contained" 
                        color="success" 
                        onClick={() => handleAderir(car.id)} 
                        disabled={car.aderido !== "PENDENTE"}
                      >
                        Aderir
                      </Button>
                      <Button 
                        variant="contained" 
                        color="error" 
                        onClick={() => handleRecusar(car.id)} 
                        sx={{ marginLeft: 1 }} 
                        disabled={car.aderido !== "PENDENTE"}
                      >
                        Rejeitar
                      </Button>
                    </Box>
                  </Box>
                }
              />
            </ListItem>
          ))
        ) : (
          <Typography>Nenhum pedido encontrado.</Typography>
        )}
      </List>
      {/* Paginação */}
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px',position: 'fixed', bottom: 20, right: 20 }}>
        <Pagination
          count={Math.ceil(alugueis.length / rowsPerPage)}
          page={page}
          onChange={handleChange}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default OrderPage;
