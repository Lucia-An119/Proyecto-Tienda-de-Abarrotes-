import { Inventario } from "./domain/Inventario";
import { Cliente } from "./domain/Cliente";
import { ProductoArchivo } from "./infrastructure/ProductoArchivo";
import { RegistrarVenta } from "./application/RegistrarVenta";
import { MenuConsola } from "./interfaces/consola/MenuConsola";

const inventario = new Inventario();
const productoRepo = new ProductoArchivo();
const registrarVenta = new RegistrarVenta(productoRepo, inventario);

const cliente = new Cliente(1, "Juan Pérez");
const productos = productoRepo.obtenerTodos();

const menu = new MenuConsola();
menu.iniciar();




