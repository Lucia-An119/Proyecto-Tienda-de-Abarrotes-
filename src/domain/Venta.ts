import { Cliente } from "./Cliente";
import { DetalleVenta } from "./DetalleVenta";
import { Inventario } from "./Inventario";
import { MovimientoInventario } from "./MovimientoInventario";

export class Venta {
    detalles: DetalleVenta[] = [];

    constructor(
        public id: number,
        public cliente: Cliente,
        public fecha: Date
    ) {}

    agregarDetalle(detalle: DetalleVenta): void {
        this.detalles.push(detalle);
    }

    calcularTotal(): number {
        return this.detalles.reduce((total, d) => total + d.calcularSubtotal(), 0);
    }

    mostrarInfo(): void {
        console.log(`Venta #${this.id} - Cliente: ${this.cliente.nombre} - Total: $${this.calcularTotal()}`);
    }

    cantidadTotalProductos(): number {
        return this.detalles.reduce((total, d) => total + d.cantidad, 0);
    }

    generarReciboDetallado(): string {
        let recibo = `Venta #${this.id}\nCliente: ${this.cliente.nombre}\nFecha: ${this.fecha}\n`;
        recibo += "Detalles:\n";
        this.detalles.forEach(d => {
            recibo += `- ${d.producto.nombre} x${d.cantidad} = $${d.calcularSubtotal()}\n`;
        });
        recibo += `TOTAL: $${this.calcularTotal()}`;
        return recibo;
    }

    registrarEnInventario(inventario: Inventario): void {
        this.detalles.forEach((detalle, index) => {
            const movimiento = new MovimientoInventario(
                Date.now() + index,
                detalle.producto,
                detalle.cantidad,
                "salida",
                this.fecha
            );
            inventario.registrarMovimiento(movimiento);
        });
    }
}
