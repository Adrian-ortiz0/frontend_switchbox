import React, { useState } from "react";
import { Menu, MenuItem, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import axiosInstance from "../AxiosConfiguration";
import { ArchivoSharing } from "./ArchivoSharing";
import { ArchivoEditing } from "./ArchivoEditing";
import { useUser } from "../UserContext";

export const FavoritesContainer = ({ archivos, onUpdate }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentItem, setCurrentItem] = useState(null);
  const [isShareArchivoFormOpen, setIsShareArchivoFormOpen] = useState(false);
  const [isEditArchivoFormOpen, setIsEditArchivoFormOpen] = useState(false);

  const {usuario} = useUser();

  const handleClick = (event, item, type) => {
    setAnchorEl(event.currentTarget);
    setCurrentItem({ ...item, type });
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleShare = () => {
    setIsShareArchivoFormOpen(true);
    handleClose();
  };

  const handleEdit = () => {
    setIsEditArchivoFormOpen(true);
    handleClose();
  };

  const handleDelete = () => {
    axiosInstance
      .put(`/archivos/unmarkFavorito/${currentItem.id}`)
      .then(() => {
        alert("Se ha eliminado de favoritos!");
        onUpdate();
      })
      .catch((error) => {
        console.error("Error al eliminar de favoritos:", error);
      });
    handleClose();
  };

  const handleShareClose = () => {
    setIsShareArchivoFormOpen(false);
    onUpdate();
  };

  const handleEditClose = () => {
    setIsEditArchivoFormOpen(false);
    onUpdate();
  };

  return (
    <div className="cloud-container-wrapper">
      {isShareArchivoFormOpen && currentItem && (
          <ArchivoSharing
            archivo={currentItem}
            usuarioOrigenId={usuario.id} 
            onClose={handleShareClose}
          />
        )}

        {isEditArchivoFormOpen && currentItem && (
          <ArchivoEditing
            archivo={currentItem}
            onClose={handleEditClose}
          />
        )}
      <main className="cloud_container">
        {archivos.map((archivo) => (
          <div key={archivo.id} className="card">
            <div className="cloud_folder-icons">
              <img
                src="/public/files_icon.png"
                alt="Archivo"
                className="folder-icon"
              />
              <IconButton
                aria-controls="file-menu"
                aria-haspopup="true"
                onClick={(event) => handleClick(event, archivo, "file")}
              >
                <MoreVertIcon />
              </IconButton>
            </div>
            <div>{archivo.nombre}</div>
          </div>
        ))}

        <Menu
          id="file-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl) && currentItem?.type === "file"}
          onClose={handleClose}
        >
          <MenuItem onClick={handleShare}>Compartir</MenuItem>
          <MenuItem onClick={handleEdit}>Editar</MenuItem>
          <MenuItem onClick={handleDelete}>Eliminar</MenuItem>
        </Menu>

        {archivos.length === 0 && <p>No hay elementos para mostrar.</p>}

        
      </main>
    </div>
  );
};
