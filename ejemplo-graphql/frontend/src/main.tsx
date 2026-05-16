/**
 * Punto de entrada de la aplicacion React.
 *
 * Envuelve la aplicacion con ApolloProvider para que
 * todos los componentes hijos tengan acceso al cliente
 * Apollo y puedan usar hooks como useQuery y useMutation.
 *
 * ApolloProvider funciona similar al Context de React:
 * provee el cliente Apollo a todo el arbol de componentes.
 */
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ApolloProvider } from "@apollo/client/react";
import client from "./apollo-client";
import App from "./App";
import "./index.css";

// Montar la app en el elemento #root del HTML
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* ApolloProvider inyecta el cliente GraphQL en toda la app */}
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </StrictMode>
);
