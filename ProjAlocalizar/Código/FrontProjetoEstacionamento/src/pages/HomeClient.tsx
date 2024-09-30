import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { Card } from 'primereact/card';
import { Summarize, DirectionsCar } from "@mui/icons-material"; 
import { useState } from 'react';
import { useNavigate } from "react-router-dom"; 

export const HomePage = ({ usuario }: { usuario?: any }) => {
    const [hoveredCard, setHoveredCard] = useState<string | null>(null);
    const navigate = useNavigate(); 

    const headerMeusAlugueis = (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <Summarize style={{ color: "#191970", fontSize: '5rem' }} /> 
            <Typography style={{ marginLeft: '5px', fontSize: '20px', color: "#191970" }}>Aluguéis de {usuario.nome}</Typography> 
        </div>
    );

    const headerAlugarCarros = (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <DirectionsCar style={{ color: "#191970", fontSize: '5rem' }} /> 
            <Typography style={{ marginLeft: '5px', fontSize: '20px', color: "#191970" }}>Alugar Carros</Typography> 
        </div>
    );

    const handleNavigateToMyCars = () => {
        navigate('/mycars', { state: { usuario } }); // Passa o usuario para a tela de Meus Aluguéis
    };

    const handleNavigateToRent = () => {
        navigate('/rent', { state: { usuario } }); // Passa o usuario para a tela de Alugar Carros
    };

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{ padding: 0, minHeight: 'calc(80vh - 64px)', flexDirection: 'row', gap: 10, margin: 0 }} 
        >
            <Card
                header={headerMeusAlugueis}
                style={{
                    width: '300px',
                    backgroundColor: "#fff",
                    border: '2px solid #191970', 
                    borderRadius: '12px',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    transform: hoveredCard === 'meusAlugueis' ? 'scale(1.05)' : 'scale(1)',
                    boxShadow: hoveredCard === 'meusAlugueis' ? '0px 8px 20px rgba(0, 0, 0, 0.2)' : 'none',
                }}
                onMouseEnter={() => setHoveredCard('meusAlugueis')}
                onMouseLeave={() => setHoveredCard(null)}
            >
                <List>
                    <ListItem disablePadding>
                        <ListItemButton onClick={handleNavigateToMyCars}>
                            <ListItemIcon>
                                <Summarize style={{ color: "#191970" }} /> 
                            </ListItemIcon>
                            <ListItemText primary={"Meus Aluguéis"} primaryTypographyProps={{ style: { color: "#191970" } }} /> 
                        </ListItemButton>
                    </ListItem>
                </List>
            </Card>

            <Card
                header={headerAlugarCarros}
                style={{
                    width: '300px',
                    backgroundColor: "#fff",
                    border: '2px solid #191970', 
                    borderRadius: '12px',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    transform: hoveredCard === 'alugarCarros' ? 'scale(1.05)' : 'scale(1)',
                    boxShadow: hoveredCard === 'alugarCarros' ? '0px 8px 20px rgba(0, 0, 0, 0.2)' : 'none',
                }}
                onMouseEnter={() => setHoveredCard('alugarCarros')}
                onMouseLeave={() => setHoveredCard(null)}
            >
                <List>
                    <ListItem disablePadding>
                        <ListItemButton onClick={handleNavigateToRent}>
                            <ListItemIcon>
                                <DirectionsCar style={{ color: "#191970" }} />
                            </ListItemIcon>
                            <ListItemText primary={"Alugar Carros"} primaryTypographyProps={{ style: { color: "#191970" } }} /> 
                        </ListItemButton>
                    </ListItem>
                </List>
            </Card>
        </Box>
    );
};
