import { Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const LoginPage = () => {
    const [userType, setUserType] = useState("cliente");
    const navigate = useNavigate();

    const doLogin = () => {
        if (userType === "cliente") {
            navigate("/homeclient");
        } else {
            navigate("/homecompanies");
        }
    };

    const goToRegister = () => {
        navigate("/register");
    };

    return (
        <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
            sx={{ minHeight: '100vh' }}
        >
            <Box
                sx={{
                    width: '60%',
                    backgroundColor: '#191970', 
                    minHeight: '110vh',
                    marginTop: '-100px',
                    marginLeft: '-15%',
                    borderRadius: '8px',
                    padding: '20px'
                }}
            >
                
            </Box>

            <Box
                sx={{
                    flexDirection: 'column',
                    display: 'flex',
                    gap: 3,
                    width: '50%',
                    padding: 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '-50px',
                }}
            >
                <Typography variant="h4" sx={{ marginBottom: 2, color: '#191970' }}>
                    Login
                </Typography>

               
                <Box display="flex" justifyContent="space-between" width="100%">
                    <Button
                        onClick={() => setUserType("cliente")}
                        variant={userType === "cliente" ? "contained" : "outlined"}
                        sx={{ 
                            flex: 1, 
                            marginRight: 1,
                            backgroundColor: userType === "cliente" ? '#191970' : 'transparent',
                            color: userType === "cliente" ? '#fff' : '#191970',
                            borderColor: '#191970',
                            '&:hover': {
                                backgroundColor: userType === "cliente" ? '#191970' : 'rgba(25, 25, 112, 0.04)',
                            },
                        }}
                    >
                        Cliente
                    </Button>
                    <Button
                        onClick={() => setUserType("empresa")}
                        variant={userType === "empresa" ? "contained" : "outlined"}
                        sx={{ 
                            flex: 1, 
                            marginLeft: 1,
                            backgroundColor: userType === "empresa" ? '#191970' : 'transparent',
                            color: userType === "empresa" ? '#fff' : '#191970',
                            borderColor: '#191970',
                            '&:hover': {
                                backgroundColor: userType === "empresa" ? '#191970' : 'rgba(25, 25, 112, 0.04)',
                            },
                        }}
                    >
                        Empresa/Banco
                    </Button>
                </Box>

                <TextField
                    fullWidth
                    label="Nome"
                    variant="outlined"
                    sx={{
                        input: { color: '#191970' },
                        '.MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: '#191970',
                            },
                            '&:hover fieldset': {
                                borderColor: '#191970',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: '#191970',
                            },
                        },
                    }}
                />
                <TextField
                    fullWidth
                    label="Senha"
                    type="password"
                    variant="outlined"
                    sx={{
                        input: { color: '#191970' },
                        '.MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: '#191970',
                            },
                            '&:hover fieldset': {
                                borderColor: '#191970',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: '#191970',
                            },
                        },
                    }}
                />

                <Button
                    onClick={doLogin}
                    variant="outlined"
                    sx={{
                        width: '100%',
                        color: '#191970',
                        borderColor: '#191970',
                        '&:hover': {
                            borderColor: '#191970',
                            backgroundColor: 'rgba(25, 25, 112, 0.04)',
                        },
                    }}
                >
                    Login
                </Button>
                <Button
                    onClick={goToRegister}
                    variant="outlined"
                    sx={{
                        width: '100%',
                        color: '#191970',
                        borderColor: '#191970',
                        '&:hover': {
                            borderColor: '#191970',
                            backgroundColor: 'rgba(25, 25, 112, 0.04)',
                        },
                    }}
                >
                    Cadastro
                </Button>
            </Box>
        </Box>
    );
};
