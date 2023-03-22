import { Persona } from './../persona/persona';
import { Ejercicio } from './../ejercicio/ejercicio';
export class Entrenamiento {
    id: number;
    ejercicio: Ejercicio;
    persona: Persona;
    tiempo: string;
    repeticiones: number;
    fecha: Date;

    public constructor(id: number, ejercicio: Ejercicio, persona: Persona, tiempo: string, repeticiones: number, fecha: Date) {
        this.id = id;
        this.ejercicio = ejercicio;
        this.persona = persona;
        this.tiempo = tiempo;
        this.repeticiones = repeticiones;
        this.fecha = fecha;
    }

}
