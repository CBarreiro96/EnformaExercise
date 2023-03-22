import { Persona } from '../persona/persona';
import { Rutina } from '../rutina/rutina';
export class Entrenador {
  constructor(
    public id: number,
    public nombre: string,
    public apellidos: string,
    public personas: Array<Persona>,
    public rutinas: Array<Rutina>
  ) {}
}
