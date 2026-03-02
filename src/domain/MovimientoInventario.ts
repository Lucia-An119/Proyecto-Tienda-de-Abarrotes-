import { Producto } from "./Producto";

export class MovimientoInventario {
    constructor(
        public id: number,
        public producto: Producto,
        public cantidad: number,
        public tipo: "entrada" | "salida",
        public fecha: Date
    ) {}
}
