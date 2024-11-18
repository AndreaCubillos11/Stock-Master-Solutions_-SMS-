export interface MovimientoInventario{
    idMovimiento : number;
    inventarioId: number;
    tipoMovimiento: string;
    cantidad: number;
    fechaMovimiento: Date;
    usuarioId: number;
    tiendaId: number;
    productoId: number;
}