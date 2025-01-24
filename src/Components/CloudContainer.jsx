import React, { useEffect, useState } from "react";
import { useUser } from "../UserContext";
import axiosInstance from "../AxiosConfiguration";
import { CarpetaForm } from "./CarpetaForm";
import { Menu, MenuItem, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CarpetaEditing } from "./CarpetaEditing";
import { ArchivoEditing } from "./ArchivoEditing";
import { ArchivoSharing } from "./ArchivoSharing";
import { useNavigate } from "react-router";
import {
  DndContext,
  useDroppable,
  useDraggable,
  DragOverlay,
} from "@dnd-kit/core";

export const CloudContainer = () => {
  const { usuario, actualizarUsuario } = useUser();
  const [carpetas, setCarpetas] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [archivosRaiz, setArchivosRaiz] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentArchivo, setCurrentArchivo] = useState(null);
  const [draggingArchivo, setDraggingArchivo] = useState(null);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [isEditArchivoFormOpen, setIsEditArchivoFormOpen] = useState(false);
  const [isShareArchivoFormOpen, setIsShareArchivoFormOpen] = useState(false);
  const [menuType, setMenuType] = useState(null);

  const navigate = useNavigate();

  const fetchCarpetasUsuario = () => {
    axiosInstance
      .get(`/carpetas/usuario/${usuario.id}`)
      .then((response) => {
        setCarpetas(response.data);
      })
      .catch((error) => {
        console.error("Error fetching carpetas:", error);
      });
  };

  const fetchArchivosRaiz = () => {
    axiosInstance
      .get(`/archivos/raiz/${usuario.id}`)
      .then((response) => {
        setArchivosRaiz(response.data);
      })
      .catch((error) => {
        console.error("Error fetching archivos raíz:", error);
      });
  };

  useEffect(() => {
    if (usuario) {
      fetchCarpetasUsuario();
      fetchArchivosRaiz();
    }
  }, [usuario]);

  const handleFormClose = () => {
    setIsFormOpen(false);
    fetchCarpetasUsuario();
  };

  const handleEditFormClose = () => {
    setIsEditFormOpen(false);
    fetchCarpetasUsuario();
  };

  const handleEditArchivoFormClose = () => {
    setIsEditArchivoFormOpen(false);
    fetchArchivosRaiz();
  };

  const handleShareArchivoFormClose = () => {
    setIsShareArchivoFormOpen(false);
    fetchArchivosRaiz();
  };

  const handleClick = (event, item, type) => {
    setAnchorEl(event.currentTarget);
    setCurrentArchivo(item);
    setMenuType(type);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setMenuType(null);
  };

  const handleDelete = () => {
    if (currentArchivo) {
      const archivoSize = currentArchivo.tamaño;
      const endpoint =
        menuType === "folder"
          ? `/carpetas/usuario/${usuario.id}/${currentArchivo.id}`
          : `/archivos/${currentArchivo.id}`;

      axiosInstance
        .delete(endpoint)
        .then(() => {
          const nuevoEspacioUsado = usuario.espacioUsado - archivoSize;
          axiosInstance
            .put(
              `/usuarios/archivos/${usuario.id}`,
              JSON.stringify(nuevoEspacioUsado),
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            )
            .then(() => {
              axiosInstance
                .get(`/usuarios/${usuario.id}`)
                .then((response) => {
                  actualizarUsuario(response.data);
                  console.log("Espacio actualizado con éxito", response.data);
                })
                .catch((error) => {
                  console.error("Error al obtener usuario actualizado", error);
                });
            })
            .catch((error) => {
              console.error("Error al actualizar espacio", error);
            });
          fetchCarpetasUsuario();
          fetchArchivosRaiz();
          handleClose();
        })
        .catch((error) => {
          console.error("Error eliminando item:", error);
        });
    }
  };

  const handleEdit = () => {
    if (menuType === "file") {
      setIsEditArchivoFormOpen(true);
    } else {
      setIsEditFormOpen(true);
    }
    handleClose();
  };

  const handleShare = () => {
    setIsShareArchivoFormOpen(true);
    handleClose();
  };

  const handleDownload = () => {
    console.log("Descargando archivo:", currentArchivo);
    handleClose();
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setDraggingArchivo(null);
    if (over && active.id !== over.id) {
      const movedArchivo = archivosRaiz.find(
        (archivo) => archivo.id === active.id
      );
      const carpetaDestino = carpetas.find((carpeta) => carpeta.id === over.id);

      if (movedArchivo && carpetaDestino) {
        axiosInstance
          .put(`/archivos/mover/${movedArchivo.id}`, {
            carpetaId: carpetaDestino.id,
          })
          .then(() => {
            fetchCarpetasUsuario();
            fetchArchivosRaiz();
            alert("Archivo movido con exito!");
          })
          .catch((error) => {
            console.error("Error moving archivo:", error);
          });
      }
    }
  };

  return (
    <DndContext
      onDragStart={(event) => {
        const activeArchivo = archivosRaiz.find(
          (archivo) => archivo.id === event.active.id
        );
        setDraggingArchivo(activeArchivo);
      }}
      onDragEnd={handleDragEnd}
    >
      <div className="cloud-container-wrapper">
        {isEditFormOpen && currentArchivo && (
          <CarpetaEditing
            carpeta={currentArchivo}
            onClose={handleEditFormClose}
            onUpdated={() => {
              fetchCarpetasUsuario();
              fetchArchivosRaiz();
            }}
          />
        )}
        {isEditArchivoFormOpen && currentArchivo && (
          <ArchivoEditing
            archivo={currentArchivo}
            onClose={handleEditArchivoFormClose}
            onUpdate={() => {
              fetchArchivosRaiz();
            }}
          />
        )}
        {isShareArchivoFormOpen && currentArchivo && (
          <ArchivoSharing
            archivo={currentArchivo}
            usuarioOrigenId = {usuario.id}
            onClose={handleShareArchivoFormClose}
            onUpdate={() => {
              fetchArchivosRaiz();
            }}
          />
        )}
        <div className="cloud_container-folders">
          {carpetas.map((carpeta) => (
            <DroppableFolder
              key={carpeta.id}
              carpeta={carpeta}
              onClick={navigate}
              handleClick={handleClick}
            />
          ))}
        </div>
        <main className="cloud_container">
          {isFormOpen && <CarpetaForm onClose={handleFormClose} />}
          {archivosRaiz.map((archivo) => (
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
            open={Boolean(anchorEl) && menuType === "file"}
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
            open={Boolean(anchorEl) && menuType === "folder"}
            onClose={handleClose}
          >
            <MenuItem onClick={handleEdit}>Editar</MenuItem>
            <MenuItem onClick={handleDelete}>Eliminar</MenuItem>
          </Menu>
          {archivosRaiz.length === 0 && carpetas.length === 0 && (
            <p>No hay elementos para mostrar.</p>
          )}
        </main>
        <DragOverlay>
          {draggingArchivo ? (
            <div className="card dragging">
              <div className="cloud_folder-icons">
                <img
                  src="/public/files_icon.png"
                  alt="archivo"
                  className="folder-icon"
                />
              </div>
              <div>{draggingArchivo.nombre}</div>
            </div>
          ) : null}
        </DragOverlay>
      </div>
    </DndContext>
  );
};

const DroppableFolder = ({ carpeta, onClick, handleClick }) => {
  const { setNodeRef, isOver } = useDroppable({ id: carpeta.id });
  const folderClass = isOver ? "folder-card hover" : "folder-card";

  return (
    <button
      ref={setNodeRef}
      key={carpeta.id}
      className={folderClass}
      onDoubleClick={() => onClick(`/carpeta/${carpeta.id}`)}
    >
      <div className="cloud_folder-icons">
        <img
          src="/public/carpeta_icon.png"
          alt="Carpeta"
          className="folder-icon"
        />
        <div>{carpeta.nombre}</div>
        <IconButton
          aria-controls="folder-menu"
          aria-haspopup="true"
          onClick={(event) => handleClick(event, carpeta, "folder")}
        >
          <MoreVertIcon />
        </IconButton>
      </div>
    </button>
  );
};

const DraggableArchivo = ({ archivo, handleClick }) => {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: archivo.id,
  });

  const [isDraggingEnabled, setIsDraggingEnabled] = useState(true);

  const disableDragging = (event) => {
    event.stopPropagation();
    setIsDraggingEnabled(false);
  };

  const enableDragging = () => {
    setTimeout(() => setIsDraggingEnabled(true), 100);
  };

  const handleIconClick = (event) => {
    event.stopPropagation();
    handleClick(event, archivo, "file");
  };

  return (
    <div
      ref={setNodeRef}
      className="card"
      {...(isDraggingEnabled ? { ...attributes, ...listeners } : {})}
    >
      <div className="cloud_folder-icons">
        <img
          src="/public/files_icon.png"
          alt="archivo"
          className="folder-icon"
        />
        <IconButton
          aria-controls="file-menu"
          aria-haspopup="true"
          onMouseDown={disableDragging}
          onClick={handleIconClick}
          onMouseUp={enableDragging}
        >
          <MoreVertIcon />
        </IconButton>
      </div>
      <div>{archivo.nombre}</div>
    </div>
  );
};
