import React, { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import {  CarRental, DateRange, Star } from '@mui/icons-material'; // Importando ícones
import axios from 'axios';
import { carros, setCarros } from '../shared/services/Carros';
import { Car, Aluguel } from './MyCarsPage';
import { user } from '../shared/services/User';

const RentPage: React.FC = () => {
  const [vehicles, setVehicles] = useState<Car[]>([]);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await axios.get<Car[]>("http://localhost:8080/api/automovel/listar");
        setCarros(response.data);
      } catch (error) {
        console.error('Erro ao buscar veículos:', error);
      }
    };

    fetchVehicles();
  }, []);

  const handleRequest = async (vehicle: Car) => {
    const aluguel: Aluguel = {
      id: 0,
      automovel: vehicle,
      cliente: user,
      proprietario: vehicle.proprietario,
      dataAluguel: new Date(),
      diasAluguel: 30,
      aderido: 'PENDENTE',
    };

    try {
      const response = await axios.post("http://localhost:8080/api/aluguel", aluguel);
      alert(`Solicitação para alugar o ${vehicle.modelo} enviada!`);
      console.log('Aluguel criado:', response.data);
    } catch (error) {
      console.error('Erro ao criar aluguel:', error);
      alert('Erro ao enviar solicitação. Tente novamente.');
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" sx={{ minHeight: '80vh', padding: 3, backgroundColor: '#f5f5f5' }}>
      <Box 
        display="flex" 
        flexWrap="wrap" 
        justifyContent="center" 
        gap={3}
      >
        {carros.length > 0 ? (
          carros.map(vehicle => (
            <Box
              key={vehicle.placa}
              sx={{
                width: '300px',
                padding: '20px',
                border: '2px solid #191970', 
                borderRadius: '12px',
                textAlign: 'center',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                backgroundColor: '#fff',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
                },
              }}
            >
              <CarRental sx={{ fontSize: 50, color: '#191970' }} />
              <Typography variant="h5" gutterBottom>
                {vehicle.modelo}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                {vehicle.marca} - {vehicle.ano}
              </Typography>
              <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 1 }}>
                <Star sx={{ marginRight: 0.5 }} />
                4.5
              </Typography>
              <Button
                variant="contained" 
                onClick={() => handleRequest(vehicle)}
                sx={{ 
                  backgroundColor: '#191970', 
                  color: '#fff', 
                  '&:hover': {
                    backgroundColor: '#fff', 
                    color: '#191970', 
                  },
                  marginTop: 2,
                }}
              >
                Enviar Solicitação
                <DateRange sx={{ marginLeft: 1 }} />
              </Button>
            </Box>
          ))
        ) : (
          <Typography variant="h6">Carros não disponíveis</Typography>
        )}
      </Box>
    </Box>
  );
};

export default RentPage;
