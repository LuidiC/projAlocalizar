import { Box, Button, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios"; // Importa axios
import { SelectChangeEvent } from "@mui/material"; // Importa o tipo correto

export const RegisterPage = () => {
    const [userType, setUserType] = useState("cliente");
    const [formData, setFormData] = useState({
        nome: "",
        cpfCnpj: "",
        senha: "",
        endereco: "",
        profissao: "",
        tipoUsuario: "CLIENTE" // Inicialmente setado para 'CLIENTE'
    });

    const navigate = useNavigate();

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleUserTypeChange = (event: SelectChangeEvent<string>) => {
        const userType = event.target.value;
        setUserType(userType);
        setFormData({
            ...formData,
            tipoUsuario: userType.toUpperCase() // Atualiza tipo de usuário
        });
    };

    const handleSubmit = async () => {
        try {
            // Fazendo a requisição para a API para salvar o usuário
            const response = await axios.post("http://localhost:8080/api/usuario/novoUsuario", formData);
            console.log("Usuário cadastrado com sucesso:", response.data);
            navigate("/login");
        } catch (error) {
            console.error("Erro ao cadastrar usuário:", error);
        }
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
                    <Box display="flex" flexDirection="column" gap={2} width="400px">
                        <TextField name="nome" label="Nome" variant="outlined" fullWidth onChange={handleInputChange} />
                        <TextField name="endereco" label="Endereço" variant="outlined" fullWidth onChange={handleInputChange} />
                        <TextField name="profissao" label="Profissão" variant="outlined" fullWidth onChange={handleInputChange} />
                        <TextField name="cpfCnpj" label="CPF" variant="outlined" fullWidth onChange={handleInputChange} />
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
                                },
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
                        <TextField name="cpfCnpj" label="CNPJ" variant="outlined" fullWidth onChange={handleInputChange} />

                        <Button
                            onClick={handleSubmit}
                            variant="contained"
                            sx={{
                                marginTop: 2,
                                backgroundColor: '#191970',
                                color: '#fff',
                                '&:hover': {
                                    backgroundColor: '#1e1e78',
                                },
                            }}
                        >
                            Cadastrar Empresa/Banco
                        </Button>
                    </Box>
                )}
            </Box>
        </Box>
    );
};
