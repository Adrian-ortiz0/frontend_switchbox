import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router";
import { Login } from "./Components/Login.jsx";
import { SignIn } from "./Components/SignIn.jsx";
import { StorageMenu } from "./Components/StorageMenu.jsx";
import { Profile } from "./Components/Profile.jsx";
import { UserProvider } from "./UserContext.jsx";
import { CarpetaStorage } from "./Components/CarpetaStorage.jsx";

export const SwitchBox = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/storage-menu/:id" element={<StorageMenu />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/carpeta/:id" element={<CarpetaStorage />} />
        </Routes>
      </Router>
    </UserProvider>
  );
};
