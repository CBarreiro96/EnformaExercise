export class Rutina {
    id: number;
    nombre: string;
    descripcion: string;
    ejercicio: boolean;

    public constructor(id: number, nombre: string, descripcion:string, ejercicio: boolean) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.ejercicio = ejercicio
    }
}