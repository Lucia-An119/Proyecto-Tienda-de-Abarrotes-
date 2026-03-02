export class CategoriaProducto {
    constructor(
        public id: number,
        public nombre: string
    ) {}

    renombrar(nuevoNombre: string): void {
        this.nombre = nuevoNombre;
    }
}
