import { Producto } from "./Producto";

export class DetalleVenta {
    constructor(
        public producto: Producto,
        public cantidad: number,
        public precioUnitario: number
    ) {}

    subtotal(): number {
        return this.precioUnitario * this.cantidad;
    }
}
