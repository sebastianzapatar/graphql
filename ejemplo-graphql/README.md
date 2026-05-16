# GraphQL + MongoDB + Java 21 - Universidad EIA

## Requisitos

- Java 21+
- Maven 3.9+
- Docker (para MongoDB)

## Levantar MongoDB

```bash
docker compose up -d
```

## Ejecutar la aplicacion

```bash
./mvnw spring-boot:run
```

## Probar la API

Abrir en el navegador: [http://localhost:8080/graphiql](http://localhost:8080/graphiql)

### Queries de ejemplo

```graphql
# Crear un producto
mutation {
  crearProducto(
    nombre: "Laptop HP Pavilion"
    descripcion: "Laptop de alta gama con procesador i7"
    precio: 3500000
    stock: 15
    categoria: "Electronica"
  ) {
    id
    nombre
    precio
  }
}

# Obtener todos los productos
query {
  productos {
    id
    nombre
    precio
    stock
    categoria
  }
}

# Buscar por categoria
query {
  productosPorCategoria(categoria: "Electronica") {
    nombre
    precio
  }
}

# Buscar por rango de precio
query {
  productosPorPrecio(min: 1000, max: 5000000) {
    nombre
    precio
    categoria
  }
}

# Actualizar un producto
mutation {
  actualizarProducto(id: "TU_ID_AQUI", precio: 2999000, stock: 8) {
    id
    nombre
    precio
    stock
  }
}

# Eliminar un producto
mutation {
  eliminarProducto(id: "TU_ID_AQUI")
}
```

## Estructura del Proyecto

```
ejemplo-graphql/
├── pom.xml                           # Dependencias Maven
├── compose.yml                       # MongoDB en Docker
├── src/main/
│   ├── java/com/eia/graphql/
│   │   ├── GraphqlApplication.java   # Clase principal
│   │   ├── model/
│   │   │   └── Producto.java         # Entidad con Lombok
│   │   ├── repository/
│   │   │   └── ProductoRepository.java # Acceso a MongoDB
│   │   ├── service/
│   │   │   └── ProductoService.java  # Logica de negocio
│   │   └── controller/
│   │       └── ProductoController.java # Controlador GraphQL
│   └── resources/
│       ├── application.yml           # Configuracion
│       └── graphql/
│           └── schema.graphqls       # Schema de GraphQL
```
