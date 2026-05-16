/**
 * Configuracion del cliente Apollo para GraphQL.
 *
 * Apollo Client es la libreria mas popular para consumir
 * APIs GraphQL desde aplicaciones React. Maneja:
 * - Cache automatico de queries
 * - Estado de carga y errores
 * - Refetch y polling
 *
 * La URI apunta al backend de Spring Boot.
 * En desarrollo local: http://localhost:8080/graphql
 * En Docker: http://backend:8080/graphql (via variable de entorno)
 */
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

// Crear el enlace HTTP al servidor GraphQL
// VITE_GRAPHQL_URL se define en .env o en Docker
const httpLink = createHttpLink({
  uri: import.meta.env.VITE_GRAPHQL_URL || "http://localhost:8080/graphql",
});

// Crear y exportar el cliente Apollo
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(), // Cache en memoria para evitar peticiones duplicadas
});

export default client;
