import { Proveedor } from "./Proveedor";
import { Producto } from "./Producto";
import { Inventario } from "./Inventario";
import { MovimientoInventario } from "./MovimientoInventario";

export class Compra {
    constructor(
        public id: number,
        public proveedor: Proveedor,
        public producto: Producto,
        public cantidad: number,
        public fecha: Date
    ) {}

    mostrarInfo(): void {
        console.log(`Compra #${this.id} - Proveedor: ${this.proveedor.nombre} - Producto: ${this.producto.nombre} - Cantidad: ${this.cantidad}`);
    }

    registrarEnInventario(inventario: Inventario): void {
        const movimiento = new MovimientoInventario(
            Date.now(),
            this.producto,
            this.cantidad,
            "entrada",
            this.fecha
        );
        inventario.registrarMovimiento(movimiento);
    }
}
