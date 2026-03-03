import * as readline from "readline";
import { Producto } from "../../domain/Producto";
import { Proveedor } from "../../domain/Proveedor";
import { Cliente } from "../../domain/Cliente";
import { Venta } from "../../domain/Venta";
import { Inventario } from "../../domain/Inventario";
import { MovimientoInventario } from "../../domain/MovimientoInventario";
import { Promocion } from "../../domain/Promocion";


export class MenuConsola {
    private productos: Producto[] = [];
    private ventas: Venta[] = [];
    private inventario: Inventario = new Inventario();
    private proveedor: Proveedor = new Proveedor(1, "Proveedor A");
    private cliente: Cliente = new Cliente(1, "Juan Pérez");

    iniciar() {
        const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

        const mostrarMenu = () => {
            console.log("\n=== MENÚ PRINCIPAL ===");
            console.log("1. Agregar producto");
            console.log("2. Registrar compra");
            console.log("3. Registrar venta");
            console.log("4. Mostrar inventario");
            console.log("5. Aplicar promoción a última venta");
            console.log("0. Salir");

            rl.question("Opción: ", (opcion) => {
                switch (opcion) {
                    case "1":
                        rl.question("Nombre: ", (nombre) => {
                            rl.question("Precio: ", (precioStr) => {
                                rl.question("Stock inicial: ", (stockStr) => {
                                    const producto = new Producto(
                                        this.productos.length + 1,
                                        nombre,
                                        parseFloat(precioStr),
                                        parseInt(stockStr)
                                    );
                                    this.productos.push(producto);
                                    console.log(`Producto agregado: ${producto.nombre}`);
                                    mostrarMenu();
                                });
                            });
                        });
                        break;

                    case "2": // Compra
                        if (this.productos.length === 0) {
                            console.log("No hay productos.");
                            mostrarMenu();
                            break;
                        }
                        console.log("Productos disponibles:");
                        this.productos.forEach(p => console.log(`${p.id} - ${p.nombre}`));
                        rl.question("ID producto: ", (idStr) => {
                            const producto = this.productos.find(p => p.id === parseInt(idStr));
                            if (!producto) {
                                console.log("Producto inválido.");
                                mostrarMenu();
                                return;
                            }
                            rl.question("Cantidad: ", (cantStr) => {
                                const movimiento = new MovimientoInventario(producto, parseInt(cantStr), "entrada", new Date());
                                this.inventario.registrarMovimiento(movimiento);
                                console.log(`Compra registrada de ${cantStr} unidades de ${producto.nombre}`);
                                mostrarMenu();
                            });
                        });
                        break;

                    case "3": // Venta
                        if (this.productos.length === 0) {
                            console.log("No hay productos.");
                            mostrarMenu();
                            break;
                        }
                        console.log("Productos disponibles:");
                        this.productos.forEach(p => console.log(`${p.id} - ${p.nombre} (Stock: ${p.stock})`));
                        rl.question("ID producto: ", (idStr) => {
                            const producto = this.productos.find(p => p.id === parseInt(idStr));
                            if (!producto) {
                                console.log("Producto inválido.");
                                mostrarMenu();
                                return;
                            }
                            rl.question("Cantidad: ", (cantStr) => {
                                try {
                                    const cantidad = parseInt(cantStr);
                                    const venta = new Venta(Date.now(), this.cliente, producto, cantidad, new Date());
                                    const movimiento = new MovimientoInventario(producto, cantidad, "salida", new Date());
                                    this.inventario.registrarMovimiento(movimiento);
                                    this.ventas.push(venta);
                                    console.log(`Venta registrada. Total: $${venta.calcularTotal()}`);
                                } catch (e) {
                                    console.log((e as Error).message);
                                }
                                mostrarMenu();
                            });
                        });
                        break;

                    case "4":
                        this.inventario.mostrarInventario();
                        mostrarMenu();
                        break;

                    case "5":
                        if (this.ventas.length === 0) {
                            console.log("No hay ventas registradas.");
                        } else {
                            const promo = new Promocion("Descuento del 10%", 10);
                            const ultimaVenta: Venta = this.ventas[this.ventas.length - 1]!; // el "!" asegura que no es undefined
                            console.log(`Total con promoción: $${promo.aplicar(ultimaVenta)}`);
                        }
                        mostrarMenu();
                        break;

                    case "0":
                        console.log("Saliendo...");
                        rl.close();
                        break;

                    default:
                        console.log("Opción inválida.");
                        mostrarMenu();
                }
            });
        };

        mostrarMenu();
    }
}


