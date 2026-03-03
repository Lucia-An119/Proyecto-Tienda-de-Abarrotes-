import { Inventario } from "./domain/Inventario";
import { Cliente } from "./domain/Cliente";
import { ProductoRepositoryArchivo } from "./infrastructure/ProductoArchivo";
import { RegistrarVenta } from "./application/RegistrarVenta";
import { MenuConsola } from "./interfaces/consola/MenuConsola";

const inventario = new Inventario();
const productoRepo = new ProductoRepositoryArchivo();
const registrarVenta = new RegistrarVenta(productoRepo, inventario);

const cliente = new Cliente(1, "Juan Pérez", "Calle 123");
const productos = productoRepo.obtenerTodos();

const menu = new MenuConsola(registrarVenta);
menu.iniciar(cliente, productos);




