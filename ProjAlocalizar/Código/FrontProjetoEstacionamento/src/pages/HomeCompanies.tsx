import { Box, Button, Typography, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Card } from "@mui/material"; 
import { DirectionsCar, Lightbulb } from "@mui/icons-material"; 
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import axios from "axios"; // Importando axios para fazer requisições
import { user } from "../shared/services/User";

export const HomeCompanies = () => {
    const navigate = useNavigate(); 
    const [open, setOpen] = useState(false);
    const [vehicleData, setVehicleData] = useState({
        placa: '',
        modelo: '',
        marca: '',
        ano: 0, 
        disponivel: true,
        proprietario: user
    });

    const handleNewVehicle = () => {
        setOpen(true);
    };

    const handleManageOrders = () => {
        navigate('/order'); 
    };

    const handleClose = () => {
        setOpen(false);
        setVehicleData({
            placa: '',
            modelo: '',
            marca: '',
            ano: 0,
            disponivel: true,
            proprietario: user, // Resetando também o ID do proprietário
        });
    };

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;

        // Se o campo for ano, convertemos para número
        const updatedValue = name === 'ano' ? Number(value) : value;

        setVehicleData(prevState => ({
            ...prevState,
            [name]: updatedValue,
        }));
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post("http://localhost:8080/api/automovel", vehicleData);
            console.log("Veículo cadastrado com sucesso:", response.data);
            handleClose();
        } catch (error) {
            console.error("Erro ao cadastrar veículo:", error);
            alert("Erro ao cadastrar veículo. Tente novamente.");
        }
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            sx={{ minHeight: 'calc(80vh - 64px)', padding: 3}}
        >
            <Typography variant="h4" color="#191970" sx={{ marginBottom: 4 }}>
                Bem-vindo {user.nome} !
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
                        name="ano"
                        label="Ano"
                        type="number" // Alterando para tipo number
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
            <Box
                component="footer"
                sx={{
                    position: 'fixed',
                    bottom: -1,
                    marginTop: 'auto',
                    padding: '20px',
                    backgroundColor: '#191970',
                    color: '#fff',
                    minWidth: '204vh',
                    textAlign: 'center',
                }}
            >
                <Typography variant="body1">
                    Sistema de Aluguel de Veículos © 2024
                </Typography>
            </Box>
        </Box>
    );
};
