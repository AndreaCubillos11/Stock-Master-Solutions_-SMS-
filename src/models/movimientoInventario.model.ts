export interface MovimientoInventario{
    id: number;
    inventarioId: number;
    tipoMovimiento: string;
    cantidad: number;
    fechaMovimiento: Date;
    usuarioId: number;
}