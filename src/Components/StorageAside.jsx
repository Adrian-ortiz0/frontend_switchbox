import React, { useState, useEffect } from "react";
import { useUser } from "../UserContext";
import { useNavigate } from "react-router";
import axiosInstance from "../AxiosConfiguration";

export const StorageAside = () => {
  const [storageUsed, setStorageUsed] = useState(0);
  const totalStorage = 100;
  const { usuario } = useUser();

  const navigate = useNavigate();

  useEffect(() => {
    console.log("Datos del usuario:", usuario);
  }, [usuario]);  

  useEffect(() => {
    const interval = setInterval(() => {
      setStorageUsed((prev) => (prev < totalStorage ? prev + 1 : totalStorage));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const storagePercentage = (storageUsed / totalStorage) * 100;

  

  const convertirBytesAGigas = (bytes) => {
    return (bytes / (1024 * 1024 * 1024)).toFixed(2);
  };

  return (
    <aside className="storage_aside">
      <div className="storage_aside-container">
        <div className="storage_aside-imageContainer">
          <img
            src="/public/switchbox_logo2.png"
            alt="Logo"
            width={90}
            height={60}
          />
        </div>

        <div className="storage_aside-optionsContainer">
          <button onClick={() => navigate(`../storage-menu/${usuario.id}/`)}>
            <img src="/public/cloud_logo.png" alt="" width={20} height={20} />
            My Cloud
          </button>
          <button>
            <img src="/public/share_logo.png" alt="" width={20} height={20} />
            Shared with me
          </button>
          <button>
            <img
              src="/public/favourites_logo.png"
              alt=""
              width={20}
              height={20}
            />
            Favorites
          </button>
          <button>
            <img
              src="/public/delete_logo.png"
              alt=""
              width={20}
              height={20}
            />
            Deleted Files
          </button>
        </div>

        <div className="storage_aside-storageView">
          <div className="storage_aside-storageHeader">Storage</div>

          <div className="storage_aside-storageInfo">
            {usuario.espacioUsado} Bytes / {convertirBytesAGigas(usuario.cuenta.limite_espacio)}GB
          </div>
        </div>
      </div>
    </aside>
  );
};
