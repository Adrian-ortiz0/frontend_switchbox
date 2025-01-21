import React from "react";

export const StorageHeader = () => {
  return (
    <header className="storage_header">
      <div className="storage_header-addButtons">
        <div className="storage_header-buttonsContainer">
          <button>
            <img src="../public/plus_logo.png" alt="" width={20} height={20} />
          </button>
          <h5>Add File</h5>
        </div>

        <div className="storage_header-buttonsContainer">
          <button>
            <img src="../public/plus_logo.png" alt="" width={20} height={20} />
          </button>
          <h5>Add Folder</h5>
        </div>
      </div>
      <div className="storage_header-input">
        <input type="text" placeholder="Search" />
        <img src="../public/lupa_logo.png" alt="" width={20} height={20} />
      </div>
      <div className="storage_header-profileImg">
        <div className="storage_header-imgContainer">
          <img src="../public/user_logo.png" alt="" width={30} height={30} />
        </div>
      </div>
    </header>
  );
};
