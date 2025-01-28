import React, { useEffect, useState } from "react";
import { axiosInstance } from "../AxiosConfiguration";
import { useNavigate } from "react-router";

export const SignInForm = () => {
  const [cuentas, setCuentas] = useState([]);
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    espacioUsado: 0,
    cuenta: {
      id: "",  
    },
    repeatPassword: "",
    archivos: [],
  });

  const navigate = useNavigate();

  const fetchCuentas = () => {
    axiosInstance
      .get("/cuentas")
      .then((response) => {
        setCuentas(response.data);
        console.log("Cuentas obtenidas:", response.data); 
      })
      .catch((error) => {
        console.error("Error fetching cuentas", error);
      });
  };
  

  useEffect(() => {
    fetchCuentas();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    if (name === "cuenta") {
      setFormData({
        ...formData,
        cuenta: { id: value },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
  
    console.log("formData:", formData); 
  
    if (formData.password !== formData.repeatPassword) {
      console.log("Las contraseñas no coinciden.");
      return;
    }
  
    if (!formData.nombre || !formData.apellido || !formData.email || !formData.password || !formData.cuenta.id) {
      alert("Por favor llene todos los campos")
      return;
    }
  
    const cuentaSeleccionada = cuentas.find(cuenta => cuenta.id === parseInt(formData.cuenta.id));
  
    if (!cuentaSeleccionada) {
      console.log("Cuenta seleccionada no válida.");
      return;
    }
  
    const { repeatPassword, ...dataToSend } = formData;
    
    const usuario = {
      ...dataToSend,
      cuenta: cuentaSeleccionada,
      archivos: [],
    };
  
    axiosInstance
      .post("/usuarios", usuario)
      .then((response) => {
        console.log("Usuario creado:", response.data);
        alert("Usuario creado con exito!")
        navigate("/login")
      })
      .catch((error) => {
        console.error("Error al registrar usuario:", error);
        console.log("Error al registrar usuario. Inténtalo nuevamente.");
      });
  };
  

  const convertirBytesAGigas = (bytes) => {
    return (bytes / (1024 * 1024 * 1024)).toFixed(2);
  };

  return (
    <section className="form_container">
      <form className="form" onSubmit={handleSubmit}>
        <h2>Register</h2>
        <div className="form-division">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="nombre">Nombre:</label>
              <input type="text" name="nombre" onChange={handleChange} value={formData.nombre} />
            </div>

            <div className="form-group">
              <label htmlFor="apellido">Apellido:</label>
              <input type="text" name="apellido" onChange={handleChange} value={formData.apellido} />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" name="email" onChange={handleChange} value={formData.email} />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input type="password" name="password" onChange={handleChange} value={formData.password} />
            </div>

            <div className="form-group">
              <label htmlFor="repeatPassword">Repeat Password:</label>
              <input type="password" name="repeatPassword" onChange={handleChange} value={formData.repeatPassword} />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="cuenta">Tipo de cuenta:</label>
            <select name="cuenta" id="cuenta" onChange={handleChange} value={formData.cuenta.id}>
              <option value="">Elige tipo de cuenta</option>
              {cuentas.map((cuenta) => (
                <option value={cuenta.id} key={cuenta.id}>
                  {cuenta.nombre} (Límite de espacio: {convertirBytesAGigas(cuenta.limite_espacio)} GB)
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="buttons-form">
          <form>
            <button onClick={() => navigate("/login")}>Log In</button>
          </form>
          <button type="submit">Register</button>
        </div>
      </form>
    </section>
  );
};
