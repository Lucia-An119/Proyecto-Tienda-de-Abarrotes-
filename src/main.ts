import { CategoriaProducto } from "./domain/CategoriaProducto";
import { Producto } from "./domain/Producto";
import { Proveedor } from "./domain/Proveedor";
import { Cliente } from "./domain/Cliente";
import { Inventario } from "./domain/Inventario";
import { Compra } from "./domain/Compra";
import { Venta } from "./domain/Venta";
import { DetalleVenta } from "./domain/DetalleVenta";
import { Promocion } from "./domain/Promocion";
import * as readline from "readline";

// Datos iniciales
const categorias: CategoriaProducto[] = [
    new CategoriaProducto(1, "Granos"),
    new CategoriaProducto(2, "Bebidas")
];

const productos: Producto[] = [];

const proveedor1 = new Proveedor(1, "Proveedor A", "555-1234");
const cliente1 = new Cliente(1, "Juan Pérez", "Calle 123");

const inventario = new Inventario();
const ventas: Venta[] = [];

// Configuración de readline
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function mostrarMenu() {
    console.log("\n=== MENÚ PRINCIPAL ===");
    console.log("1. Crear nuevo producto");
    console.log("2. Registrar compra");
    console.log("3. Registrar venta");
    console.log("4. Mostrar inventario");
    console.log("5. Aplicar promoción");
    console.log("6. Ver historial de ventas de cliente");
    console.log("0. Salir");
    rl.question("Elige una opción: ", manejarOpcion);
}

function mostrarProductos(callback: (producto: Producto) => void) {
    if (productos.length === 0) {
        console.log("No hay productos registrados.");
        mostrarMenu();
        return;
    }
    console.log("\n=== PRODUCTOS DISPONIBLES ===");
    productos.forEach(p => {
        console.log(`${p.id}. ${p.nombre} (Stock: ${p.stock}, Precio: $${p.precio})`);
    });
    rl.question("Elige el ID del producto: ", (id) => {
        const producto = productos.find(p => p.id === parseInt(id));
        if (producto) {
            callback(producto);
        } else {
            console.log("Producto inválido.");
            mostrarMenu();
        }
    });
}

function manejarOpcion(opcion: string) {
    switch (opcion) {
        case "1": // Crear producto
            rl.question("Nombre del producto: ", (nombre) => {
                rl.question("Precio: ", (precioStr) => {
                    rl.question("Stock inicial: ", (stockStr) => {
                        console.log("Categorías disponibles:");
                        categorias.forEach(c => console.log(`${c.id}. ${c.nombre}`));
                        rl.question("Elige el ID de la categoría: ", (catStr) => {
                            const categoria = categorias.find(c => c.id === parseInt(catStr));
                            if (!categoria) {
                                console.log("Categoría inválida.");
                                mostrarMenu();
                                return;
                            }
                            const producto = new Producto(
                                productos.length + 1,
                                nombre,
                                parseFloat(precioStr),
                                parseInt(stockStr),
                                categoria
                            );
                            productos.push(producto);
                            console.log(` Producto creado: ${producto.nombre}`);
                            mostrarMenu();
                        });
                    });
                });
            });
            break;

        case "2": // Compra
            mostrarProductos((producto) => {
                rl.question("Cantidad a comprar: ", (cantidadStr) => {
                    const cantidad = parseInt(cantidadStr);
                    const compra = new Compra(Date.now(), proveedor1, producto, cantidad, new Date());
                    compra.registrarEnInventario(inventario);
                    compra.mostrarInfo();
                    mostrarMenu();
                });
            });
            break;

        case "3": // Venta
            mostrarProductos((producto) => {
                rl.question("Cantidad a vender: ", (cantidadStr) => {
                    const cantidad = parseInt(cantidadStr);
                    const venta = new Venta(Date.now(), cliente1, new Date());
                    venta.agregarDetalle(new DetalleVenta(producto, cantidad));
                    try {
                        venta.registrarEnInventario(inventario);
                        venta.mostrarInfo();
                        console.log(venta.generarReciboDetallado());
                        ventas.push(venta);
                    } catch (error) {
                        console.log("Error en la venta:", (error as Error).message);
                    }
                    mostrarMenu();
                });
            });
            break;

        case "4":
            inventario.mostrarInventario();
            mostrarMenu();
            break;

        case "5":
            if (ventas.length === 0) {
                console.log("No hay ventas registradas.");
            } else {
                const promo = new Promocion(1, "Descuento del 10%", 10);
                const ultimaVenta = ventas[ventas.length - 1]!;
                console.log(`Total con promoción: $${promo.aplicarPromocion(ultimaVenta)}`);
            }
            mostrarMenu();
            break;

        case "6":
            const historial = cliente1.verHistorialVentas(ventas);
            console.log(`Historial de ventas de ${cliente1.nombre}:`);
            historial.forEach(v => v.mostrarInfo());
            mostrarMenu();
            break;

        case "0":
            console.log("Saliendo del programa...");
            rl.close();
            return;

        default:
            console.log("Opción inválida.");
            mostrarMenu();
    }
}

// Iniciar programa
mostrarMenu();



