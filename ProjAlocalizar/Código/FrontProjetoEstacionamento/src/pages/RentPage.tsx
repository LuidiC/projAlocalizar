import React, { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';

interface Vehicle {
  id: number;
  name: string;
}

const RentPage: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        // modelo back> 
        // const response = await axios.get('http://localhost:8080/api/vehicles');
        // setVehicles(response.data);

        const exampleVehicles: Vehicle[] = [
          { id: 1, name: 'Honda Civic' },
          { id: 2, name: 'Toyota Corolla' },
          { id: 3, name: 'Ford Focus' },
          { id: 4, name: 'Chevrolet Tracker' },
          { id: 5, name: 'Hyundai HB20' },
          { id: 6, name: 'Hyundai HB56' },
          { id: 7, name: 'Hyundai HB09' },
        ];

        setVehicles(exampleVehicles);
      } catch (error) {
        console.error('Erro ao buscar veículos:', error);
      }
    };

    fetchVehicles();
  }, []);

  const handleRequest = (vehicleName: string) => {
    alert(`Solicitação para alugar o ${vehicleName} enviada!`);
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" sx={{ minHeight: '80vh', padding: 3 }}>
      <Box 
        display="flex" 
        flexWrap="wrap" 
        justifyContent="center" 
        gap={3}  
      >
        {vehicles.length > 0 ? (
          vehicles.map(vehicle => (
            <Box
              key={vehicle.id}
              sx={{
                width: '300px',
                padding: '20px',
                border: '2px solid #191970', 
                borderRadius: '12px',
                textAlign: 'center',
              }}
            >
              <Typography variant="h5" gutterBottom>
                {vehicle.name}
              </Typography>
              <Button
                variant="contained" 
                onClick={() => handleRequest(vehicle.name)}
                sx={{ 
                  backgroundColor: '#191970', 
                  color: '#fff', 
                  '&:hover': {
                    backgroundColor: '#fff', 
                    color: '#191970', 
                  },
                }}
              >
                Enviar Solicitação
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
