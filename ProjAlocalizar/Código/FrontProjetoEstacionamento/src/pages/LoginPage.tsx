import { Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios"; // Importando axios para fazer requisições HTTP

export const LoginPage = () => {
    const [userType, setUserType] = useState("cliente");
    const [cpfCnpj, setCpfCnpj] = useState("");
    const [senha, setSenha] = useState("");
    const navigate = useNavigate();

    // Função para enviar os dados de login
    const doLogin = async () => {
        try {
            // Faz a requisição para o endpoint de login
            const response = await axios.get("http://localhost:8080/api/usuario/login", {
                params: {
                    cpf: cpfCnpj,
                    senha: senha,
                },
            });

            const usuario = response.data;

            if (userType === "cliente") {
                navigate("/homeclient", { state: { usuario } });
            } else {
                navigate("/homecompanies", { state: { usuario } });
            }
        } catch (error) {
            console.error("Erro no login:", error);
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
                    label="CPF/CNPJ"
                    variant="outlined"
                    value={cpfCnpj}
                    onChange={(e) => setCpfCnpj(e.target.value)}
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
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
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
