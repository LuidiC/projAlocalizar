import { Box, Button, Typography, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Card } from "@mui/material"; 
import { DirectionsCar, Lightbulb } from "@mui/icons-material"; 
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 

export const HomeCompanies = () => {
    const navigate = useNavigate(); 
    const [open, setOpen] = useState(false);
    const [vehicleData, setVehicleData] = useState({
        matricula: '',
        ano: '',
        marca: '',
        modelo: '',
        placa: '',
        nomeEmpresaBanco: '',
    });

    const handleNewVehicle = () => {
        setOpen(true);
    };

    const handleManageOrders = () => {
        navigate('/order'); 
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setVehicleData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = () => {
        console.log("Dados do veículo:", vehicleData);
        handleClose();
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            sx={{ minHeight: '100vh', padding: 3, backgroundColor: '#f5f5f5' }}
        >
            <Typography variant="h4" sx={{ marginBottom: 4 }}>
                Bem-vindo à Home Empresas/Bancos
            </Typography>

            <Box display="flex" gap={3}>
                <Card
                    sx={{
                        width: 300,
                        height: 200,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#fff',
                        border: '2px solid #191970', 
                        borderRadius: '12px',
                        transition: 'transform 0.3s, box-shadow 0.3s',
                        '&:hover': {
                            transform: 'scale(1.05)',
                            boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.2)',
                        },
                    }}
                    onClick={handleNewVehicle}
                >
                    <DirectionsCar style={{ color: "#191970", fontSize: '5rem' }} /> 
                    <Typography variant="h6" style={{ color: "#191970" }}>Novo Veículo</Typography> 
                </Card>

                <Card
                    sx={{
                        width: 300,
                        height: 200,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#fff',
                        border: '2px solid #191970', 
                        borderRadius: '12px',
                        transition: 'transform 0.3s, box-shadow 0.3s',
                        '&:hover': {
                            transform: 'scale(1.05)',
                            boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.2)',
                        },
                    }}
                    onClick={handleManageOrders}
                >
                    <Lightbulb style={{ color: "#191970", fontSize: '5rem' }} /> 
                    <Typography variant="h6" style={{ color: "#191970" }}>Gerenciar Pedidos</Typography>
                </Card>
            </Box>

            {/* Pop-up */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Cadastrar Novo Veículo</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="matricula"
                        label="Matrícula"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={vehicleData.matricula}
                        onChange={handleChange}
                        InputProps={{ style: { color: '#191970' } }} 
                    />
                    <TextField
                        margin="dense"
                        name="ano"
                        label="Ano"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={vehicleData.ano}
                        onChange={handleChange}
                        InputProps={{ style: { color: '#191970' } }} 
                    />
                    <TextField
                        margin="dense"
                        name="marca"
                        label="Marca"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={vehicleData.marca}
                        onChange={handleChange}
                        InputProps={{ style: { color: '#191970' } }} 
                    />
                    <TextField
                        margin="dense"
                        name="modelo"
                        label="Modelo"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={vehicleData.modelo}
                        onChange={handleChange}
                        InputProps={{ style: { color: '#191970' } }} 
                    />
                    <TextField
                        margin="dense"
                        name="placa"
                        label="Placa"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={vehicleData.placa}
                        onChange={handleChange}
                        InputProps={{ style: { color: '#191970' } }} 
                    />
                    <TextField
                        margin="dense"
                        name="nomeEmpresaBanco"
                        label="Nome da Empresa/Banco"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={vehicleData.nomeEmpresaBanco}
                        onChange={handleChange}
                        InputProps={{ style: { color: '#191970' } }} 
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} style={{ color: '#191970' }}>
                        Cancelar
                    </Button>
                    <Button onClick={handleSubmit} style={{ color: '#191970' }}>
                        Salvar
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};
