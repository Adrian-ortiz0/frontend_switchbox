import React, { useEffect, useState } from 'react';
import { axiosInstance } from "../AxiosConfiguration";

export const ArchivoEditing = ({ archivo, onClose, onUpdate }) => {
  const [nombre, setNombre] = useState('');

  useEffect(() => {
    if (archivo) {
      setNombre(archivo.nombre);
    }
  }, [archivo]);

  const handleNombreChange = (event) => {
    setNombre(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (archivo && nombre) {
      axiosInstance.put(`/archivos/${archivo.id}`, { nombre })
        .then((response) => {
          console.log('Nombre del archivo actualizado con éxito', response.data);
          onUpdate();  
          onClose();
        })
        .catch((error) => {
          console.error('Error al actualizar el nombre del archivo', error);
        });
    }
  };

  return (
    <div className="carpeta-form-overlay" onClick={onClose}>
      <div className="carpeta-form-container" onClick={(e) => e.stopPropagation()}>
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
