import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { App } from "../App"
import { HomePage } from "../pages/HomePage";
import { PacientesPage } from "../pages/PacientesPage";
import { LoginPage } from "../pages/LoginPagee";

export const RouterDomApp = () =>{
    return(
        <Routes>
            <Route path="/home" element={<HomePage />}/>
            <Route path="/pacientes" element={<PacientesPage />}/>
            <Route path="/login" element={<LoginPage />}/>
            <Route path="*" element={<Navigate to={"/home"}/>}/>
        </Routes>
    );
}