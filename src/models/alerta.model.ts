export interface Alerta{
    idAlerta: number;
    inventarioId: number;
    productoId: number;
    tiendaId: number;
    fechaAlerta: Date;
    descripcion: string;
    estado: string;
}