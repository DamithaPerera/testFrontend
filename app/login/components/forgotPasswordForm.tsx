'use client';

import { Input } from '@material-tailwind/react';
import Image from 'next/image';
import check from '../../../public/assets/GreenCheck.svg';
import cross from '../../../public/assets/Red-X.svg';
import React, { SyntheticEvent, useState } from 'react'
import { ERROR_MESSAGES } from '../../../public/constants/messages';
import { forgotPassword } from '../services/forgotPasswordService';
import leftArrow from '../../../public/assets/arrow-left-long-solid.svg';
import { Toaster, toast } from 'sonner'

interface ForgotPasswordProps {
    onBack: () => void,
}

const ForgotPasswordForm: React.FC<ForgotPasswordProps> = ({onBack}) => {

    const initialFormData = {
        email: '',
        password: '',
        repeatPassword: '',
    };

    const [forgotPasswordData, setForgotPasswordData] = useState(initialFormData);
    const [userNameValidity, setUserValidity] = useState(false);
    const [matchingPassword, setMatchingPassword] = useState(false);
    const [validPassword, setValidPassword] = useState(false);
    const [isTyping, setTyping] = useState(true);

    const handleForgotPassword = async (e: SyntheticEvent) => {
        e.preventDefault();
        setTyping(false);
        
        if(
          forgotPasswordData.email &&
          forgotPasswordData.password &&
          forgotPasswordData.repeatPassword
          ) {
            const res = await forgotPassword(forgotPasswordData.email, forgotPasswordData.password);
            
            res && res.code == 400 && handleErrors(res);
            
            // Clear the form fields after submitting
            if(res && res.code == 200){
                toast.success("Password changed successfully!")
                setForgotPasswordData(initialFormData);
                setTyping(true);
            }else{
                toast.error(res.message);
            }
        }else{
            toast.error('Please fill in all the fields');
        }
    };

    const handleErrors = (
        res: {
          message: string,
          code: number,
          success: boolean
        }) => {
            
        setUserValidity(!(res.message === ERROR_MESSAGES.EMAIL_NOT_EXISTS.message));
      };
  
      const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const { name, value } = e.target;
          setTyping(true);
          validateInputs(name, value)
          setForgotPasswordData({ ...forgotPasswordData, [name]: value });
      };

      const validateInputs = (name: string, value: string) => {
        switch (name) {
            case "password":
                setValidPassword(value.length >= 8);
                setMatchingPassword(value === forgotPasswordData.repeatPassword);
                break;
            case "repeatPassword":
                setMatchingPassword(value.length >= 8 && value === forgotPasswordData.password);
                break;
            default:
                break;
        }

    };
    
    const handleBackClick = () => {
        
        onBack();
    };
    
  return (
    <>
        <Toaster richColors position='top-center'/>
        <div className='w-full md:w-5/6'>
                <div className='text-primary-blue px-12 md:px-0'>
                    <h1 className='font-bold text-2xl mb-6'>We&apos;ve got you covered!</h1>
                    <p className=''>Create a new password</p>
                </div>
                <div className="mt-6 md:w-11/12 w-full px-12 md:px-0">
                    <form onSubmit={handleForgotPassword}>
                        <div className='grid gap-6'>
                          <Input type='email' label="Email" crossOrigin={undefined} value={forgotPasswordData.email} name="email" onChange={handleInputChange}
                              style={{
                                  backgroundColor: '#fff',
                                  height: '3rem',
                                  fontSize: '1rem',
                                  color: 'gray',
                              }}
                              icon={ userNameValidity ? <Image className={!isTyping ? 'visible' : 'hidden'} src={check} alt={'correct'}></Image> : <Image className={!isTyping ? 'visible' : 'hidden'} src={cross} alt={'wrong'}></Image>}
                          />
                            {/* TODO: show/hide button */}
                          <Input type="password" label="New Password" crossOrigin={undefined} value={forgotPasswordData.password} name="password" onChange={handleInputChange}
                              style={{
                                  backgroundColor: '#fff',
                                  height: '3rem',
                                  fontSize: '1rem',
                                  color: 'gray',
                              }}
                              icon={ validPassword ? <Image className={forgotPasswordData.password ? 'visible' : 'hidden'} src={check} alt={'correct'}></Image> : <Image className={forgotPasswordData.password ? 'visible' : 'hidden'} src={cross} alt={'wrong'}></Image>}
                          />
                          {/* TODO: show/hide button */}
                          <Input type="password" label="Repeat Password" crossOrigin={undefined} value={forgotPasswordData.repeatPassword} name="repeatPassword" onChange={handleInputChange}
                                style={{
                                    backgroundColor: '#fff',
                                    height: '3rem',
                                    fontSize: '1rem',
                                    color: 'gray',
                                }}
                                icon={ matchingPassword ? <Image className={forgotPasswordData.repeatPassword ? 'visible' : 'hidden'} src={check} alt={'correct'}></Image> : <Image className={forgotPasswordData.repeatPassword ? 'visible' : 'hidden'} src={cross} alt={'wrong'}></Image>}
                            />
                        </div>
                        <div className='grid justify-stretch mt-12 gap-6'>
                            <button type="submit" className='p-2 rounded-full bg-primary-blue text-white text-sm'>Sign in</button>
                        </div>
                        <div className='mt-8 cursor-pointer' onClick={handleBackClick}>
                            <p className='inline-flex'><Image src={leftArrow} alt={'arrow-left-log-solid'} className='h-6 w-fit pr-4'></Image>Back</p>
                        </div>
                    </form>
                </div>
            </div>
    </>
  )
}

export default ForgotPasswordForm