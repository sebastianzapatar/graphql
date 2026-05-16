/**
 * Definiciones de queries y mutations de GraphQL.
 *
 * Aqui centralizamos todas las operaciones GraphQL que
 * el frontend necesita. Esto facilita el mantenimiento
 * y la reutilizacion de consultas entre componentes.
 *
 * gql es un template literal tag que parsea strings
 * de GraphQL a objetos DocumentNode que Apollo entiende.
 */
import { gql } from "@apollo/client";

/**
 * Query: Obtener todos los productos.
 * Equivalente a GET /api/productos en REST.
 * Solo pedimos los campos que el frontend necesita mostrar.
 */
export const GET_PRODUCTOS = gql`
  query ObtenerProductos {
    productos {
      id
      nombre
      descripcion
      precio
      stock
      categoria
    }
  }
`;

/**
 * Query: Buscar productos por categoria.
 * Usa una variable $categoria que se pasa al ejecutar la query.
 * Equivalente a GET /api/productos?categoria=X en REST.
 */
export const GET_POR_CATEGORIA = gql`
  query ProductosPorCategoria($categoria: String!) {
    productosPorCategoria(categoria: $categoria) {
      id
      nombre
      precio
      stock
      categoria
    }
  }
`;

/**
 * Mutation: Crear un nuevo producto.
 * Equivalente a POST /api/productos en REST.
 * Las variables ($nombre, $precio, etc.) se pasan al ejecutar.
 */
export const CREAR_PRODUCTO = gql`
  mutation CrearProducto(
    $nombre: String!
    $descripcion: String
    $precio: Float!
    $stock: Int!
    $categoria: String
  ) {
    crearProducto(
      nombre: $nombre
      descripcion: $descripcion
      precio: $precio
      stock: $stock
      categoria: $categoria
    ) {
      id
      nombre
      precio
    }
  }
`;

/**
 * Mutation: Actualizar un producto existente.
 * Equivalente a PUT /api/productos/:id en REST.
 * Solo se envian los campos que se quieren modificar.
 */
export const ACTUALIZAR_PRODUCTO = gql`
  mutation ActualizarProducto(
    $id: ID!
    $nombre: String
    $descripcion: String
    $precio: Float
    $stock: Int
    $categoria: String
  ) {
    actualizarProducto(
      id: $id
      nombre: $nombre
      descripcion: $descripcion
      precio: $precio
      stock: $stock
      categoria: $categoria
    ) {
      id
      nombre
      precio
      stock
    }
  }
`;

/**
 * Mutation: Eliminar un producto por ID.
 * Equivalente a DELETE /api/productos/:id en REST.
 * Retorna true si se elimino correctamente.
 */
export const ELIMINAR_PRODUCTO = gql`
  mutation EliminarProducto($id: ID!) {
    eliminarProducto(id: $id)
  }
`;
