// Clase CategoriaProducto
class CategoriaProducto {
    constructor(
        public id: number,
        public nombre: string
    ) {}
}

// Clase Producto
class Producto {
    constructor(
        public id: number,
        public nombre: string,
        public precio: number,
        public stock: number,
        public categoria: CategoriaProducto
    ) {}

    mostrarInfo(): void {
        console.log(`Producto: ${this.nombre} | Precio: $${this.precio} | Stock: ${this.stock} | Categoría: ${this.categoria.nombre}` );
    }
}

// Clase MovimientoInventario
class MovimientoInventario {
    constructor(
        public id: number,
        public producto: Producto,
        public cantidad: number,
        public tipo: "entrada" | "salida", // entrada = compra, salida = venta
        public fecha: Date
    ) {}
}

// Clase Inventario
class Inventario {
    movimientos: MovimientoInventario[] = [];

    registrarMovimiento(movimiento: MovimientoInventario): void {
        this.movimientos.push(movimiento);
        if (movimiento.tipo === "entrada") {
            movimiento.producto.stock += movimiento.cantidad;
        } else {
            movimiento.producto.stock -= movimiento.cantidad;
        }
    }

    mostrarInventario(): void {
        console.log("📦 Inventario actual:");
        this.movimientos.forEach(m => {
            console.log(`${m.tipo.toUpperCase()} - ${m.producto.nombre} - Cantidad: ${m.cantidad} - Fecha: ${m.fecha}`);
        });
    }
}

// Clase Proveedor
class Proveedor {
    constructor(
        public id: number,
        public nombre: string,
        public contacto: string
    ) {}
}

// Clase Compra
class Compra {
    constructor(
        public id: number,
        public proveedor: Proveedor,
        public producto: Producto,
        public cantidad: number,
        public fecha: Date
    ) {}

    mostrarInfo(): void {
        console.log(`Compra #${this.id} - Proveedor: ${this.proveedor.nombre} - Producto: ${this.producto.nombre} - Cantidad: ${this.cantidad}`);
    }
}

// Clase Cliente
class Cliente {
    constructor(
        public id: number,
        public nombre: string,
        public direccion: string
    ) {}
}

// Clase DetalleVenta
class DetalleVenta {
    constructor(
        public producto: Producto,
        public cantidad: number
    ) {}

    calcularSubtotal(): number {
        return this.producto.precio * this.cantidad;
    }
}

// Clase Venta
class Venta {
    detalles: DetalleVenta[] = [];

    constructor(
        public id: number,
        public cliente: Cliente,
        public fecha: Date
    ) {}

    agregarDetalle(detalle: DetalleVenta): void {
        this.detalles.push(detalle);
    }

    calcularTotal(): number {
        return this.detalles.reduce((total, d) => total + d.calcularSubtotal(), 0);
    }

    mostrarInfo(): void {
        console.log(`Venta #${this.id} - Cliente: ${this.cliente.nombre} - Total: $${this.calcularTotal()}`);
    }
}

// Clase Promocion
class Promocion {
    constructor(
        public id: number,
        public descripcion: string,
        public descuento: number // porcentaje
    ) {}

    aplicarPromocion(venta: Venta): number {
        const total = venta.calcularTotal();
        return total - (total * this.descuento / 100);
    }
}

// ------------------- Ejemplo de uso -------------------
const categoriaGranos = new CategoriaProducto(1, "Granos");
const arroz = new Producto(1, "Arroz", 5, 20, categoriaGranos);

const proveedor1 = new Proveedor(1, "Proveedor A", "555-1234");
const cliente1 = new Cliente(1, "Juan Pérez", "Calle 123");

const inventario = new Inventario();

// Registrar compra
const compra1 = new Compra(1, proveedor1, arroz, 10, new Date());
inventario.registrarMovimiento(new MovimientoInventario(1, arroz, 10, "entrada", new Date()));
compra1.mostrarInfo();

// Registrar venta
const venta1 = new Venta(1, cliente1, new Date());
venta1.agregarDetalle(new DetalleVenta(arroz, 3));
inventario.registrarMovimiento(new MovimientoInventario(2, arroz, 3, "salida", new Date()));
venta1.mostrarInfo();

// Aplicar promoción
const promo = new Promocion(1, "Descuento del 10%", 10);
console.log(`Total con promoción: $${promo.aplicarPromocion(venta1)}`);

// Mostrar inventario
inventario.mostrarInventario();