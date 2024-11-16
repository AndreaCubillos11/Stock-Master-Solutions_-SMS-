export interface Inventario {
    idInventario: number;
    productoId: number;
    tiendaId: number;
    cantidad: number;
    cantidadMinima: number;
    fechaUltimaActualizacion: Date;
    cantidadBodega: number;
    ubicacionTienda: string;
}