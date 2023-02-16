import { Persona } from '../persona/persona';
export class Entrenador {
  constructor(
    public id: number,
    public nombre: string,
    public apellido: string,
    public direccion: string,
    public telefono: string,
    public personas: Array<Persona>
  ) {}
}
