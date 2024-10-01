import { Aluguel } from "../../pages/MyCarsPage";

export let alugueis : Aluguel[] = [];

export const setAlugueis = (param : Aluguel[]) =>{
    alugueis = param;
}