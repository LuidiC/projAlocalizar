import { Box, Button, Input, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { SetStateAction, useState } from "react";

export const RegisterPage = () => {
    const [userType, setUserType] = useState("cliente");
    const [employers, setEmployers] = useState([{ nome: '', rendimento: '' }]);

    const navigate = useNavigate();

    const handleUserTypeChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setUserType(event.target.value);
    };

    const handleAddEmployer = () => {
        if (employers.length < 3) {
            setEmployers([...employers, { nome: '', rendimento: '' }]);
        }
    };

    const handleEmployerChange = (index: number, field: keyof typeof employers[number], value: string) => {
        const newEmployers = [...employers];
        newEmployers[index][field] = value;
        setEmployers(newEmployers);
    };

    const handleSubmit = () => {
        // lógica para enviar dados ao servidor
        navigate("/login");
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
                        <TextField fullWidth label="RG" variant="outlined" />
                        <TextField fullWidth label="CPF" variant="outlined" />
                        <TextField fullWidth label="Nome" variant="outlined" />
                        <TextField fullWidth label="Endereço" variant="outlined" />
                        <TextField fullWidth label="Profissão" variant="outlined" />

                        
                        {employers.map((employer, index) => (
                            <Box key={index} display="flex" flexDirection="column" gap={2}>
                                <TextField
                                    fullWidth
                                    label="Entidade Empregadora"
                                    value={employer.nome}
                                    onChange={(e) => handleEmployerChange(index, 'nome', e.target.value)}
                                    variant="outlined"
                                />
                                <TextField
                                    fullWidth
                                    label="Rendimento"
                                    value={employer.rendimento}
                                    onChange={(e) => handleEmployerChange(index, 'rendimento', e.target.value)}
                                    variant="outlined"
                                />
                            </Box>
                        ))}

                        
                        {employers.length < 3 && (
                            <Button onClick={handleAddEmployer} variant="outlined">
                                Adicionar Empregador
                            </Button>
                        )}

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
                        <TextField fullWidth label="Nome" variant="outlined" />
                        <TextField fullWidth label="Senha" type="password" variant="outlined" />
                        <TextField fullWidth label="CNPJ" variant="outlined" />

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
