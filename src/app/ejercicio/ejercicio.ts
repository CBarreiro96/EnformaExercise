export class Ejercicio {
    id: number;
    nombre: string;
    descripcion: string;
    video: string;
    calorias: number

    public constructor(id: number, nombre: string, descripcion:string, video: string, calorias: number) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.video = video;
        this.calorias = calorias;
    }
}
