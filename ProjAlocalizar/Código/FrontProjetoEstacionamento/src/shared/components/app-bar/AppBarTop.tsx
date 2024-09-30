// import { AccountCircle, Menu } from "@material-ui/icons";
// import { AppBar, Divider, Box, IconButton, List, ListItem, Toolbar, Typography } from "@mui/material";
// import { useState } from "react";
// // import MenuItemArray from "../menu-lateral/config/MenuItemConfig";
// // import MenuItemComponent from "../menu-lateral/MenuItemComponent";
// import { Sidebar } from "primereact/sidebar";
// import { useNavigate, useLocation } from "react-router-dom";
// import React from "react";

// export const AppBarTop: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
//     const [open, setOpen] = useState(false);
//     const location = useLocation(); 
//     const history = useNavigate();

//     const toggleDrawer = () => {
//         setOpen(!open);
//     };

//     const closeDrawer = () => {
//         setOpen(false);
//     };

//     const returnHome = () => {
//         history('/home');
//     };

//     const customHeader = (
//         <div style={{ padding: '1rem', display: 'flex', alignItems: 'center' }}>
//             <AccountCircle style={{ color: "#1976d2", fontSize: '2rem' }} />
//             <Typography style={{ marginLeft: '5px', fontSize: '20px' }}>Seja Bem-vindo (a)!</Typography>
//         </div>
//     );

//     return (
//         <Box flex={1} sx={{ padding: 0, margin: 0 }}>
//             {location.pathname !== '/login' && location.pathname !== '/register' && (
//                 <AppBar position="fixed" color="primary">
//                     <Toolbar>
//                         <IconButton
//                             onClick={toggleDrawer}
//                             size="large"
//                             edge="start"
//                             color="inherit"
//                             aria-label="menu"
//                             sx={{ mr: 2 }}
//                         >
//                             <Menu />
//                         </IconButton>
//                         <Typography 
//                             sx={{ cursor: "pointer", flexGrow: 1 }} 
//                             onClick={returnHome} 
//                             marginLeft={1} 
//                             variant="h6" 
//                             component="div"
//                         >
//                             Sistema Estacionamento
//                         </Typography>
//                     </Toolbar>
//                 </AppBar>
//             )}
//             {/* <Sidebar visible={open} onHide={closeDrawer} style={{ backgroundColor: '#fff', padding: 0 }} header={customHeader}>
//                 <Divider sx={{marginBottom: '20px'}}/>
//                 <List>
//                     {MenuItemArray.map((item) => (
//                         <ListItem key={item.text} onClick={closeDrawer}>
//                             <MenuItemComponent
//                                 icone={item.icone}
//                                 text={item.text}
//                                 link={item.link}
//                             />
//                         </ListItem>
//                     ))}
//                 </List>
//             </Sidebar> */}
//             <Box
//                 sx={{
//                     flexGrow: 1,
//                     padding: 1,
//                     marginTop: (theme) => theme.spacing(8),
//                 }}
//             >
//                 {children}
//             </Box>
//         </Box>
//     );
// };

import { ArrowBack } from "@material-ui/icons"; // Importando a seta de voltar
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import React from "react";

export const AppBarTop: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    const location = useLocation(); 
    const navigate = useNavigate();

    const returnHome = () => {
        navigate(-1); // Volta para a página anterior
    };

    return (
        <Box flex={1} sx={{ padding: 0, margin: 0 }}>
            {location.pathname !== '/login' && location.pathname !== '/register' && (
                <AppBar position="fixed" sx={{ backgroundColor: '#191970' }}>
                    <Toolbar>
                        <IconButton
                            onClick={returnHome}
                            size="large"
                            edge="start"
                            sx={{ color: '#fff' }} // Cor do ícone
                        >
                            <ArrowBack />
                        </IconButton>
                        <Typography 
                            sx={{ flexGrow: 1, color: '#fff' }} 
                            marginLeft={1} 
                            variant="h6" 
                            component="div"
                        >
                            Sistema Estacionamento
                        </Typography>
                    </Toolbar>
                </AppBar>
            )}
            <Box
                sx={{
                    flexGrow: 1,
                    padding: 1,
                    marginTop: (theme) => theme.spacing(8),
                }}
            >
                {children}
            </Box>
        </Box>
    );
};
