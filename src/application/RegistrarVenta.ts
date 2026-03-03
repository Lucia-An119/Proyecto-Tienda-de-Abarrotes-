import { Venta } from "../domain/Venta";
import { Cliente } from "../domain/Cliente";
import { DetalleVenta } from "../domain/DetalleVenta";
import { Inventario } from "../domain/Inventario";
import { IProductoRepository } from "../domain/IProductoRepo";

export class RegistrarVenta {
    constructor(
        private productoRepo: IProductoRepository,
        private inventario: Inventario
    ) {}

    ejecutar(cliente: Cliente, detalles: DetalleVenta[]): Venta {
        const venta = new Venta(Date.now(), cliente, new Date());
        detalles.forEach(d => venta.agregarDetalle(d));

        // Actualizar inventario
        venta.registrarEnInventario(this.inventario);

        return venta;
    }
}
