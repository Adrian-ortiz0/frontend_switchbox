import React, { useEffect, useState } from 'react';
import axiosInstance from '../AxiosConfiguration';
import { Menu, MenuItem, IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { CarpetaEditing } from './CarpetaEditing';
import { ArchivoEditing } from './ArchivoEditing';

export const CarpetaContainer = ({ carpetaId }) => {
  const [archivos, setArchivos] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [currentArchivo, setCurrentArchivo] = useState(null);

  const fetchArchivosCarpeta = () => {
    axiosInstance.get(`/archivos/carpeta/${carpetaId}`)
      .then(response => {
        setArchivos(response.data);
      })
      .catch(error => {
        console.error("Error fetching archivos:", error);
      });
  };

  useEffect(() => {
    if (carpetaId) {
      fetchArchivosCarpeta();
    }
  }, [carpetaId]);

  const handleClick = (event, archivo) => {
    setAnchorEl(event.currentTarget);
    setCurrentArchivo(archivo);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    if (currentArchivo) {
      axiosInstance
        .delete(`/archivos/${currentArchivo.archivo.id}`)
        .then(() => {
          fetchArchivosCarpeta();
          handleClose();
        })
        .catch((error) => {
          console.error("Error eliminando archivo:", error);
        });
    }
  };

  const handleDownload = () => {
    console.log("Descargando archivo:", currentArchivo.archivo);
    handleClose();
  };

  const handleEdit = () => {
    setIsEditFormOpen(true);
    handleClose();
  };

  const handleEditFormClose = () => {
    setIsEditFormOpen(false);
    fetchArchivosCarpeta();
  };

  const handleShare = () => {
    console.log("Compartiendo archivo:", currentArchivo.archivo);
    handleClose();
  };

  return (
    <div className="cloud-container-wrapper">
      {isEditFormOpen && currentArchivo && (
        <ArchivoEditing
          archivo={currentArchivo.archivo}
          onClose={handleEditFormClose}
          onUpdate={() => {
            fetchArchivosCarpeta();
          }}
        />
      )}
      <main className="cloud_container">
        {archivos.map(archivo => (
          <div key={archivo.id} className='card'>
            <div className="cloud_folder-icons">
              <img
                src="/public/files_icon.png"
                alt="archivo"
                className="folder-icon"
              />
              <IconButton
                aria-controls="file-menu"
                aria-haspopup="true"
                onClick={(event) => handleClick(event, archivo)}
              >
                <MoreVertIcon />
              </IconButton>
            </div>
            <div>{archivo.archivo.nombre}</div>
          </div>
        ))}
        <Menu
          id="file-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleDownload}>Descargar</MenuItem>
          <MenuItem onClick={handleShare}>Compartir</MenuItem>
          <MenuItem onClick={handleEdit}>Editar</MenuItem>
          <MenuItem onClick={handleDelete}>Eliminar</MenuItem>
        </Menu>
      </main>
    </div>
  );
};
