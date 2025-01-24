import React, { useState } from 'react';
import axiosInstance from '../AxiosConfiguration';

export const ArchivoSharing = ({ archivo, usuarioOrigenId, onClose, onUpdate }) => {
  const [email, setEmail] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (archivo && email) {
      axiosInstance.post(`/compartir/archivo`, null, {
        params: {
          archivoId: archivo.id,
          usuarioOrigenId: usuarioOrigenId,
          emailDestino: email
        }
      })
      .then((response) => {
        console.log('Archivo compartido con éxito', response.data);
        alert("Archivo compartido con exito a " + email)
        onUpdate();  
        onClose();
      })
      .catch((error) => {
        console.error('Error al compartir archivo', error);
      });
    }
  };

  return (
    <div className="carpeta-form-overlay" onClick={onClose}>
      <div className="carpeta-form-container" onClick={(e) => e.stopPropagation()}>
        <h2>Compartir Archivo</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="correo">Correo destinatario:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
          <div className="carpeta-form-buttons">
            <button type="submit">Compartir</button>
            <button type="button" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
