import { Venta } from "./Venta";

export class Promocion {
    constructor(
        public descripcion: string,
        public descuento: number
    ) {}

    aplicar(venta: Venta): number {
        const total = venta.detalles.reduce((sum, d) => sum + d.subtotal(), 0); 
        const descuento = (this.descuento / 100) * total; return total - descuento;}
}
