import React, { useEffect, useState } from "react";
import { StorageAside } from "./StorageAside";
import { CloudContainer } from "./CloudContainer";
import { CloudProfile } from "./CloudProfile";
import { StorageHeaderFolder } from "./StorageHeaderFolder";
import { useParams } from "react-router";
import axiosInstance from "../AxiosConfiguration";
import { useUser } from "../UserContext";

export const StorageMenu = () => {
  const { usuario, actualizarUsuario } = useUser();
  const [carpetas, setCarpetas] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [archivosRaiz, setArchivosRaiz] = useState([]);
  const [menuType, setMenuType] = useState(null);

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

  const handleFavorite = (currentArchivo, handleClose) => {
    if(currentArchivo){
      axiosInstance.put(`/archivos/favorito/${currentArchivo.id}`).then((response) => {
          alert("El archivo se movio a favoritos")
          handleClose()
      }).catch((error) => {
        console.error("Error updating" + error)
      })
    }
  }

  const handleDelete = (currentArchivo, handleClose) => {
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


  useEffect(() => {
    fetchCarpetasUsuario();
    fetchArchivosRaiz();
  }, [actualizarUsuario]);

  const filteredCarpetas = searchTerm
    ? carpetas.filter((carpeta) =>
        carpeta.nombre.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : carpetas;

  const filteredArchivos = searchTerm
    ? archivosRaiz.filter((archivos) =>
        archivos.nombre.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : archivosRaiz;

  const { id } = useParams();
  return (
    <main className="storage_menu-main">
      <StorageAside />
      <section className="storage_menu-section">
        <StorageHeaderFolder
          carpetaId={id}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        <div className="data_container">
          <CloudContainer carpetass={filteredCarpetas} archivos={filteredArchivos} onDelete={handleDelete} onFavorite={handleFavorite}/>
          <CloudProfile />
        </div>
      </section>
    </main>
  );
};
