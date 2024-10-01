import { Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { setUser } from "../shared/services/User";

export interface Usuario {
    id?: number;
    cpfCnpj?: string;
    nome: string;
    senha: string;
    endereco: string;
    profissao: string;
    tipoUsuario: string;
    ativo?: boolean;
}

export const LoginPage = () => {
    const [userType, setUserType] = useState("cliente");
    const [cpfCnpj, setCpfCnpj] = useState("");
    const [senha, setSenha] = useState("");
    const navigate = useNavigate();

    const maskCpfCnpj = (value: string) => {
        // Remove caracteres não numéricos
        const cleanValue = value.replace(/\D/g, '');
        
        if (userType === "cliente") {
            // Máscara de CPF
            return cleanValue.length <= 11
                ? cleanValue.replace(/(\d{3})(\d)/, '$1.$2')
                          .replace(/(\d{3})(\d)/, '$1.$2')
                          .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
                : cleanValue.substring(0, 11); // Limita a 11 dígitos
        } else {
            // Máscara de CNPJ
            return cleanValue.length <= 14
                ? cleanValue.replace(/(\d{2})(\d)/, '$1.$2')
                          .replace(/(\d{3})(\d)/, '$1.$2')
                          .replace(/(\d{3})(\d{1,2})$/, '$1/$2')
                          .replace(/(\d{4})(\d)$/, '$1-$2')
                : cleanValue.substring(0, 14); // Limita a 14 dígitos
        }
    };

    const handleChangeCpfCnpj = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setCpfCnpj(maskCpfCnpj(value));
    };

    const doLogin = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/usuario/login", {
                params: {
                    cpf: cpfCnpj.replace(/\D/g, ''), // Remove a máscara ao enviar
                    senha: senha,
                },
            });

            const usuario: Usuario = response.data;
            setUser(usuario);
            if (usuario) {
                navigate(userType === "cliente" ? "/homeclient" : "/homecompanies", { state: { user: usuario } });
            } else {
                alert("Usuário não encontrado");
            }
        } catch (error) {
            console.error("Erro no login:", error);
        }
    };

    const goToRegister = () => {
        navigate("/register");
    };

    return (
        <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"} sx={{ minHeight: '80vh' }}>
            <Box sx={{
                width: '60%',
                backgroundColor: '#191970',
                minHeight: '97vh',
                marginTop: '-100px',
                marginLeft: '-15%',
                borderRadius: '8px',
                padding: '20px'
            }} />
            <Box sx={{
                flexDirection: 'column',
                display: 'flex',
                gap: 3,
                width: '50%',
                padding: 5,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '-50px',
            }}>
                <Typography variant="h4" sx={{ marginBottom: 2, color: '#191970' }}>
                    Login
                </Typography>
                <Box display="flex" justifyContent="space-between" width="100%">
                    <Button onClick={() => setUserType("cliente")} variant={userType === "cliente" ? "contained" : "outlined"}
                        sx={{
                            flex: 1,
                            marginRight: 1,
                            backgroundColor: userType === "cliente" ? '#191970' : 'transparent',
                            color: userType === "cliente" ? '#fff' : '#191970',
                            borderColor: '#191970',
                            '&:hover': { backgroundColor: userType === "cliente" ? '#191970' : 'rgba(25, 25, 112, 0.04)' },
                        }}>
                        Cliente
                    </Button>
                    <Button onClick={() => setUserType("empresa")} variant={userType === "empresa" ? "contained" : "outlined"}
                        sx={{
                            flex: 1,
                            marginLeft: 1,
                            backgroundColor: userType === "empresa" ? '#191970' : 'transparent',
                            color: userType === "empresa" ? '#fff' : '#191970',
                            borderColor: '#191970',
                            '&:hover': { backgroundColor: userType === "empresa" ? '#191970' : 'rgba(25, 25, 112, 0.04)' },
                        }}>
                        Empresa/Banco
                    </Button>
                </Box>
                <TextField
                    fullWidth
                    label="CPF/CNPJ"
                    variant="outlined"
                    value={cpfCnpj}
                    onChange={handleChangeCpfCnpj}
                    inputProps={{
                        maxLength: userType === "cliente" ? 14 : 18, // Limite de caracteres
                    }}
                    sx={{
                        input: { color: '#191970' },
                        '.MuiOutlinedInput-root': {
                            '& fieldset': { borderColor: '#191970' },
                            '&:hover fieldset': { borderColor: '#191970' },
                            '&.Mui-focused fieldset': { borderColor: '#191970' },
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
                            '& fieldset': { borderColor: '#191970' },
                            '&:hover fieldset': { borderColor: '#191970' },
                            '&.Mui-focused fieldset': { borderColor: '#191970' },
                        },
                    }}
                />
                <Button onClick={doLogin} variant="outlined"
                    sx={{
                        width: '100%',
                        color: '#191970',
                        borderColor: '#191970',
                        '&:hover': { borderColor: '#191970', backgroundColor: 'rgba(25, 25, 112, 0.04)' },
                    }}>
                    Login
                </Button>
                <Button onClick={goToRegister} variant="outlined"
                    sx={{
                        width: '100%',
                        color: '#191970',
                        borderColor: '#191970',
                        '&:hover': { borderColor: '#191970', backgroundColor: 'rgba(25, 25, 112, 0.04)' },
                    }}>
                    Cadastro
                </Button>
            </Box>
        </Box>
    );
};
