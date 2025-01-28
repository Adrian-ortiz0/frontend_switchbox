import React, { useState } from "react";
import { useNavigate } from "react-router";
import { axiosInstanceLogin } from "../AxiosConfiguration";
import { useUser } from "../UserContext"; 

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { actualizarUsuario } = useUser(); 

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axiosInstanceLogin
      .post("login", new URLSearchParams({ email, password })) 
      .then((response) => {
        const { token, user } = response.data;

        console.log(response.data);
        
        localStorage.setItem("authToken", token);
        actualizarUsuario(user); 

        alert("Bienvenido/a!"); 

        navigate(`/storage-menu/${user.id}`);
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          alert("Error: Usuario o contraseña incorrectos.");
        } else {
          console.error("Error de conexión:", error);
          alert("Hubo un problema al intentar conectarse con el servidor.");
        }
      });
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
