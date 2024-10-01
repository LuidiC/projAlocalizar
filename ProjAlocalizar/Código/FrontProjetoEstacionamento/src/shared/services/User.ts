import { Usuario } from "../../pages/LoginPage";

export let user: Usuario; 

export const setUser = (param:Usuario) => {
    user = param
}