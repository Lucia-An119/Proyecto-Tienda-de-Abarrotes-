import { Venta } from "./Venta";

export class Promocion {
    constructor(
        public descripcion: string,
        public descuento: number
    ) {}

    aplicar(venta: Venta): number {
        return venta.calcularTotal() * (1 - this.descuento / 100);
    }
}
