import { Venta } from "./Venta";

export class Promocion {
    constructor(
        public id: number,
        public descripcion: string,
        public descuento: number
    ) {}

    aplicarPromocion(venta: Venta): number {
        const total = venta.calcularTotal();
        return total - (total * this.descuento / 100);
    }

    aplicaSiTotalMayor(venta: Venta, montoMinimo: number): boolean {
        return venta.calcularTotal() >= montoMinimo;
    }
}
