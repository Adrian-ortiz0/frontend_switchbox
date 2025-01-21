import React from 'react'
import "../styles.css";
import { AsideRegistration } from './AsideRegistration';
import { SignInForm } from './SignInForm';

export const SignIn = () => {
  return (
    <main className='loginSign_main'>
      <AsideRegistration />
      <SignInForm />
    </main>
  )
}
