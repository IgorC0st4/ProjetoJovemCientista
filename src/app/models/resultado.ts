import { Nivel } from 'src/app/models/nivel';
import { Usuario } from './usuario';
export class Resultado {
    id: number;
    tempoFinal: string;
    usuario:Usuario;
    nivel: Nivel;
 }