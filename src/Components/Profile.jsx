import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { axiosInstance } from "../AxiosConfiguration";
import { useUser } from "../UserContext";

export const Profile = () => {
  const { usuario } = useUser();
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: ""
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const response = await axiosInstance.get(`/usuarios/${usuario.id}`);
        const { nombre, apellido, email, password } = response.data;
        setFormData({ nombre, apellido, email, password });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUsuario();
  }, [usuario]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedData = { ...formData };
      await axiosInstance.put(`/usuarios/${usuario.id}`, updatedData);
      alert("Perfil actualizado con éxito");
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
      alert("Fallo al actualizar el perfil");
    }
  };

  return (
    <main className="profile_main">
      <div className="profile">
        <main className="profile_container">
          <h2>Mi Perfil</h2>
          <form className="profile_details" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="nombre">Nombre:</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="apellido">Apellido:</label>
                <input
                  type="text"
                  id="apellido"
                  name="apellido"
                  value={formData.apellido}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">Correo electrónico:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Contraseña:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>

            <div className="profile_actions">
              <button type="button" onClick={() => navigate(`/storage-menu/${usuario.id}`)}>
                Salir
              </button>
              <button type="submit">Guardar</button>
            </div>
          </form>
        </main>
      </div>
    </main>
  );
};
