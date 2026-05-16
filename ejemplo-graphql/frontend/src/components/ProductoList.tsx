/**
 * Componente ProductoList: Lista todos los productos desde GraphQL.
 *
 * Utiliza el hook useQuery de Apollo Client para ejecutar
 * la query GET_PRODUCTOS al montar el componente.
 *
 * Apollo maneja automaticamente:
 * - Estado de carga (loading)
 * - Estado de error (error)
 * - Cache de los datos (data)
 * - Re-render cuando los datos cambian
 *
 * Cada producto tiene botones para editar y eliminar.
 * Al eliminar, se ejecuta una mutation y se actualiza la lista.
 */
import { useQuery, useMutation } from "@apollo/client/react";
import { GET_PRODUCTOS, ELIMINAR_PRODUCTO } from "../graphql/operations";
import type { Producto } from "../types/Producto";

export default function ProductoList() {
  /**
   * useQuery: hook de Apollo para ejecutar queries.
   * Se ejecuta automaticamente al montar el componente.
   * Retorna { loading, error, data } con estado reactivo.
   */
  const { loading, error, data } = useQuery<{ productos: Producto[] }>(
    GET_PRODUCTOS
  );

  /**
   * useMutation para eliminar productos.
   * refetchQueries recarga la lista despues de eliminar.
   */
  const [eliminar] = useMutation(ELIMINAR_PRODUCTO, {
    refetchQueries: [{ query: GET_PRODUCTOS }],
  });

  /**
   * Manejador para eliminar un producto.
   * Pide confirmacion antes de ejecutar la mutation.
   */
  const handleDelete = async (id: string, nombre: string) => {
    if (!confirm(`Eliminar "${nombre}"?`)) return;
    try {
      await eliminar({ variables: { id } });
    } catch (err) {
      console.error("Error al eliminar:", err);
    }
  };

  /**
   * Formateador de precio en pesos colombianos.
   * Convierte 3500000 -> $3,500,000
   */
  const formatPrice = (precio: number) =>
    new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
    }).format(precio);

  // Estado de carga: mostrar skeleton
  if (loading) {
    return (
      <div className="loading-state">
        <div className="spinner" />
        <p>Cargando productos...</p>
      </div>
    );
  }

  // Estado de error: mostrar mensaje
  if (error) {
    return (
      <div className="error-state">
        <p>Error al cargar productos</p>
        <p className="error-detail">{error.message}</p>
      </div>
    );
  }

  // Lista vacia
  const productos = data?.productos ?? [];
  if (productos.length === 0) {
    return (
      <div className="empty-state">
        <p>No hay productos aun. Crea el primero!</p>
      </div>
    );
  }

  // Renderizar la lista de productos como tarjetas
  return (
    <div className="producto-grid">
      {productos.map((p) => (
        <div key={p.id} className="producto-card">
          {/* Header con categoria como badge */}
          {p.categoria && <span className="card-badge">{p.categoria}</span>}

          {/* Nombre del producto */}
          <h4>{p.nombre}</h4>

          {/* Descripcion (si existe) */}
          {p.descripcion && <p className="card-desc">{p.descripcion}</p>}

          {/* Precio y stock */}
          <div className="card-meta">
            <span className="card-price">{formatPrice(p.precio)}</span>
            <span className="card-stock">Stock: {p.stock}</span>
          </div>

          {/* Acciones */}
          <div className="card-actions">
            <button
              onClick={() => handleDelete(p.id, p.nombre)}
              className="btn-danger"
              title="Eliminar producto"
            >
              Eliminar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
