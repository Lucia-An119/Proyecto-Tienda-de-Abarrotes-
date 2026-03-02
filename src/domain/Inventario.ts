import { MovimientoInventario } from "./MovimientoInventario";
import { Producto } from "./Producto";

export class Inventario {
    movimientos: MovimientoInventario[] = [];

    registrarMovimiento(movimiento: MovimientoInventario): void {
        if (movimiento.tipo === "salida" && movimiento.producto.stock < movimiento.cantidad) {
            throw new Error("Stock insuficiente para la venta");
        }

        this.movimientos.push(movimiento);
        if (movimiento.tipo === "entrada") {
            movimiento.producto.stock += movimiento.cantidad;
        } else {
            movimiento.producto.stock -= movimiento.cantidad;
        }
    }

    mostrarInventario(): void {
        console.log("Inventario actual:");
        this.movimientos.forEach(m => {
            console.log(`${m.tipo.toUpperCase()} - ${m.producto.nombre} - Cantidad: ${m.cantidad} - Fecha: ${m.fecha}`);
        });
    }

    buscarProducto(nombre: string): Producto | undefined {
        return this.movimientos.find(m => m.producto.nombre === nombre)?.producto;
    }

    stockTotal(producto: Producto): number {
        return producto.stock;
    }

    obtenerHistorialProducto(producto: Producto): MovimientoInventario[] {
        return this.movimientos.filter(m => m.producto.id === producto.id);
    }
}
