import { Producto } from "../domain/Producto";
import { ProductoArchivo } from "../infrastructure/ProductoArchivo";

export class AgregarProducto {
    constructor(private productoRepo: ProductoArchivo) {}

    ejecutar(nombre: string, precio: number, stock: number, categoria: string): Producto {
        const producto = new Producto(Date.now(), nombre, precio, stock, categoria);
        this.productoRepo.guardar(producto);
        return producto;
    }
}
