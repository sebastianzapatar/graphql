/**
 * Tipos TypeScript para la entidad Producto.
 *
 * Estos tipos reflejan el schema GraphQL del backend.
 * TypeScript nos da seguridad de tipos en tiempo de compilacion,
 * evitando errores comunes como acceder a campos que no existen.
 */

/** Producto tal como llega desde la API GraphQL */
export interface Producto {
  id: string;
  nombre: string;
  descripcion?: string; // Opcional (puede ser null en GraphQL)
  precio: number;
  stock: number;
  categoria?: string; // Opcional
}

/** Datos necesarios para crear un producto (sin ID, lo genera MongoDB) */
export interface ProductoInput {
  nombre: string;
  descripcion?: string;
  precio: number;
  stock: number;
  categoria?: string;
}
