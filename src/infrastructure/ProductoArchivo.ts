import { Producto } from "../domain/Producto";
import { IProductoRepository } from "../domain/IProductoRepo";
import * as fs from "fs";

export class ProductoRepositoryArchivo implements IProductoRepository {
    private file = "productos.json";

    guardar(producto: Producto): void {
        const productos = this.obtenerTodos();
        productos.push(producto);
        fs.writeFileSync(this.file, JSON.stringify(productos, null, 2));
    }

    obtenerPorId(id: number): Producto | undefined {
        return this.obtenerTodos().find(p => p.id === id);
    }

    obtenerTodos(): Producto[] {
        if (!fs.existsSync(this.file)) return [];
        const data = fs.readFileSync(this.file, "utf-8");
        return JSON.parse(data);
    }

    eliminar(id: number): void {
        const productos = this.obtenerTodos().filter(p => p.id !== id);
        fs.writeFileSync(this.file, JSON.stringify(productos, null, 2));
    }
}

