export class Rutina {
    id: number;
    nombre: string;
    descripcion: string;

    public constructor(id: number, nombre: string, descripcion:string) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
    }
}