import React, { useEffect, useState } from "react";
import axiosInstance from "../AxiosConfiguration";
import { useUser } from "../UserContext";

export const SharedContainer = () => {
  const { usuario } = useUser();
  const [archivosCompartidos, setArchivosCompartidos] = useState([]);

  const fetchArchivosCompartidos = () => {
    if (usuario) {
      axiosInstance
        .get("/compartir/archivos-compartidos", {
          params: { usuarioId: usuario.id },
        })
        .then((response) => {
          setArchivosCompartidos(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Error fetching shared files:", error);
        });
    }
  };

  useEffect(() => {
    fetchArchivosCompartidos();
  }, [usuario]);

  return (
    <div className="cloud-container-wrapper">
      <h2>Archivos Compartidos Conmigo</h2>
      <main className="cloud_container">
        {archivosCompartidos.map((compartido) => (
          <div key={compartido.id} className="card">
            <div className="cloud_folder-icons">
              <img
                src="/public/files_icon.png"
                alt="archivo"
                className="folder-icon"
              />
            </div>
            {compartido.archivo.nombre}
            <label htmlFor="">
              (compartido por {compartido.usuarioOrigen.nombre})
            </label>
          </div>
        ))}
      </main>
    </div>
  );
};
