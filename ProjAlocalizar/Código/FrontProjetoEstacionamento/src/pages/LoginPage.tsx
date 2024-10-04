import { Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { setUser } from "../shared/services/User";
import { keyframes } from '@mui/system';

// Animações
const fadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

const slideIn = keyframes`
    from {
        transform: translateX(-100%);
    }
    to {
        transform: translateX(0);
    }
`;

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
        const cleanValue = value.replace(/\D/g, '');

        if (userType === "cliente") {
            return cleanValue.length <= 11
                ? cleanValue.replace(/(\d{3})(\d)/, '$1.$2')
                    .replace(/(\d{3})(\d)/, '$1.$2')
                    .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
                : cleanValue.substring(0, 11);
        } else {
            return cleanValue.length <= 14
                ? cleanValue.replace(/(\d{2})(\d)/, '$1.$2')
                    .replace(/(\d{3})(\d)/, '$1.$2')
                    .replace(/(\d{3})(\d{1,2})$/, '$1/$2')
                    .replace(/(\d{4})(\d)$/, '$1-$2')
                : cleanValue.substring(0, 14);
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
                    cpf: cpfCnpj.replace(/\D/g, ''),
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
                backgroundImage: 'url("/foto.png")', // Caminho para a imagem
                backgroundSize: '60%', // Ajuste o tamanho da imagem
                backgroundRepeat: 'no-repeat', // Evitar duplicação da imagem
                backgroundPosition: '70%', // Centraliza a imagem
                minHeight: '97vh',
                marginTop: '-84px',
                marginLeft: '-15%',
                borderRadius: '8px',
                padding: '20px',
                animation: `${fadeIn} 1s ease-in`,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}>


                <Typography variant="h2" sx={{
                    color: '#fff',
                    marginBottom: 5,
                    marginTop: '-55%', 
                    marginLeft: '20%',
                    animation: `${slideIn} 1s ease-in`,
                    fontFamily: '"Brittany", "Brittany", "Brittany", Brittany',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    fontSize: '7rem',
                }}>
                    Alocalizar
                </Typography>
            </Box>
            <Box sx={{
                flexDirection: 'column',
                display: 'flex',
                gap: 3,
                width: '50%',
                padding: 5,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '-50px',
                animation: `${fadeIn} 1.5s ease-in`,
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
                            transition: 'background-color 0.3s, color 0.3s',
                            '&:hover': { backgroundColor: userType === "cliente" ? '#191970' : 'rgba(25, 25, 112, 0.04)', color: '#fff' },
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
                            transition: 'background-color 0.3s, color 0.3s',
                            '&:hover': { backgroundColor: userType === "empresa" ? '#191970' : 'rgba(25, 25, 112, 0.04)', color: '#fff' },
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
                        maxLength: userType === "cliente" ? 14 : 18,
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
                        transition: 'background-color 0.3s',
                    }}>
                    Login
                </Button>
                <Button onClick={goToRegister} variant="outlined"
                    sx={{
                        width: '100%',
                        color: '#191970',
                        borderColor: '#191970',
                        '&:hover': { borderColor: '#191970', backgroundColor: 'rgba(25, 25, 112, 0.04)' },
                        transition: 'background-color 0.3s',
                    }}>
                    Cadastro
                </Button>
            </Box>
        </Box>
    );
};
