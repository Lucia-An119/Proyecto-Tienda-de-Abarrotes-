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
const categoriaGranos = new CategoriaProducto(1, "Granos");
const categoriaBebidas = new CategoriaProducto(2, "Bebidas");

const arroz = new Producto(1, "Arroz", 5, 20, categoriaGranos);
const lentejas = new Producto(2, "Lentejas", 6, 15, categoriaGranos);
const jugo = new Producto(3, "Jugo", 3, 30, categoriaBebidas);

const productos: Producto[] = [arroz, lentejas, jugo];

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
    console.log("1. Registrar compra");
    console.log("2. Registrar venta");
    console.log("3. Mostrar inventario");
    console.log("4. Aplicar promoción");
    console.log("5. Ver historial de ventas de cliente");
    console.log("0. Salir");
    rl.question("Elige una opción: ", manejarOpcion);
}

function mostrarProductos(callback: (producto: Producto) => void) {
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
        case "1": // Compra
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

        case "2": // Venta
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

        case "3":
            inventario.mostrarInventario();
            mostrarMenu();
            break;

        case "4":
            if (ventas.length === 0) {
                console.log("No hay ventas registradas.");
            } else {
                const promo = new Promocion(1, "Descuento del 10%", 10);
                const ultimaVenta: Venta = ventas[ventas.length - 1]!; // el "!" asegura que no es undefined
                console.log(`Total con promoción: $${promo.aplicarPromocion(ultimaVenta)}`);
            }
            mostrarMenu();
            break;
        case "5":
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


