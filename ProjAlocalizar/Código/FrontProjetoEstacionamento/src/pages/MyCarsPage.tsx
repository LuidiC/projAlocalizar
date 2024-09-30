import React, { useState, useEffect } from 'react';
import { Box, List, ListItem, ListItemText, Typography } from '@mui/material';

interface Car {
  id: number;
  name: string;
  status: 'Aprovado' | 'Rejeitado'; 
}

const MyCarsPage: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);

  // Simulação de fetch dos carros do backend
  useEffect(() => {
    const fetchCars = async () => {
      const response: Car[] = [
        { id: 1, name: 'Fusca', status: 'Aprovado' },
        { id: 2, name: 'Civic', status: 'Rejeitado' },
        { id: 3, name: 'Corolla', status: 'Aprovado' },
      ];
      setCars(response);
    };

    fetchCars();
  }, []);

  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Meus Carros
      </Typography>
      <List>
        {cars.map((car) => (
          <ListItem 
            key={car.id} 
            sx={{
              border: '2px solid #191970', 
              borderRadius: '8px', 
              padding: '10px',
              marginBottom: '10px', 
              backgroundColor: '#f9f9f9', 
            }}
          >
            <ListItemText
              primary={car.name}
              secondary={
                <Typography 
                  sx={{
                    color: car.status === 'Aprovado' ? 'green' : 'red', 
                    fontWeight: 'bold'
                  }}
                >
                  Status: {car.status}
                </Typography>
              }
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default MyCarsPage;
