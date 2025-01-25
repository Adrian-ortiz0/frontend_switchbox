import React from "react";
import { StorageAside } from "./StorageAside";
import { CloudProfile } from "./CloudProfile";
import { CarpetaContainer } from "./CarpetaContainer";
import { useParams } from "react-router";
import { StorageHeaderCarpeta } from "./StorageHeaderCarpeta";

export const CarpetaStorage = () => {
  const {id} = useParams();
  return (
    <main className="storage_menu-main">
      <StorageAside />
      <section className="storage_menu-section">
        <StorageHeaderCarpeta carpetaId={id} />
        <div className="data_container">
          <CarpetaContainer carpetaId={id} />
          <CloudProfile />
        </div>
      </section>
    </main>
  );
};
