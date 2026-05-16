package com.eia.graphql.repository;

import com.eia.graphql.model.Producto;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repositorio de acceso a datos para la entidad Producto.
 * 
 * Extiende MongoRepository que proporciona operaciones CRUD
 * basicas sin necesidad de implementacion manual:
 * - save(), findById(), findAll(), deleteById(), etc.
 * 
 * Los metodos personalizados siguen la convencion de nombres
 * de Spring Data, que genera las consultas automaticamente
 * a partir del nombre del metodo.
 * 
 * @author Universidad EIA - Ingenieria de Sistemas
 */
@Repository // Marca esta interfaz como un componente de acceso a datos
public interface ProductoRepository extends MongoRepository<Producto, String> {

    /**
     * Busca productos por su categoria.
     * Spring Data genera automaticamente la consulta MongoDB:
     * { "categoria": categoria }
     * 
     * @param categoria la categoria a buscar
     * @return lista de productos que pertenecen a esa categoria
     */
    List<Producto> findByCategoria(String categoria);

    /**
     * Busca productos cuyo precio este entre un minimo y un maximo.
     * Spring Data genera automaticamente la consulta MongoDB:
     * { "precio": { "$gte": min, "$lte": max } }
     * 
     * @param min precio minimo (inclusive)
     * @param max precio maximo (inclusive)
     * @return lista de productos dentro del rango de precio
     */
    List<Producto> findByPrecioBetween(Double min, Double max);
}
