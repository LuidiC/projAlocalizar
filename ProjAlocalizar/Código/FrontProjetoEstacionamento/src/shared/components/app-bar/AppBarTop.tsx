import { ArrowBack } from "@material-ui/icons";
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import React from "react";

export const AppBarTop: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    const location = useLocation(); 
    const navigate = useNavigate();

    const returnHome = () => {
        navigate(-1);
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
                            sx={{ color: '#fff' }}
                        >
                            <ArrowBack />
                        </IconButton>
                        <Typography 
                            sx={{ flexGrow: 1, color: '#fff' }} 
                            marginLeft={1} 
                            variant="h6" 
                            component="div"
                        >
                            Sistema Localizar
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
