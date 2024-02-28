'use client';

import { Input } from '@material-tailwind/react';
import Image from 'next/image';
import { loginUser } from '../services/loginService';
import React, { SyntheticEvent, useState } from 'react';
import GoogleIcon from '../../../public/assets/Google.svg';
import { ERROR_MESSAGES } from '../../../public/constants/messages';
import check from '../../../public/assets/GreenCheck.svg';
import cross from '../../../public/assets/Red-X.svg';
import Link from 'next/link';
import { Toaster, toast } from 'sonner'
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useAtom, atom } from 'jotai';
import { authAtom } from '@/app/providers/jotaiProvider';
interface LoginFormProps {
  onForgotPassword: () => void,
}

const LoginForm: React.FC<LoginFormProps> = ({onForgotPassword}) => {
    const initialFormData = {
        email: '',
        password: '',
    };

    const {data: session, status, update} = useSession();
    const router = useRouter();
    
    const [loginFormData, setLoginFormData] = useState(initialFormData);
    const [userNameValidity, setUserValidity] = useState(false);
    const [passwordValidity, setPasswordValidity] = useState(false);
    const [loggingIn, setLoggingIn] = useState(false);
    const [isTyping, setTyping] = useState(true);
    const [_, setLoggedIn] = useAtom(authAtom);
    
    const handleLogin = async (e: SyntheticEvent) => {
      e.preventDefault();
      setLoggingIn(true);
      setTyping(false);
      
      if(
        loginFormData.email &&
        loginFormData.password
        ) {
          
          try {
            const res = await signIn('credentials', {
              email: loginFormData.email,
              password: loginFormData.password,
              redirect: false,
              // callbackUrl: process.env.CALLBACK_URL || 'http://localhost:3000/role',
            })
            
            res && res.status == 401 && handleErrors(res);
            
            if(res && !res.ok){
              toast.error(ERROR_MESSAGES.INVALID_CREDENTIALS.message);
              setLoggingIn(false);
              setTyping(true);
            }else{
              setLoggedIn(true);
              setLoggingIn(false);
              router.push("/role");
            }
            
          } catch (error) {
              setLoggingIn(false);
              setTyping(true);
              console.error(error);
            }
          }else{
            toast.error('Please fill in all the fields')
          }
    };

    const handleGoogleLogin = () => {
      try {
        signIn('google', {
          redirect: true,
          callbackUrl: process.env.CALLBACK_URL || 'http://localhost:3000/role',
        });
        setLoggedIn(true);
      } catch (error) {
        console.error(error);        
      }
    }

    const handleErrors = (res: any) => {
        if(res.error === "CredentialsSignin") {
          setUserValidity(true);
          setPasswordValidity(false);
        }else {
          setUserValidity(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setTyping(true);
        setLoginFormData({ ...loginFormData, [name]: value });
    };

    const handleForgotPasswordClick = () => {
      onForgotPassword();
    };


    return (
        <>
            <Toaster richColors position='top-center'/>
            <div className='w-full md:w-5/6'>
                <div className='text-primary-blue px-12 md:px-0'>
                    <h1 className='font-bold text-2xl mb-6'>Let&apos;s Sign You In.</h1>
                    <p className=''>Welcome back</p>
                    <p className=''>You&apos;ve been missed!</p>
                </div>
                <div className="mt-8 md:w-11/12 w-full px-12 md:px-0">
                    <form onSubmit={handleLogin}>
                        <div className='grid gap-6'>
                          <Input type='email' label="Email" crossOrigin={undefined} value={loginFormData.email} name="email" onChange={handleInputChange}
                              style={{
                                  backgroundColor: '#fff',
                                  height: '3rem',
                                  fontSize: '1rem',
                                  color: 'gray',
                              }}
                              icon={ userNameValidity ? <Image className={!isTyping ? 'visible' : 'hidden'} src={check} alt={'correct'}></Image> : <Image className={!isTyping ? 'visible' : 'hidden'} src={cross} alt={'wrong'}></Image>}
                          />
                            {/* TODO: show/hide button */}
                          <Input type="password" label="Password" crossOrigin={undefined} value={loginFormData.password} name="password" onChange={handleInputChange}
                              style={{
                                  backgroundColor: '#fff',
                                  height: '3rem',
                                  fontSize: '1rem',
                                  color: 'gray',
                              }}
                              icon={ passwordValidity ? <Image className={!isTyping ? 'visible' : 'hidden'} src={check} alt={'correct'}></Image> : <Image className={!isTyping ? 'visible' : 'hidden'} src={cross} alt={'wrong'}></Image>}
                          />
                          <Link href={''} className='underline w-fit text-sm' onClick={handleForgotPasswordClick}>forgot password?</Link>
                        </div>
                        <div className='grid justify-stretch mt-12 gap-4'>
                            <button type="submit" className='p-2 rounded-full bg-primary-blue text-white' disabled={loggingIn}>Sign in</button>
                            <p className='text-gray-400 justify-self-center text-sm'>Or login with</p>
                            <Image src={GoogleIcon} alt={'Google'} className='justify-self-center cursor-pointer' onClick={handleGoogleLogin} />
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default LoginForm;