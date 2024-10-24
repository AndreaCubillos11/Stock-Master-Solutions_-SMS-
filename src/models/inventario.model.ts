export interface Inventario {
    id: number;
    productoId: number;
    tiendaId: number;
    cantidad: number;
    cantidadMinima: number;
    cantidadBodega: number;
    ubicacionTienda: string;
    fechaUltimaActualizacion: Date;
}