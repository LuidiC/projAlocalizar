import { Alert, Box, Button, MenuItem, Select, Snackbar, SnackbarCloseReason, TextField, Typography, IconButton } from "@mui/material";
import { ArrowBack } from "@mui/icons-material"; // Ícone de seta
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { SelectChangeEvent } from "@mui/material";
import { keyframes } from '@mui/system';


const slideIn = keyframes`
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
`;

export const RegisterPage = () => {
    const [open, setOpen] = useState(false);
    const [userType, setUserType] = useState("cliente");
    const [formData, setFormData] = useState({
        nome: "",
        cpfCnpj: "",
        senha: "",
        endereco: "",
        profissao: "",
        tipoUsuario: "CLIENTE"
    });

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

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        if (name === "cpfCnpj") {
            const maskedValue = maskCpfCnpj(value);
            setFormData({
                ...formData,
                [name]: maskedValue
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
        if (reason === 'clickaway') return;
        setOpen(false);
    };

    const handleUserTypeChange = (event: SelectChangeEvent<string>) => {
        const userType = event.target.value;
        setUserType(userType);
        setFormData({
            ...formData,
            tipoUsuario: userType.toUpperCase(),
            cpfCnpj: ""
        });
    };
/** Code review -> Sugestão:Divida o endpoint em parte fixa e os endereços separados ex: const endpoint="http://localhost:8080/"
    * e consforme for necessario buscar diferentes endeçamento como: api/automovel/listar, somente a segunda parte será alterada.
    * Isso aumenta a flexibilidade e facilita a manutenção do codigo.
    */
    const handleSubmit = async () => {
        try {
            const cleanCpfCnpj = formData.cpfCnpj.replace(/\D/g, '');
            const dataToSubmit = {
                ...formData,
                cpfCnpj: cleanCpfCnpj
            };
            const response = await axios.post("http://localhost:8080/api/usuario/novoUsuario", dataToSubmit);
            if (response.status === 200) {
                setOpen(true);
            }
        } catch (error) {
            console.error("Erro ao cadastrar usuário:", error);
        }
    };

    return (
        <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
            <Box
                sx={{
                    width: '60%',
                    backgroundColor: '#191970',
                    minHeight: '102vh',
                    marginTop: '-100px',
                    marginLeft: '-15%',
                    borderRadius: '8px',
                    position: 'relative',
                    animation: `${slideIn} 0.5s ease-in-out`, // Aplica as animações de fade-in e slide-in
                }}
            >
                <IconButton
                    onClick={() => navigate("/login")}
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        backgroundColor: 'transparent',
                        transition: 'transform 0.3s ease-in-out',
                        '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            transform: 'translate(-50%, -50%) scale(1.2)', // Efeito de hover
                        }
                    }}
                >
                    <ArrowBack sx={{ color: '#fff', fontSize: 60 }} />
                </IconButton>
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
                    animation: `${slideIn} 0.5s ease-in-out`, // Animação de fade-in e slide-in
                }}
            >
                <Typography variant="h4" sx={{ marginBottom: 2 }}>
                    Faça Seu Cadastro
                </Typography>

                <Select
                    value={userType}
                    onChange={handleUserTypeChange}
                    sx={{ marginBottom: 4, width: '100%' }}
                >
                    <MenuItem value="cliente">Cliente</MenuItem>
                    <MenuItem value="empresa">Empresa/Banco</MenuItem>
                </Select>

                {userType === "cliente" && (
                    <Box display="flex" flexDirection="column" gap={1} width="400px" sx={{ paddingTop: 0 }}>
                        <TextField name="nome" label="Nome" variant="outlined" fullWidth onChange={handleInputChange} />
                        <TextField name="endereco" label="Endereço" variant="outlined" fullWidth onChange={handleInputChange} />
                        <TextField name="profissao" label="Profissão" variant="outlined" fullWidth onChange={handleInputChange} />
                        <TextField
                            name="cpfCnpj"
                            label="CPF"
                            variant="outlined"
                            fullWidth
                            onChange={handleInputChange}
                            inputProps={{ maxLength: 14 }}
                        />
                        <TextField name="senha" label="Senha" variant="outlined" fullWidth type="password" onChange={handleInputChange} />

                        <Button
                            onClick={handleSubmit}
                            variant="contained"
                            sx={{
                                marginTop: 2,
                                backgroundColor: '#191970',
                                color: '#fff',
                                '&:hover': {
                                    backgroundColor: '#1e1e78',
                                }// Animação de fade-in no botão
                            }}
                        >
                            Cadastrar Cliente
                        </Button>
                    </Box>
                )}

                {userType === "empresa" && (
                    <Box display="flex" flexDirection="column" gap={2} width="400px">
                        <TextField name="nome" label="Nome" variant="outlined" fullWidth onChange={handleInputChange} />
                        <TextField name="senha" label="Senha" variant="outlined" fullWidth type="password" onChange={handleInputChange} />
                        <TextField
                            name="cpfCnpj"
                            label="CNPJ"
                            variant="outlined"
                            fullWidth
                            onChange={handleInputChange}
                            inputProps={{ maxLength: 18 }}
                        />

                        <Button
                            onClick={handleSubmit}
                            variant="contained"
                            sx={{
                                marginTop: 2,
                                backgroundColor: '#191970',
                                color: '#fff',
                                '&:hover': {
                                    backgroundColor: '#1e1e78',
                                }
                            }}
                        >
                            Cadastrar Empresa/Banco
                        </Button>
                    </Box>
                )}
            </Box>
            <div>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert
                        onClose={handleClose}
                        severity="success"
                        variant="filled"
                        sx={{ width: '100%' }}
                    >
                        Cadastrado com sucesso!
                    </Alert>
                </Snackbar>
            </div>
        </Box>
    );
};
