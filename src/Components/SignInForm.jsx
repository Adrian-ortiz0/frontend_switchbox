import React from "react";

export const SignInForm = () => {

    const handleSubmit = (e) => {
        e.PreventDefault();
    } 

  return (
    <section className="form_container">
      <form className="form" onSubmit={handleSubmit}>
        <h2>Register</h2>
        <div className="form-division">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="nombre">Nombre:</label>
              <input type="text" name="nombre" />
            </div>

            <div className="form-group">
              <label htmlFor="apellido">Apellido:</label>
              <input type="text" name="apellido" />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" name="email" />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input type="password" name="password" />
            </div>

            <div className="form-group">
              <label htmlFor="password">Repeat Password:</label>
              <input type="password" name="password" />
            </div>
          </div>
        </div>
        <div className="buttons-form">
          <button>Register</button>
        </div>
      </form>
    </section>
  );
};
