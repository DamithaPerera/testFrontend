'use client';

import React, { useState } from 'react'
import LoginForm from './components/loginForm';
import Image from 'next/image';
import LoginCover from '../../public/assets/Group 484.svg';
import ForgotPasswordForm from './components/forgotPasswordForm';
import { SessionProvider } from 'next-auth/react';


const LoginPage = () => {

  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const toggleForgotPassword = () => {
    setShowForgotPassword(!showForgotPassword);
  };
  
  return (
    <>
      <SessionProvider>

        <div className='flex md:grid md:grid-cols-4 2xl:grid-cols-5'>
          <div className='md:col-span-2 2xl:col-span-2 md:px-10 md:ml-10 mt-24 flex justify-center w-full h-fit'>
            {showForgotPassword ? (
              <ForgotPasswordForm onBack={() => setShowForgotPassword(false)} />
            ) : (
              <LoginForm onForgotPassword={toggleForgotPassword} />
            )}
          </div>
          <div className='md:col-span-2 2xl:col-span-3 grid items-center'>
            <Image src={LoginCover} draggable={false} alt="Login Page Cover" className='hidden justify-self-end md:flex w-10/12' />
          </div>
        </div>
      </SessionProvider>
    </>
  )
}

export default LoginPage