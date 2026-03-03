import { Producto } from "../domain/Producto";
import { CategoriaProducto } from "../domain/CategoriaProducto";
import { IProductoRepository } from "../domain/IProductoRepo";

export class AgregarProducto {
    constructor(private productoRepo: IProductoRepository) {}

    ejecutar(nombre: string, precio: number, stock: number, categoria: CategoriaProducto): Producto {
        const producto = new Producto(Date.now(), nombre, precio, stock, categoria);
        this.productoRepo.guardar(producto);
        return producto;
    }
}
