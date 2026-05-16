/**
 * Componente raiz de la aplicacion React.
 *
 * Estructura:
 * - Header con branding EIA
 * - Seccion de formulario para crear productos
 * - Seccion de lista de productos existentes
 *
 * Este componente no maneja estado GraphQL directamente;
 * delega esa responsabilidad a los componentes hijos
 * (ProductoForm y ProductoList) que usan hooks de Apollo.
 */
import ProductoForm from "./components/ProductoForm";
import ProductoList from "./components/ProductoList";
import "./App.css";

function App() {
  return (
    <div className="app">
      {/* Header principal con branding Universidad EIA */}
      <header className="app-header">
        <div className="header-content">
          <h1>GraphQL + React</h1>
          <p className="header-subtitle">
            CRUD de Productos &bull; Spring Boot + MongoDB + Apollo Client
          </p>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="app-main">
        {/* Formulario para crear productos (usa useMutation) */}
        <section className="section-form">
          <ProductoForm />
        </section>

        {/* Lista de productos existentes (usa useQuery) */}
        <section className="section-list">
          <h3>Productos</h3>
          <ProductoList />
        </section>
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p>Universidad EIA &bull; Ingenieria de Sistemas &bull; GraphQL vs REST</p>
      </footer>
    </div>
  );
}

export default App;
