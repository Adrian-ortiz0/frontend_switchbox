import React, { useEffect, useState } from "react";
import { StorageAside } from "./StorageAside";
import { StorageHeaderFolder } from "./StorageHeaderFolder";
import { CloudProfile } from "./CloudProfile";
import { useUser } from "../UserContext";
import { axiosInstance } from "../AxiosConfiguration";
import { FavoritesContainer } from "./FavoritesContainer";

export const Favorites = () => {
  const { usuario } = useUser();
  const [searchTerm, setSearchTerm] = useState("");
  const [archivosFavoritos, setArchivosFavoritos] = useState([]);
  

  const fetchArchivosFavoritos = () => {
    axiosInstance
      .get(`archivos/archivosFavoritos/${usuario.id}`)
      .then((response) => {
        setArchivosFavoritos(response.data);
      })
      .catch((error) => {
        console.error("Error fetching archivos:", error);
      });
  };

  useEffect(() => {
    fetchArchivosFavoritos();
  }, []);

  return (
    <main className="storage_menu-main">
      <StorageAside />
      <section className="storage_menu-section">
        <StorageHeaderFolder
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        <div className="data_container">
          <FavoritesContainer
            archivos={archivosFavoritos}
            onUpdate={fetchArchivosFavoritos}
          />
          <CloudProfile />
        </div>
      </section>
    </main>
  );
};
