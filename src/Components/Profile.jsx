import React from "react";
import { useNavigate } from "react-router";

export const Profile = () => {

    const handleSubmit = (e) => {
        e.preventDefault();
    }
    const navigate = useNavigate();

  return (
    <main className="profile_main">
      <div className="profile">
        <main className="profile_container">
          <h2>My profile</h2>
          <div className="profile_picture">
            <div className="picture_circle"></div>
            <div className="picture_buttons">
              <button>Change picture</button>
              <button>Delete picture</button>
            </div>
          </div>

          <form className="profile_details" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="nombre">Name:</label>
                <input type="text" />
              </div>

              <div className="form-group">
                <label htmlFor="apellido">Last name:</label>
                <input type="text" />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input type="email" />
            </div>

            <div className="change_password">
              <a href="#">Change password</a>
            </div>

            <div className="profile_actions">
              <button onClick={() => navigate("/storage-menu")}>Exit</button>
              <button>Save</button>
            </div>
          </form>
        </main>
      </div>
    </main>
  );
};
