import { Cliente } from "./Cliente";
import { Producto } from "./Producto";

export class Venta {
    constructor(
        public id: number,
        public cliente: Cliente,
        public producto: Producto,
        public cantidad: number,
        public fecha: Date
    ) {}

    calcularTotal(): number {
        return this.producto.precio * this.cantidad;
    }
}


