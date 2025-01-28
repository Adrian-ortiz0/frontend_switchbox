import React, { useEffect, useState } from "react";
import "../styles.css";
import { useUser } from "../UserContext";
import { axiosInstance } from "../AxiosConfiguration";

export const CarpetaEditing = ({ carpeta, onClose, onUpdated }) => {
  const [nombre, setNombre] = useState("");

  const {usuario} = useUser();

  useEffect(() => {
    if (carpeta) {
      setNombre(carpeta.nombre);
    }
  }, [carpeta]);

  const handleSubmit = (e) => {
    e.preventDefault();

    axiosInstance
      .put(`/carpetas/${carpeta.id}`, {
        nombre,
      })
      .then(() => {
        alert("Carpeta actualizada exitosamente.");
        onUpdated();
        onClose();
      })
      .catch((error) => {
        console.error("Error al actualizar la carpeta:", error.response?.data);
        alert(
          "Hubo un error al actualizar la carpeta: " +
            (error.response?.data?.message || "Error desconocido")
        );
      });
  };

  return (
    <div className="carpeta-form-overlay" onClick={onClose}>
      <div
        className="carpeta-form-container"
        onClick={(e) => e.stopPropagation()}
      >
        <h2>Nuevo nombre</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
          <div className="carpeta-form-buttons">
            <button type="submit">Guardar</button>
            <button type="button" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
