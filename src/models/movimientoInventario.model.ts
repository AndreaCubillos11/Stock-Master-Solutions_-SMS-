export interface MovimientoInventario{
    IdMovimiento : number;
    inventarioId: number;
    TipoMovimiento: string;
    fechaMovimiento: Date;
    usuarioId: number;
    tiendaId: number;
    productoId: number;
    cantidad: number;
}