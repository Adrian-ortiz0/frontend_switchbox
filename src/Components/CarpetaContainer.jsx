import React, { useEffect, useState } from "react";
import axiosInstance from "../AxiosConfiguration";
import { Menu, MenuItem, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CarpetaEditing } from "./CarpetaEditing";
import { ArchivoEditing } from "./ArchivoEditing";
import { useNavigate } from "react-router";
import { useUser } from "../UserContext";

export const CarpetaContainer = ({ carpetaId }) => {
  const [archivos, setArchivos] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [currentArchivo, setCurrentArchivo] = useState(null);
  const [carpetas, setCarpetas] = useState([]);

  const navigate = useNavigate();

  const {usuario} = useUser();

  const fetchCarpetasInternas = () => {
    axiosInstance
      .get(`/carpetas/carpetaPadre/${carpetaId}`)
      .then((response) => {
        setCarpetas(response.data);
      })
      .catch((error) => {
        console.error("Error fetching folders", error);
      });
  };
  

  const fetchArchivosCarpeta = () => {
    axiosInstance
      .get(`/archivos/carpeta/${carpetaId}`)
      .then((response) => {
        setArchivos(response.data);
      })
      .catch((error) => {
        console.error("Error fetching archivos:", error);
      });
  };

  useEffect(() => {
    if (carpetaId) {
      fetchArchivosCarpeta();
      fetchCarpetasInternas();
    }
  }, [carpetaId]);

  const handleClick = (event, item, type) => {
    setAnchorEl(event.currentTarget);
    setCurrentArchivo({ ...item, type });
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    if (currentArchivo) {
      const endpoint = currentArchivo.type === "file"
        ? `/archivos/${currentArchivo.id}`
        : `/carpetas/usuario/${usuario.id}/${currentArchivo.id}`;
        
        axiosInstance
        .delete(endpoint)
        .then(() => {
          fetchArchivosCarpeta();
          fetchCarpetasInternas();
          handleClose();
        })
        .catch((error) => {
          console.error("Error eliminando elemento:", error.response || error.message);
        });
      
    }
  };


  const handleEdit = () => {
    setIsEditFormOpen(true);
    handleClose();
  };

  const handleEditFormClose = () => {
    setIsEditFormOpen(false);
    fetchArchivosCarpeta();
    fetchCarpetasInternas();
  };

  const handleShare = () => {
    console.log("Compartiendo archivo:", currentArchivo.nombre);
    handleClose();
  };

  return (
    <div className="cloud-container-wrapper">
      {isEditFormOpen && currentArchivo && (
        currentArchivo.type === "file" ? (
          <ArchivoEditing
            archivo={currentArchivo}
            onClose={handleEditFormClose}
            onUpdate={() => {
              fetchArchivosCarpeta();
              fetchCarpetasInternas();
            }}
          />
        ) : (
          <CarpetaEditing
            carpeta={currentArchivo}
            onClose={handleEditFormClose}
            onUpdated={() => {
              fetchCarpetasInternas();
              fetchArchivosCarpeta();
            }}
          />
        )
      )}
      <div className="cloud_container-folders">
        {carpetas.map((carpeta) => (
          <DroppableFolder
            key={carpeta.id}
            carpeta={carpeta}
            onClick={() => navigate(`../carpeta/${carpeta.id}`)}
            handleClick={handleClick}
          />
        ))}
      </div>
      <main className="cloud_container">
        {archivos.map((archivo) => (
          <DraggableArchivo
            key={archivo.id}
            archivo={archivo}
            handleClick={handleClick}
          />
        ))}
        <Menu
          id="file-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl) && currentArchivo?.type === "file"}
          onClose={handleClose}
        >
          <MenuItem onClick={handleShare}>Compartir</MenuItem>
          <MenuItem onClick={handleEdit}>Editar</MenuItem>
          <MenuItem onClick={handleDelete}>Eliminar</MenuItem>
        </Menu>
        <Menu
          id="folder-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl) && currentArchivo?.type === "folder"}
          onClose={handleClose}
        >
          <MenuItem onClick={handleEdit}>Editar</MenuItem>
          <MenuItem onClick={handleDelete}>Eliminar</MenuItem>
        </Menu>
        {archivos.length === 0 && carpetas.length === 0 && (
          <p>No hay elementos para mostrar.</p>
        )}
      </main>
    </div>
  );
};

const DroppableFolder = ({ carpeta, onClick, handleClick }) => {
  return (
    <div key={carpeta.id} className="card folder-card" onDoubleClick={() => onClick()}>
      <div className="cloud_folder-icons">
        <img src="/public/carpeta_icon.png" alt="Carpeta" className="folder-icon" />
        <div>{carpeta.nombre}</div>
        <IconButton
          aria-controls="folder-menu"
          aria-haspopup="true"
          onClick={(event) => handleClick(event, carpeta, "folder")}
        >
          <MoreVertIcon />
        </IconButton>
      </div>
    </div>
  );
};

const DraggableArchivo = ({ archivo, handleClick }) => {
  return (
    <div key={archivo.id} className="card">
      <div className="cloud_folder-icons">
        <img src="/public/files_icon.png" alt="archivo" className="folder-icon" />
        <IconButton
          aria-controls="file-menu"
          aria-haspopup="true"
          onClick={(event) => handleClick(event, archivo, "file")}
        >
          <MoreVertIcon />
        </IconButton>
      </div>
      <div>{archivo.archivo.nombre}</div>
    </div>
  );
};
