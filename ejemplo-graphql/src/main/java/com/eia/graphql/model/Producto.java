package com.eia.graphql.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * Entidad Producto que representa un producto en la tienda.
 * 
 * Se almacena en la coleccion "productos" de MongoDB.
 * Utiliza anotaciones de Lombok para reducir codigo repetitivo:
 * - @Data genera getters, setters, toString, equals y hashCode
 * - @Builder permite construir objetos con el patron Builder
 * - @NoArgsConstructor genera un constructor sin argumentos
 * - @AllArgsConstructor genera un constructor con todos los campos
 * 
 * @author Universidad EIA - Ingenieria de Sistemas
 */
@Document(collection = "productos") // Mapea esta clase a la coleccion "productos" en MongoDB
@Data                               // Lombok: genera getters, setters, toString, equals, hashCode
@Builder                            // Lombok: habilita el patron Builder para crear instancias
@NoArgsConstructor                  // Lombok: genera constructor vacio (requerido por Spring Data)
@AllArgsConstructor                 // Lombok: genera constructor con todos los campos
public class Producto {

    /**
     * Identificador unico del producto.
     * MongoDB lo genera automaticamente como un ObjectId.
     */
    @Id
    private String id;

    /**
     * Nombre del producto.
     * Campo obligatorio en el schema de GraphQL.
     */
    private String nombre;

    /**
     * Descripcion detallada del producto.
     * Campo opcional en el schema de GraphQL.
     */
    private String descripcion;

    /**
     * Precio del producto en pesos colombianos.
     * Campo obligatorio en el schema de GraphQL.
     */
    private Double precio;

    /**
     * Cantidad de unidades disponibles en inventario.
     * Campo obligatorio en el schema de GraphQL.
     */
    private Integer stock;

    /**
     * Categoria a la que pertenece el producto.
     * Ejemplos: "Electronica", "Ropa", "Alimentos".
     * Campo opcional en el schema de GraphQL.
     */
    private String categoria;
}
