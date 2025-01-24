import React from "react";

export const SharedHeader = () => {
  return (
    <header className="storage_header">
      <div></div>
      <div></div>
      <div className="storage_header-input">
        <input type="text" placeholder="Search" />
        <img src="/public/lupa_logo.png" alt="" width={20} height={20} />
      </div>
      <div className="storage_header-profileImg">
        <div className="storage_header-imgContainer">
          <img src="/public/user_logo.png" alt="" width={30} height={30} />
        </div>
      </div>
    </header>
  );
};
