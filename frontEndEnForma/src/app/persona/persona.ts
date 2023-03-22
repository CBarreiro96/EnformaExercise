import { Entrenamiento } from './../entrenamiento/entrenamiento';
export class Persona {
    id: number;
    nombre: string;
    apellido: string;
    talla: number;
    peso: number;
    edad: number;
    ingreso: Date;
    brazo: number;
    pecho: number;
    cintura: number;
    pierna: number;
    entrenando: boolean;
    terminado: Date;
    razon: string;
    entrenamientos: Array<Entrenamiento>


    public constructor(id: number, nombre: string, apellido:string, talla: number, peso: number, edad: number,
        ingreso: Date, brazo: number, pecho: number, cintura: number, pierna: number, entrenando: boolean,
        terminado: Date, razon: string) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.talla = talla;
        this.peso = peso;
        this.edad = edad;
        this.ingreso = ingreso;
        this.brazo = brazo;
        this.pecho = pecho;
        this.cintura = cintura;
        this.pierna = pierna;
        this.entrenando = entrenando;
        this.terminado = terminado;
        this.razon = razon;
        this.entrenamientos = [];
    }
}
