import { Producto } from "./Producto";

export class DetalleVenta {
    constructor(
        public producto: Producto,
        public cantidad: number
    ) {}

    calcularSubtotal(): number {
        return this.producto.precio * this.cantidad;
    }
}
