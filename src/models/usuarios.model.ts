export interface Usuario{
    id: number;
    usuario: string;
    clave: string;
    nombreCompleto: string;
    rol: number;
    correo: string;
    fechaCreacion: Date;
    idTiendas: number;
}