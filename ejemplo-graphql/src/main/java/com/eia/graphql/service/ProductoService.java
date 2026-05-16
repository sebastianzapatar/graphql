package com.eia.graphql.service;

import com.eia.graphql.model.Producto;
import com.eia.graphql.repository.ProductoRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * Servicio de logica de negocio para la entidad Producto.
 * 
 * Contiene toda la logica de negocio relacionada con productos.
 * Actua como capa intermedia entre el controlador GraphQL
 * y el repositorio de MongoDB.
 * 
 * Usa @RequiredArgsConstructor de Lombok para inyeccion
 * de dependencias por constructor (buena practica).
 * 
 * @author Universidad EIA - Ingenieria de Sistemas
 */
@Service                    // Marca esta clase como un servicio de Spring
@RequiredArgsConstructor    // Lombok: genera constructor con campos final (inyeccion)
@Slf4j                      // Lombok: genera un logger automatico (log.info, log.error)
public class ProductoService {

    // Repositorio inyectado automaticamente por Spring (final = requerido)
    private final ProductoRepository repositorio;

    /**
     * Obtiene todos los productos almacenados en MongoDB.
     * 
     * @return lista completa de productos
     */
    public List<Producto> obtenerTodos() {
        log.info("Obteniendo todos los productos de la base de datos");
        return repositorio.findAll();
    }

    /**
     * Busca un producto por su identificador unico.
     * 
     * @param id el ID del producto a buscar
     * @return Optional con el producto si existe, vacio si no
     */
    public Optional<Producto> obtenerPorId(String id) {
        log.info("Buscando producto con ID: {}", id);
        return repositorio.findById(id);
    }

    /**
     * Busca productos que pertenezcan a una categoria especifica.
     * 
     * @param categoria la categoria a filtrar
     * @return lista de productos de esa categoria
     */
    public List<Producto> obtenerPorCategoria(String categoria) {
        log.info("Buscando productos por categoria: {}", categoria);
        return repositorio.findByCategoria(categoria);
    }

    /**
     * Busca productos cuyo precio este dentro de un rango.
     * 
     * @param min precio minimo (inclusive)
     * @param max precio maximo (inclusive)
     * @return lista de productos dentro del rango de precio
     */
    public List<Producto> obtenerPorRangoPrecio(Double min, Double max) {
        log.info("Buscando productos con precio entre {} y {}", min, max);
        return repositorio.findByPrecioBetween(min, max);
    }

    /**
     * Crea un nuevo producto y lo almacena en MongoDB.
     * Usa el patron Builder de Lombok para construir el objeto.
     * 
     * @param nombre      nombre del producto
     * @param descripcion descripcion del producto
     * @param precio      precio del producto
     * @param stock       cantidad en inventario
     * @param categoria   categoria del producto
     * @return el producto creado con su ID generado por MongoDB
     */
    public Producto crear(String nombre, String descripcion,
                          Double precio, Integer stock, String categoria) {
        log.info("Creando nuevo producto: {}", nombre);

        // Construir el producto usando el patron Builder de Lombok
        Producto producto = Producto.builder()
                .nombre(nombre)
                .descripcion(descripcion)
                .precio(precio)
                .stock(stock)
                .categoria(categoria)
                .build();

        // Guardar en MongoDB y retornar con el ID generado
        Producto guardado = repositorio.save(producto);
        log.info("Producto creado exitosamente con ID: {}", guardado.getId());
        return guardado;
    }

    /**
     * Actualiza un producto existente en MongoDB.
     * Solo actualiza los campos que no sean null.
     * 
     * @param id          ID del producto a actualizar
     * @param nombre      nuevo nombre (null para no cambiar)
     * @param descripcion nueva descripcion (null para no cambiar)
     * @param precio      nuevo precio (null para no cambiar)
     * @param stock       nuevo stock (null para no cambiar)
     * @param categoria   nueva categoria (null para no cambiar)
     * @return Optional con el producto actualizado, vacio si no existe
     */
    public Optional<Producto> actualizar(String id, String nombre,
                                          String descripcion, Double precio,
                                          Integer stock, String categoria) {
        log.info("Actualizando producto con ID: {}", id);

        // Buscar el producto existente
        return repositorio.findById(id).map(producto -> {
            // Actualizar solo los campos que no sean null
            if (nombre != null) producto.setNombre(nombre);
            if (descripcion != null) producto.setDescripcion(descripcion);
            if (precio != null) producto.setPrecio(precio);
            if (stock != null) producto.setStock(stock);
            if (categoria != null) producto.setCategoria(categoria);

            // Guardar los cambios en MongoDB
            Producto actualizado = repositorio.save(producto);
            log.info("Producto actualizado exitosamente: {}", actualizado.getId());
            return actualizado;
        });
    }

    /**
     * Elimina un producto de MongoDB por su ID.
     * 
     * @param id el ID del producto a eliminar
     * @return true si el producto existia y fue eliminado, false si no existia
     */
    public boolean eliminar(String id) {
        log.info("Eliminando producto con ID: {}", id);

        // Verificar si el producto existe antes de eliminar
        if (repositorio.existsById(id)) {
            repositorio.deleteById(id);
            log.info("Producto eliminado exitosamente");
            return true;
        }

        // El producto no existe
        log.warn("No se encontro producto con ID: {}", id);
        return false;
    }
}
