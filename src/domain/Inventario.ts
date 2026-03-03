import { MovimientoInventario } from "./MovimientoInventario";
import { Producto } from "./Producto";

export class Inventario {
    movimientos: MovimientoInventario[] = [];

    registrarMovimiento(movimiento: MovimientoInventario): void {
        if (movimiento.tipo === "salida" && movimiento.producto.stock < movimiento.cantidad) {
            throw new Error("Stock insuficiente");
        }
        this.movimientos.push(movimiento);
        movimiento.tipo === "entrada"
            ? movimiento.producto.stock += movimiento.cantidad
            : movimiento.producto.stock -= movimiento.cantidad;
    }

    mostrarInventario(): void {
        console.log("Inventario:");
        this.movimientos.forEach(m =>
            console.log(`${m.tipo} - ${m.producto.nombre} - ${m.cantidad} unidades`)
        );
    }
}

