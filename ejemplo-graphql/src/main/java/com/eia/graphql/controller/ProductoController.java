package com.eia.graphql.controller;

import com.eia.graphql.model.Producto;
import com.eia.graphql.service.ProductoService;
import lombok.RequiredArgsConstructor;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.util.List;

/**
 * Controlador de GraphQL para la entidad Producto.
 * 
 * Esta clase mapea las operaciones definidas en el schema GraphQL
 * (schema.graphqls) a metodos Java que ejecutan la logica de negocio.
 * 
 * Anotaciones clave:
 * - @QueryMapping: mapea un metodo a una query de GraphQL (lectura)
 * - @MutationMapping: mapea un metodo a una mutation de GraphQL (escritura)
 * - @Argument: inyecta un argumento enviado en la query/mutation
 * 
 * IMPORTANTE: Los nombres de los metodos deben coincidir exactamente
 * con los nombres definidos en el schema GraphQL.
 * 
 * @author Universidad EIA - Ingenieria de Sistemas
 */
@Controller              // Marca como controlador de Spring (requerido por Spring GraphQL)
@RequiredArgsConstructor // Lombok: inyeccion de dependencias por constructor
public class ProductoController {

    // Servicio de logica de negocio inyectado por constructor
    private final ProductoService servicio;

    // ============================================================
    // QUERIES (operaciones de lectura - equivalente a GET en REST)
    // ============================================================

    /**
     * Obtiene todos los productos.
     * Corresponde a la query "productos" del schema GraphQL.
     * 
     * Ejemplo de uso en GraphiQL:
     * query {
     *   productos {
     *     id
     *     nombre
     *     precio
     *   }
     * }
     * 
     * @return lista de todos los productos
     */
    @QueryMapping // Mapea a: type Query { productos: [Producto!]! }
    public List<Producto> productos() {
        return servicio.obtenerTodos();
    }

    /**
     * Busca un producto por su ID.
     * Corresponde a la query "productoPorId" del schema GraphQL.
     * 
     * Ejemplo de uso en GraphiQL:
     * query {
     *   productoPorId(id: "abc123") {
     *     nombre
     *     precio
     *     stock
     *   }
     * }
     * 
     * @param id el ID del producto a buscar
     * @return el producto encontrado o null si no existe
     */
    @QueryMapping // Mapea a: type Query { productoPorId(id: ID!): Producto }
    public Producto productoPorId(@Argument String id) {
        return servicio.obtenerPorId(id).orElse(null);
    }

    /**
     * Busca productos por categoria.
     * Corresponde a la query "productosPorCategoria" del schema.
     * 
     * Ejemplo de uso en GraphiQL:
     * query {
     *   productosPorCategoria(categoria: "Electronica") {
     *     nombre
     *     precio
     *   }
     * }
     * 
     * @param categoria la categoria a filtrar
     * @return lista de productos de esa categoria
     */
    @QueryMapping // Mapea a: type Query { productosPorCategoria(categoria: String!): [Producto!]! }
    public List<Producto> productosPorCategoria(@Argument String categoria) {
        return servicio.obtenerPorCategoria(categoria);
    }

    /**
     * Busca productos por rango de precio.
     * Corresponde a la query "productosPorPrecio" del schema.
     * 
     * Ejemplo de uso en GraphiQL:
     * query {
     *   productosPorPrecio(min: 10000, max: 50000) {
     *     nombre
     *     precio
     *     categoria
     *   }
     * }
     * 
     * @param min precio minimo (inclusive)
     * @param max precio maximo (inclusive)
     * @return lista de productos en ese rango de precio
     */
    @QueryMapping // Mapea a: type Query { productosPorPrecio(min: Float!, max: Float!): [Producto!]! }
    public List<Producto> productosPorPrecio(@Argument Double min, @Argument Double max) {
        return servicio.obtenerPorRangoPrecio(min, max);
    }

    // ============================================================
    // MUTATIONS (operaciones de escritura - equivalente a POST/PUT/DELETE)
    // ============================================================

    /**
     * Crea un nuevo producto en la base de datos.
     * Corresponde a la mutation "crearProducto" del schema.
     * 
     * Ejemplo de uso en GraphiQL:
     * mutation {
     *   crearProducto(
     *     nombre: "Laptop HP"
     *     descripcion: "Laptop de alta gama"
     *     precio: 3500000
     *     stock: 10
     *     categoria: "Electronica"
     *   ) {
     *     id
     *     nombre
     *   }
     * }
     * 
     * @param nombre      nombre del producto
     * @param descripcion descripcion del producto
     * @param precio      precio del producto
     * @param stock       cantidad en inventario
     * @param categoria   categoria del producto
     * @return el producto creado con su ID generado
     */
    @MutationMapping // Mapea a: type Mutation { crearProducto(...): Producto! }
    public Producto crearProducto(
            @Argument String nombre,
            @Argument String descripcion,
            @Argument Double precio,
            @Argument Integer stock,
            @Argument String categoria) {
        return servicio.crear(nombre, descripcion, precio, stock, categoria);
    }

    /**
     * Actualiza un producto existente.
     * Solo los campos enviados (no null) seran actualizados.
     * Corresponde a la mutation "actualizarProducto" del schema.
     * 
     * Ejemplo de uso en GraphiQL:
     * mutation {
     *   actualizarProducto(id: "abc123", precio: 2999000, stock: 5) {
     *     id
     *     nombre
     *     precio
     *     stock
     *   }
     * }
     * 
     * @param id          ID del producto a actualizar
     * @param nombre      nuevo nombre (opcional)
     * @param descripcion nueva descripcion (opcional)
     * @param precio      nuevo precio (opcional)
     * @param stock       nuevo stock (opcional)
     * @param categoria   nueva categoria (opcional)
     * @return el producto actualizado o null si no existe
     */
    @MutationMapping // Mapea a: type Mutation { actualizarProducto(...): Producto }
    public Producto actualizarProducto(
            @Argument String id,
            @Argument String nombre,
            @Argument String descripcion,
            @Argument Double precio,
            @Argument Integer stock,
            @Argument String categoria) {
        return servicio.actualizar(id, nombre, descripcion, precio, stock, categoria)
                .orElse(null);
    }

    /**
     * Elimina un producto por su ID.
     * Corresponde a la mutation "eliminarProducto" del schema.
     * 
     * Ejemplo de uso en GraphiQL:
     * mutation {
     *   eliminarProducto(id: "abc123")
     * }
     * 
     * @param id el ID del producto a eliminar
     * @return true si fue eliminado, false si no existia
     */
    @MutationMapping // Mapea a: type Mutation { eliminarProducto(id: ID!): Boolean! }
    public boolean eliminarProducto(@Argument String id) {
        return servicio.eliminar(id);
    }
}
