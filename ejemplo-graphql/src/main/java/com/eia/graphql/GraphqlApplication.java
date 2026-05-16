package com.eia.graphql;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Clase principal de la aplicacion GraphQL con Spring Boot.
 * 
 * Esta clase inicia el contexto de Spring Boot y configura
 * automaticamente todos los componentes necesarios:
 * - Servidor web embebido (Tomcat)
 * - Motor de GraphQL (Spring for GraphQL)
 * - Conexion a MongoDB (Spring Data MongoDB)
 * - Interfaz GraphiQL para pruebas
 * 
 * @author Universidad EIA - Ingenieria de Sistemas
 */
@SpringBootApplication // Habilita auto-configuracion de Spring Boot
public class GraphqlApplication {

    /**
     * Punto de entrada de la aplicacion.
     * Inicia el servidor en el puerto configurado (8080).
     * 
     * @param args argumentos de linea de comandos
     */
    public static void main(String[] args) {
        SpringApplication.run(GraphqlApplication.class, args);
    }
}
