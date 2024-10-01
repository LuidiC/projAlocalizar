import React, { useState, useEffect } from 'react';
import { Box, List, ListItem, ListItemText, Typography } from '@mui/material';
import CarIcon from '@mui/icons-material/DirectionsCar';
import PersonIcon from '@mui/icons-material/Person';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import axios from 'axios';
import { user } from '../shared/services/User';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { Usuario } from './LoginPage';
import { LockClock, Verified } from '@mui/icons-material';

export interface Car {
  placa: string;
  modelo: string;
  marca: string;
  ano: number;
  disponivel: boolean;
  proprietario: Usuario;
}

export interface Aluguel {
  id: number;
  automovel: Car;
  cliente: Usuario;
  proprietario: Usuario;
  dataAluguel: Date;
  diasAluguel: number;
  aderido: string;
}

const MyCarsPage: React.FC = () => {
  const [alugueis, setAlugueis] = useState<Aluguel[]>([]);
  const [page, setPage] = useState(1);
  const rowsPerPage = 2;

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get<Aluguel[]>("http://localhost:8080/api/aluguel/cliente", {
          params: {
            idCliente: user.id,
          },
        });
        setAlugueis(response.data);
      } catch (error) {
        console.error("Erro ao buscar carros:", error);
      }
    };

    fetchCars();
  }, []);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
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
        Meus Aluguéis
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
                      <PersonIcon sx={{ verticalAlign: 'middle', marginRight: 1, marginBottom: 1, marginTop: 1 }} />
                      Proprietário: {car.proprietario.nome}
                    </Typography>
                    <Typography>
                      <CalendarTodayIcon sx={{ verticalAlign: 'middle', marginRight: 1, marginBottom: 1 }} />
                      Data do Aluguel: {new Date(car.dataAluguel).toLocaleDateString()}
                    </Typography>
                    <Typography>
                      <LockClock sx={{ verticalAlign: 'middle', marginRight: 1, marginBottom: 1 }} />
                      Dias de Aluguel: {car.diasAluguel}
                    </Typography>
                    <Typography
                      sx={{ color: statusColors[car.aderido] || 'black' }} // Aplique a cor da situação
                    >
                      <Verified sx={{ verticalAlign: 'middle', marginRight: 1, marginBottom: 1 }} />
                      Situação: {car.aderido}
                    </Typography>
                  </Box>
                }
              />
            </ListItem>
          ))
        ) : (
          <Typography>Nenhum aluguel encontrado.</Typography>
        )}
      </List>
      {/* Paginação */}
      <Stack spacing={2} sx={{ position: 'fixed', bottom: 20, right: 20 }}>
        <Pagination
          count={Math.ceil(alugueis.length / rowsPerPage)}
          page={page}
          onChange={handleChange}
          color="primary"
        />
      </Stack>
    </Box>
  );
};

export default MyCarsPage;
