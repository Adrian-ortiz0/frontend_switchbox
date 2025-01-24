import React from "react";
import { StorageAside } from "./StorageAside";
import { StorageHeader } from "./StorageHeader";
import { CloudContainer } from "./CloudContainer";
import { CloudProfile } from "./CloudProfile";
import { CarpetaContainer } from "./CarpetaContainer";
import { useParams } from "react-router";

export const CarpetaStorage = () => {
  const {id} = useParams();
  return (
    <main className="storage_menu-main">
      <StorageAside />
      <section className="storage_menu-section">
        <StorageHeader />
        <div className="data_container">
          <CarpetaContainer carpetaId={id} />
          <CloudProfile />
        </div>
      </section>
    </main>
  );
};
