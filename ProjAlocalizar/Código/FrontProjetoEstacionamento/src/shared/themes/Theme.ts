import { createTheme } from "@mui/material";

export const Theme = createTheme({
    palette: {
        primary: {
            main: '#1E88E5', // Azul mais suave e moderno
            dark: '#1565C0', // Azul petróleo para um contraste elegante
            light: '#90CAF9', // Azul pastel claro para detalhes
            contrastText: '#ffffff', // Texto contrastante em branco
        },
        secondary: {
            main: '#00ACC1', // Azul turquesa para um toque moderno
            dark: '#00838F', // Azul turquesa mais escuro
            light: '#4DD0E1', // Azul turquesa mais claro
            contrastText: '#ffffff', // Texto contrastante em branco
        },
        background: {
            default: '#E3F2FD', // Fundo azul muito claro para um toque moderno
            paper: '#ffffff', // Papel branco
        },
        text: {
            primary: '#0D47A1', // Texto primário em azul mais escuro e moderno
            secondary: '#546E7A', // Texto secundário em cinza azulado
        },
    },
});
