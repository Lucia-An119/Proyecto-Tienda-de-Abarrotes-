import { CategoriaProducto } from "./domain/CategoriaProducto";
import { Producto } from "./domain/Producto";
import { Proveedor } from "./domain/Proveedor";
import { Cliente } from "./domain/Cliente";
import { Inventario } from "./domain/Inventario";
import { Compra } from "./domain/Compra";
import { Venta } from "./domain/Venta";
import { DetalleVenta } from "./domain/DetalleVenta";
import { Promocion } from "./domain/Promocion";

// Ejemplo de uso
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
