import { Box, Button, Input } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
    const history = useNavigate();

    const doLogin = () => {
        history("/login");
    };

    return (
        <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            sx={{ padding: 5, minHeight: '60vh', gap: 4 }}
        >
            <Box
                sx={{flexDirection: 'column', display: 'flex' }}
            >
                <Input placeholder="Nome" />
                <Input placeholder="Senha" type="password" />
                <Button onClick={doLogin} variant={"outlined"}>
                    Login
                </Button>
            </Box>
        </Box>
    );
};
