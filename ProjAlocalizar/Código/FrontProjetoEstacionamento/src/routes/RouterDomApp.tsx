import { Navigate, Route, Routes } from "react-router-dom";
import { HomePage } from "../pages/HomeClient";
import { PacientesPage } from "../pages/PacientesPage";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";
import { HomeCompanies } from "../pages/HomeCompanies";
import OrderPage from "../pages/OrderPage";
import MyCarsPage from "../pages/MyCarsPage"; 
import RentPage from "../pages/RentPage"; 

export const RouterDomApp = () => {
  return (
    <Routes>
      <Route path="/homeClient" element={<HomePage />} />
      <Route path="/pacientes" element={<PacientesPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/homeCompanies" element={<HomeCompanies />} />
      <Route path="/order" element={<OrderPage />} />
      <Route path="/mycars" element={<MyCarsPage />} />
      <Route path="/rent" element={<RentPage />} /> 
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};
