import React, { useEffect, useState } from "react";
import { useUser } from "../UserContext";
import axiosInstance from "../AxiosConfiguration";
import { CarpetaForm } from "./CarpetaForm";
import { Menu, MenuItem, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export const CloudContainer = () => {
  const { usuario } = useUser();
  const [archivos, setArchivos] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentArchivo, setCurrentArchivo] = useState(null);

  // Fetch carpetas
  const fetchArchivosUsuario = () => {
    axiosInstance
      .get(`/carpetas/usuario/${usuario.id}`)
      .then((response) => {
        setArchivos(response.data);
      })
      .catch((error) => {
        console.error("Error fetching carpetas:", error);
      });
  };

  useEffect(() => {
    if (usuario) {
      fetchArchivosUsuario();
    }
  }, [usuario]);

  // Cerrar formulario
  const handleFormClose = () => {
    setIsFormOpen(false);
    fetchArchivosUsuario();
  };

  // Abrir menú
  const handleClick = (event, archivo) => {
    setAnchorEl(event.currentTarget);
    setCurrentArchivo(archivo);
  };

  // Cerrar menú
  const handleClose = () => {
    setAnchorEl(null);
    setCurrentArchivo(null);
  };

  // Eliminar carpeta
  const handleDelete = () => {
    if (currentArchivo) {
      axiosInstance
        .delete(`/carpetas/usuario/${usuario.id}/${currentArchivo.id}`)
        .then(() => {
          fetchArchivosUsuario();
          handleClose();
        })
        .catch((error) => {
          console.error("Error eliminando carpeta:", error);
        });
    }
  };

  return (
    <div className="cloud-container-wrapper">
      <main className="cloud_container">
        {isFormOpen && <CarpetaForm onClose={handleFormClose} />}
        {archivos.map((archivo) => (
          <div key={archivo.id} className="card">
            <div className="cloud_folder-icons">
              <img
                src="/public/carpeta_icon.png"
                alt=""
                width={20}
                height={20}
              />
              <IconButton
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={(event) => handleClick(event, archivo)}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl) && currentArchivo === archivo}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Editar</MenuItem>
                <MenuItem onClick={handleDelete}>Eliminar</MenuItem>
              </Menu>
            </div>
            {archivo.nombre}
            <p>Files:</p>
          </div>
        ))}
      </main>
    </div>
  );
};
