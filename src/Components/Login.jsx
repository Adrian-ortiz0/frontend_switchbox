import React from 'react'
import "../styles.css";
import { AsideRegistration } from './AsideRegistration';
import { LoginForm } from './LoginForm';
export const Login = () => {

  return (
    <main className='loginSign_main'>
        <AsideRegistration />
        <LoginForm />
    </main>
  )
}
