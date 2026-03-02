import { Venta } from "./Venta";

export class Cliente {
    constructor(
        public id: number,
        public nombre: string,
        public direccion: string
    ) {}

    verHistorialVentas(ventas: Venta[]): Venta[] {
        return ventas.filter(v => v.cliente.id === this.id);
    }
}
