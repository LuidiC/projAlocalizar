import { Box, Button, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { SelectChangeEvent } from "@mui/material";

export const RegisterPage = () => {
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

    const handleUserTypeChange = (event: SelectChangeEvent<string>) => {
        const userType = event.target.value;
        setUserType(userType);
        setFormData({
            ...formData,
            tipoUsuario: userType.toUpperCase(),
            cpfCnpj: "" // Resetar o CPF/CNPJ ao trocar o tipo de usuário
        });
    };

    const handleSubmit = async () => {
        try {
            const cleanCpfCnpj = formData.cpfCnpj.replace(/\D/g, ''); // Remove a máscara
            const dataToSubmit = {
                ...formData,
                cpfCnpj: cleanCpfCnpj // Usar o CPF/CNPJ limpo
            };

            const response = await axios.post("http://localhost:8080/api/usuario/novoUsuario", dataToSubmit);
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
                        <TextField 
                            name="cpfCnpj" 
                            label="CPF" 
                            variant="outlined" 
                            fullWidth 
                            onChange={handleInputChange} 
                            inputProps={{ maxLength: 14 }} // Limite de caracteres
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
                        <TextField 
                            name="cpfCnpj" 
                            label="CNPJ" 
                            variant="outlined" 
                            fullWidth 
                            onChange={handleInputChange} 
                            inputProps={{ maxLength: 18 }} // Limite de caracteres
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
