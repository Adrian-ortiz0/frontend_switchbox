import React, { useState } from "react";
import { useUser } from "../UserContext";
import axiosInstance from "../AxiosConfiguration";
import { CarpetaForm } from "./CarpetaForm";

export const StorageHeaderFolder = ({ carpetaId }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [showCarpetaForm, setShowCarpetaForm] = useState(false);
  const { usuario, actualizarUsuario } = useUser();

  const handleFileUploadClick = () => {
    document.getElementById("fileInput").click();
  };


  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    if (file) {
      console.log("Archivo seleccionado:", file.name);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("usuarioId", usuario.id);

      if (carpetaId) {
        formData.append("carpetaId", carpetaId);
      }

      axiosInstance
        .post("/archivos/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log("Archivo subido con éxito", response.data);

          const newStorageUsed = usuario.espacioUsado + file.size;

          axiosInstance.put(`/usuarios/archivos/${usuario.id}`, JSON.stringify(newStorageUsed), {
            headers: {
              "Content-Type": "application/json",
            }
          })
            .then(() => {
              axiosInstance.get(`/usuarios/${usuario.id}`)
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
        })
        .catch((error) => {
          console.error("Error al subir archivo", error);
        });
    }
  };

  const handleAddFolderClick = () => {
    setShowCarpetaForm(true);
  };

  const handleCloseForm = () => {
    setShowCarpetaForm(false);
  };

  return (
    <header className="storage_header">
      <div className="storage_header-addButtons">
        <div className="storage_header-buttonsContainer">
          <button onClick={handleFileUploadClick}>
            <img src="/public/plus_logo.png" alt="" width={20} height={20} />
          </button>
          <h5>Add File</h5>
          <input
            id="fileInput"
            type="file"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </div>

        <div className="storage_header-buttonsContainer">
          <button onClick={handleAddFolderClick}>
            <img src="/public/plus_logo.png" alt="" width={20} height={20} />
          </button>
          <h5>Add Folder</h5>
        </div>
      </div>
      <div className="storage_header-input">
        <input type="text" placeholder="Search" />
        <img src="/public/lupa_logo.png" alt="" width={20} height={20} />
      </div>
      <div className="storage_header-profileImg">
        <div className="storage_header-imgContainer">
          <img src="/public/user_logo.png" alt="" width={30} height={30} />
        </div>
      </div>

      {showCarpetaForm && <CarpetaForm carpetaPadreId={carpetaId} onClose={handleCloseForm} />}
      
    </header>
  );
};
