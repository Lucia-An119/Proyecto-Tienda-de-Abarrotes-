import { CategoriaProducto } from "./CategoriaProducto";

export class Producto {
    constructor(
        public id: number,
        public nombre: string,
        public precio: number,
        public stock: number,
        public categoria: CategoriaProducto
    ) {}

    mostrarInfo(): void {
        console.log(`Producto: ${this.nombre} | Precio: $${this.precio} | Stock: ${this.stock} | Categoría: ${this.categoria.nombre}`);
    }

    aplicarDescuento(porcentaje: number): void {
        this.precio -= this.precio * (porcentaje / 100);
    }

    tieneStock(cantidad: number): boolean {
        return this.stock >= cantidad;
    }
}
