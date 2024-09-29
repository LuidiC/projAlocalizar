import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { Card } from 'primereact/card';
import { CarCrashSharp, CarRepair, Summarize } from "@mui/icons-material";
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import { useState } from 'react';

export const HomePage = () => {
    const [hoveredCard, setHoveredCard] = useState<string | null>(null);

    const headerVeiculo = (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <CarRepair style={{ color: "#1976d2", fontSize: '5rem' }} />
            <Typography style={{ marginLeft: '5px', fontSize: '20px' }}>Gerenciar Veículos</Typography>
        </div>
    );

    const headerClientes = (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <AccessibilityNewIcon style={{ color: "#1976d2", fontSize: '5rem' }} />
            <Typography style={{ marginLeft: '5px', fontSize: '20px' }}>Gerenciar Clientes</Typography>
        </div>
    );

    const headerAlugueis = (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <Summarize style={{ color: "#1976d2", fontSize: '5rem' }} />
            <Typography style={{ marginLeft: '5px', fontSize: '20px' }}>Gerenciar Aluguéis</Typography>
        </div>
    );

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{ padding: 0, minHeight: 'calc(80vh - 64px)', flexDirection: 'row', gap: 10, margin: 0 }} 
        >
            <Card
                header={headerVeiculo}
                style={{
                    width: '300px',
                    backgroundColor: "#fff",
                    border: '2px solid #90CAF9',
                    borderRadius: '12px',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    transform: hoveredCard === 'veiculo' ? 'scale(1.05)' : 'scale(1)',
                    boxShadow: hoveredCard === 'veiculo' ? '0px 8px 20px rgba(0, 0, 0, 0.2)' : 'none',
                }}
                onMouseEnter={() => setHoveredCard('veiculo')}
                onMouseLeave={() => setHoveredCard(null)}
            >
                <List>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <CarCrashSharp />
                            </ListItemIcon>
                            <ListItemText primary={"Visualizar Veículos"} />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Card>

            <Card
                header={headerClientes}
                style={{
                    width: '300px',
                    backgroundColor: "#fff",
                    border: '2px solid #90CAF9',
                    borderRadius: '12px',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    transform: hoveredCard === 'clientes' ? 'scale(1.05)' : 'scale(1)',
                    boxShadow: hoveredCard === 'clientes' ? '0px 8px 20px rgba(0, 0, 0, 0.2)' : 'none',
                }}
                onMouseEnter={() => setHoveredCard('clientes')}
                onMouseLeave={() => setHoveredCard(null)}
            >
                <List>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <CarCrashSharp />
                            </ListItemIcon>
                            <ListItemText primary={"Visualizar Clientes"} />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Card>

            <Card
                header={headerAlugueis}
                style={{
                    width: '300px',
                    backgroundColor: "#fff",
                    border: '2px solid #90CAF9',
                    borderRadius: '12px',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    transform: hoveredCard === 'alugueis' ? 'scale(1.05)' : 'scale(1)',
                    boxShadow: hoveredCard === 'alugueis' ? '0px 8px 20px rgba(0, 0, 0, 0.2)' : 'none',
                }}
                onMouseEnter={() => setHoveredCard('alugueis')}
                onMouseLeave={() => setHoveredCard(null)}
            >
                <List>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <CarCrashSharp />
                            </ListItemIcon>
                            <ListItemText primary={"Visualizar Aluguéis"} />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Card>
        </Box>
    );
}
