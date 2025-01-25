import React, { useState } from "react";
import { useUser } from "../UserContext";
import axiosInstance from "../AxiosConfiguration";
import { CarpetaForm } from "./CarpetaForm";

export const StorageHeaderFolder = ({ carpetaId, searchTerm, setSearchTerm }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [showCarpetaForm, setShowCarpetaForm] = useState(false);
  const { usuario, actualizarUsuario } = useUser();

  const handleFileUploadClick = () => {
    document.getElementById("fileInput").click();
  };

  const uploadFile = async (file, carpetaId) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("usuarioId", usuario.id);


      const response = await axiosInstance.post("/archivos/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Archivo subido con éxito:", response.data);

      const newStorageUsed = usuario.espacioUsado + file.size;

      await axiosInstance.put(`/usuarios/archivos/${usuario.id}`, JSON.stringify(newStorageUsed), {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const updatedUserResponse = await axiosInstance.get(`/usuarios/${usuario.id}`);
      actualizarUsuario(updatedUserResponse.data);
      console.log("Espacio actualizado con éxito:", updatedUserResponse.data);
    } catch (error) {
      console.error("Error durante la subida del archivo:", error);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    if (file) {
      console.log("Archivo seleccionado:", file.name);
      uploadFile(file, carpetaId);
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
            <img src="/public/plus_logo.png" alt="Add file" width={20} height={20} />
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
            <img src="/public/plus_logo.png" alt="Add folder" width={20} height={20} />
          </button>
          <h5>Add Folder</h5>
        </div>
      </div>
      <div className="storage_header-input">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img src="/public/lupa_logo.png" alt="Search" width={20} height={20} />
      </div>
      <div className="storage_header-profileImg">
        <div className="storage_header-imgContainer">
          <img src="/public/user_logo.png" alt="User" width={30} height={30} />
        </div>
      </div>

      {showCarpetaForm && <CarpetaForm carpetaPadreId={carpetaId} onClose={handleCloseForm} />}
    </header>
  );
};
