import React from 'react'
import { useNavigate } from 'react-router';

export const LoginForm = () => {

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
    }

  return (
    <section className='form_container'>
        <form className='form' onSubmit={handleSubmit}>
            <h2>Login</h2>
            <div className='form-division'>
                <div className='form-group'>
                    <label htmlFor="email">Email:</label>
                    <input type="text" name='email'/>
                </div>
                <div className='form-group'>
                    <label htmlFor="password">Password:</label>
                    <input type="password" name='password'/>
                </div>
            </div>
            <div className='buttons-form'>
                <button onClick={() => navigate("/sign-in")}>Sign In</button>
                <button>Enter</button>
            </div>
        </form>
    </section>
  )
}
