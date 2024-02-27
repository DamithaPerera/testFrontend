'use client';

import React from 'react'
import RegisterForm from './components/registerForm'
import Image from 'next/image'
import RegisterCover from '../../public/assets/Group 485.svg';
import { useRouter } from 'next/navigation';

const RegisterPage = () => {

  const router  = useRouter();
  // TODO: useSession implementation
  const redirectToLogin = (isRegistered: boolean) => {
    isRegistered && router.push('/login');
  }

  return (
    <>
      <div className='flex md:grid md:grid-cols-4 2xl:grid-cols-5'>
        <div className='md:col-span-2 2xl:col-span-2 2xl:px-10 md:ml-10 mt-24 flex justify-center h-5/6 w-full'>
          <RegisterForm onRegister={redirectToLogin}/>
        </div>
        <div className='md:col-span-2 2xl:col-span-3 grid items-center'>
          <Image src={RegisterCover} alt="Login Page Cover" draggable={false} className='md:flex hidden justify-self-end mt-12 w-9/12' />
        </div>
      </div>
    </>
  )
}

export default RegisterPage