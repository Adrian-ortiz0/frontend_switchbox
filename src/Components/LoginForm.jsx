import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axiosInstance from "../AxiosConfiguration";
import { useUser } from "../UserContext"; 

export const LoginForm = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { actualizarUsuario } = useUser(); 

  const fetchUsuarios = () => {
    axiosInstance
      .get("/usuarios")
      .then((response) => {
        setUsuarios(response.data);
      })
      .catch((error) => {
        console.error("Error fetching usuarios: " + error);
      });
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const usuarioEncontrado = usuarios.find(
      (usuario) =>
        usuario.email.toLowerCase() === email.toLowerCase() &&
        usuario.password === password
    );

    if (usuarioEncontrado) {
      alert(
        "Bienvenido/a: " +
          usuarioEncontrado.nombre +
          " " +
          usuarioEncontrado.apellido
      );
      actualizarUsuario(usuarioEncontrado);

      navigate(`/storage-menu/${usuarioEncontrado.id}`); 
    } else if (email === "" || password === "") {
      alert("Todos los campos deben estar llenos!");
    } else if (!usuarioEncontrado) {
      alert("Usuario no registrado!");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  return (
    <section className="form_container">
      <form className="form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="form-division">
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              name="email"
              value={email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="buttons-form">
          <button type="button" onClick={() => navigate("/sign-in")}>
            Sign In
          </button>
          <button type="submit">Enter</button>
        </div>
      </form>
    </section>
  );
};
