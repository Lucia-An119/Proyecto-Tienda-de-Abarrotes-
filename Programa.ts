// ------------------- Clases -------------------

// Clase CategoriaProducto
class CategoriaProducto {
    constructor(
        public id: number,
        public nombre: string
    ) {}

    renombrar(nuevoNombre: string): void {
        this.nombre = nuevoNombre;
    }
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
        console.log(`Producto: ${this.nombre} | Precio: $${this.precio} | Stock: ${this.stock} | Categoría: ${this.categoria.nombre}`);
    }

    aplicarDescuento(porcentaje: number): void {
        this.precio -= this.precio * (porcentaje / 100);
    }

    tieneStock(cantidad: number): boolean {
        return this.stock >= cantidad;
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
        if (movimiento.tipo === "salida" && movimiento.producto.stock < movimiento.cantidad) {
            throw new Error("Stock insuficiente para la venta");
        }

        this.movimientos.push(movimiento);
        if (movimiento.tipo === "entrada") {
            movimiento.producto.stock += movimiento.cantidad;
        } else {
            movimiento.producto.stock -= movimiento.cantidad;
        }
    }

    mostrarInventario(): void {
        console.log("Inventario actual:");
        this.movimientos.forEach(m => {
            console.log(`${m.tipo.toUpperCase()} - ${m.producto.nombre} - Cantidad: ${m.cantidad} - Fecha: ${m.fecha}`);
        });
    }

    buscarProducto(nombre: string): Producto | undefined {
        return this.movimientos.find(m => m.producto.nombre === nombre)?.producto;
    }

    stockTotal(producto: Producto): number {
        return producto.stock;
    }

    obtenerHistorialProducto(producto: Producto): MovimientoInventario[] {
        return this.movimientos.filter(m => m.producto.id === producto.id);
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

    registrarEnInventario(inventario: Inventario): void {
        const movimiento = new MovimientoInventario(
            Date.now(),
            this.producto,
            this.cantidad,
            "entrada",
            this.fecha
        );
        inventario.registrarMovimiento(movimiento);
    }
}

// Clase Cliente
class Cliente {
    constructor(
        public id: number,
        public nombre: string,
        public direccion: string
    ) {}

    verHistorialVentas(ventas: Venta[]): Venta[] {
        return ventas.filter(v => v.cliente.id === this.id);
    }
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

    cantidadTotalProductos(): number {
        return this.detalles.reduce((total, d) => total + d.cantidad, 0);
    }

    generarReciboDetallado(): string {
        let recibo = `Venta #${this.id}\nCliente: ${this.cliente.nombre}\nFecha: ${this.fecha}\n`;
        recibo += "Detalles:\n";
        this.detalles.forEach(d => {
            recibo += `- ${d.producto.nombre} x${d.cantidad} = $${d.calcularSubtotal()}\n`;
        });
        recibo += `TOTAL: $${this.calcularTotal()}`;
        return recibo;
    }

    registrarEnInventario(inventario: Inventario): void {
        this.detalles.forEach((detalle, index) => {
            const movimiento = new MovimientoInventario(
                Date.now() + index,
                detalle.producto,
                detalle.cantidad,
                "salida",
                this.fecha
            );
            inventario.registrarMovimiento(movimiento);
        });
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

    aplicaSiTotalMayor(venta: Venta, montoMinimo: number): boolean {
        return venta.calcularTotal() >= montoMinimo;
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
compra1.registrarEnInventario(inventario);
compra1.mostrarInfo();

// Registrar venta
const venta1 = new Venta(1, cliente1, new Date());
venta1.agregarDetalle(new DetalleVenta(arroz, 3));
venta1.registrarEnInventario(inventario);
venta1.mostrarInfo();
console.log(venta1.generarReciboDetallado());

// Aplicar promoción
const promo = new Promocion(1, "Descuento del 10%", 10);
console.log(`Total con promoción: $${promo.aplicarPromocion(venta1)}`);

// Mostrar inventario
inventario.mostrarInventario();
