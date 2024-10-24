export interface Devolucion{
    id: number;
    productoId: number;
    tiendaId: number;
    usuarioId: number;
    razon: string;
    fechaDevolucion: Date;
}