import React, { useState, useEffect } from "react";
import "../styles.css";
import axiosInstance from "../AxiosConfiguration";
import { useUser } from "../UserContext"; 

export const CarpetaForm = ({ onClose }) => {
  const { usuario } = useUser();
  const [formData, setFormData] = useState({
    nombre: "",
    carpetaPadre: null,
    subCarpetas: []
  });
  const [carpetas, setCarpetas] = useState([]);

  useEffect(() => {
    axiosInstance.get(`/carpetas/usuario/${usuario.id}`)
      .then((response) => setCarpetas(response.data))
      .catch((error) => console.error("Error al obtener las carpetas:", error));
  }, [usuario.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = () => {

    const nuevaCarpeta = {
      ...formData,
      tamaño: 0,
      usuario: { id: usuario.id },
    };

    axiosInstance.post(`/carpetas?userId=${usuario.id}`, nuevaCarpeta)
      .then((response) => {
        alert("Carpeta creada exitosamente.");
        setFormData({
          nombre: "",
          carpetaPadre: null,
          subCarpetas: []
        });
        onClose();
        setCarpetas((prevCarpetas) => [...prevCarpetas, response.data]);
      })
      .catch((error) => {
        console.error("Error al crear la carpeta:", error.response.data);
        alert("Hubo un error al crear la carpeta: " + error.response.data.message);
      });
  };

  return (
    <div className="carpeta-form-overlay" onClick={onClose}>
      <div className="carpeta-form-container" onClick={(e) => e.stopPropagation()}>
        <h2>Crear Carpeta</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="nombre">Nombre de la carpeta:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
          <div className="carpeta-form-buttons">
            <button type="submit">Crear</button>
            <button type="button" onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};
