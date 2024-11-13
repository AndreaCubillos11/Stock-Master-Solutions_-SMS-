export interface Inventario {
    idInventario: number;
    productoId: number;
    tiendaId: number;
    cantidad: number;
    cantidadMinima: number;
    cantidadBodega: number;
    ubicacionTienda: string;
    fechaUltimaActualizacion: Date;
}