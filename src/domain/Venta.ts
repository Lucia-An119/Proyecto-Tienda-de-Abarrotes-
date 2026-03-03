import { Cliente } from "./Cliente";
import { DetalleVenta } from "./DetalleVenta";
import { Inventario } from "./Inventario";
import { MovimientoInventario } from "./MovimientoInventario";
import { Promocion } from "./Promocion";

export class Venta {
    public detalles: DetalleVenta[] = [];
    public promocion?: Promocion;

    constructor(
        public id: number,
        public cliente: Cliente,
        public fecha: Date
    ) {}

    agregarDetalle(detalle: DetalleVenta): void {
        this.detalles.push(detalle);
    }

    calcularTotal(): number { 
        const totalBase = this.detalles.reduce((total, d) => total + d.subtotal(), 0); 
        if (this.promocion) { 
            return this.promocion.aplicar(this);
         } 
         return totalBase; 
    }

    registrarEnInventario(inventario: Inventario): void {
        this.detalles.forEach(d => {
            inventario.registrarMovimiento(
                new MovimientoInventario(d.producto,-d.cantidad,"salida", new Date())
            );
        });
    }
}



