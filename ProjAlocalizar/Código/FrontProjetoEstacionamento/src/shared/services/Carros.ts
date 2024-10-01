import { Car } from "../../pages/MyCarsPage";


export let carros : Car[] = [];

export const setCarros = (param : Car[]) =>{
    carros = param;
}