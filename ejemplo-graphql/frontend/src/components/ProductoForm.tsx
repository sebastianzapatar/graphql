/**
 * Componente ProductoForm: Formulario para crear nuevos productos.
 *
 * Utiliza el hook useMutation de Apollo Client para ejecutar
 * la mutation CREAR_PRODUCTO cuando el usuario envia el formulario.
 *
 * Flujo:
 * 1. El usuario llena los campos del formulario
 * 2. Al hacer submit, se ejecuta la mutation GraphQL
 * 3. Al completarse, se llama refetchQueries para actualizar la lista
 * 4. El formulario se limpia automaticamente
 *
 * Props:
 * - onCreated: callback que se ejecuta al crear exitosamente
 */
import { useState, type FormEvent } from "react";
import { useMutation } from "@apollo/client/react";
import { CREAR_PRODUCTO, GET_PRODUCTOS } from "../graphql/operations";
import type { ProductoInput } from "../types/Producto";

interface Props {
  onCreated?: () => void; // Callback opcional al crear producto
}

export default function ProductoForm({ onCreated }: Props) {
  // Estado local del formulario - cada campo tiene su useState
  const [form, setForm] = useState<ProductoInput>({
    nombre: "",
    descripcion: "",
    precio: 0,
    stock: 0,
    categoria: "",
  });

  /**
   * useMutation: hook de Apollo para ejecutar mutations.
   * Retorna una tupla [funcionMutation, { loading, error }]
   *
   * refetchQueries: despues de crear, recargar la lista de productos
   * para que se actualice automaticamente en la UI.
   */
  const [crearProducto, { loading, error }] = useMutation(CREAR_PRODUCTO, {
    refetchQueries: [{ query: GET_PRODUCTOS }], // Recargar lista al crear
  });

  /**
   * Manejador del envio del formulario.
   * Previene el comportamiento por defecto y ejecuta la mutation.
   */
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault(); // Evitar recarga de la pagina
    try {
      // Ejecutar la mutation con las variables del formulario
      await crearProducto({ variables: form });
      // Limpiar formulario despues de crear
      setForm({ nombre: "", descripcion: "", precio: 0, stock: 0, categoria: "" });
      // Notificar al componente padre
      onCreated?.();
    } catch (err) {
      console.error("Error al crear producto:", err);
    }
  };

  /**
   * Manejador generico para cambios en los inputs.
   * Actualiza el campo correspondiente en el estado del formulario.
   * Convierte automaticamente los campos numericos.
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      // Si el input es numerico, convertir a number; si no, dejar como string
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="producto-form">
      <h3>Crear Producto</h3>

      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="nombre">Nombre *</label>
          <input
            id="nombre"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            placeholder="Ej: Laptop HP"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="categoria">Categoria</label>
          <input
            id="categoria"
            name="categoria"
            value={form.categoria}
            onChange={handleChange}
            placeholder="Ej: Electronica"
          />
        </div>

        <div className="form-group">
          <label htmlFor="precio">Precio *</label>
          <input
            id="precio"
            name="precio"
            type="number"
            value={form.precio}
            onChange={handleChange}
            min={0}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="stock">Stock *</label>
          <input
            id="stock"
            name="stock"
            type="number"
            value={form.stock}
            onChange={handleChange}
            min={0}
            required
          />
        </div>

        <div className="form-group full-width">
          <label htmlFor="descripcion">Descripcion</label>
          <input
            id="descripcion"
            name="descripcion"
            value={form.descripcion}
            onChange={handleChange}
            placeholder="Descripcion del producto"
          />
        </div>
      </div>

      {/* Mostrar error si la mutation falla */}
      {error && <p className="error-msg">Error: {error.message}</p>}

      <button type="submit" disabled={loading} className="btn-primary">
        {loading ? "Creando..." : "Crear Producto"}
      </button>
    </form>
  );
}
