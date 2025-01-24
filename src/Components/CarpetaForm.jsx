import React, { useState, useEffect } from "react";
import "../styles.css";
import axiosInstance from "../AxiosConfiguration";
import { useUser } from "../UserContext"; 

export const CarpetaForm = ({ onClose }) => {
  const { usuario } = useUser();
  const [formData, setFormData] = useState({
    nombre: "",
    carpetaPadre: null, 
  });
  const [carpetas, setCarpetas] = useState([]);

  const [allCarpetas, setAllCarpetas] = useState([]);

  const fetchCarpetas = () => {
    axiosInstance.get(`/carpetas/usuario/${usuario.id}`)
      .then((response) => setCarpetas(response.data))
      .catch((error) => console.error("Error al obtener las carpetas:", error));
  }

  const fetchAllCarpetas = () => {
    axiosInstance.get(`/carpetas/usuario/all-folders/${usuario.id}`).then((response) => {
        setAllCarpetas(response.data)
    }).catch((error) => {
      console.error("error" + error)
    })
  }
  
  useEffect(() => {
    fetchCarpetas();
    fetchAllCarpetas();
  }, [usuario.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = () => {
    if (formData.carpetaPadre) {
      axiosInstance.post(`/carpetas/crearEnCarpeta?nombre=${formData.nombre}&usuarioId=${usuario.id}&carpetaPadreId=${formData.carpetaPadre}`)
        .then((response) => {
          alert("Subcarpeta creada exitosamente.");
          setFormData({ nombre: "", carpetaPadre: null });
          onClose();
          setCarpetas((prevCarpetas) => [...prevCarpetas, response.data]);
        })
        .catch((error) => {
          console.error("Error al crear subcarpeta:", error.response?.data);
          alert("Hubo un error al crear la subcarpeta: " + (error.response?.data?.message || error.message));
        });
    } else {
      axiosInstance.post(`/carpetas?userId=${usuario.id}`, {
        nombre: formData.nombre,
        tamaño: 0,
        usuario: { id: usuario.id },
      })
        .then((response) => {
          alert("Carpeta creada exitosamente.");
          setFormData({ nombre: "", carpetaPadre: null });
          onClose();
          setCarpetas((prevCarpetas) => [...prevCarpetas, response.data]);
        })
        .catch((error) => {
          console.error("Error al crear la carpeta:", error.response?.data);
          alert("Hubo un error al crear la carpeta: " + (error.response?.data?.message || error.message));
        });
    }
  };

  return (
    <div className="carpeta-form-overlay" onClick={onClose}>
      <div className="carpeta-form-container" onClick={(e) => e.stopPropagation()}>
        <h2>Crear Carpeta</h2>
        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
          <label htmlFor="nombre">Nombre de la carpeta:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
          
          <label htmlFor="carpetaPadre">Selecciona una Carpeta Padre (opcional):</label>
          <select
            id="carpetaPadre"
            name="carpetaPadre"
            className="selectFolders"
            value={formData.carpetaPadre || ""}
            onChange={handleChange}
          >
            <option value="">Sin Carpeta Padre</option>
            {allCarpetas.map(carpeta => (
              <option key={carpeta.id} value={carpeta.id}>{carpeta.nombre}</option>
            ))}
          </select>

          <div className="carpeta-form-buttons">
            <button type="submit">Crear</button>
            <button type="button" onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};
