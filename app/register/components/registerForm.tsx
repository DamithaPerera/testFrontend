'use client';

import { Input } from '@material-tailwind/react';
import React, { SyntheticEvent, useState } from 'react';
import { signUpUser } from '../services/registerService';
import Image from 'next/image';
import check from '../../../public/assets/GreenCheck.svg';
import cross from '../../../public/assets/Red-X.svg';
import { Toaster, toast } from 'sonner'

interface RegisterFormProps{
    onRegister : (isRegistered: boolean) => void,
}

const RegisterForm: React.FC<RegisterFormProps> = ({onRegister}) => {
    const initialFormData = {
        name: '',
        email: '',
        password: '',
        repeatPassword: '',
    };
    
    const [registerFormData, setRegisterFormData] = useState(initialFormData);
    // Implement after clarifying the requirements
    const [validUserName, setValidUsername] = useState(false);
    const [validPassword, setValidPassword] = useState(false);
    const [matchingPassword, setMatchingPassword] = useState(false);

    const registerUser = async (e: SyntheticEvent) => {
        e.preventDefault();
        
        if(
            registerFormData.name && 
            registerFormData.email && 
            registerFormData.password && 
            registerFormData.repeatPassword && 
            validPassword && 
            matchingPassword
            ) {
                const res = await signUpUser(registerFormData);
                if(res && res.code == 201){
                    // Clear the form fields after submitting
                    setRegisterFormData(initialFormData);
                    toast.success('Registered successfully!')
                    onRegister(true);
                }else{
                    toast.error(res.message);
                }
        }else{
            toast.error('Please fill in all the fields');
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        validateInputs(name, value);
        setRegisterFormData({ ...registerFormData, [name]: value });
    };

    const validateInputs = (name: string, value: string) => {
        switch (name) {
            case "password":
                setValidPassword(value.length >= 8);
                setMatchingPassword(value === registerFormData.repeatPassword);
                break;
            case "repeatPassword":
                setMatchingPassword(value.length >= 8 && value === registerFormData.password);
                break;
            default:
                break;
        }
    };
    

    return (
        <>
            <Toaster richColors position='top-center'/>
            <div className='w-full md:w-5/6'>
                <div className='text-primary-blue px-12 md:px-0'>
                    <h1 className='font-bold text-2xl mb-6'>Join Finlay Recruiter.</h1>
                    <p className=''>Get going with your next hires by signing up!</p>
                </div>
                <div className="mt-6 md:w-11/12 w-full px-12 md:px-0">
                    <form onSubmit={registerUser}>
                        <div className='grid gap-6'>
                            <Input label="First and Last Name" crossOrigin={undefined} value={registerFormData.name} name="name" onChange={handleInputChange}
                                style={{
                                    backgroundColor: '#fff',
                                    height: '3rem',
                                    fontSize: '1rem',
                                    color: 'gray',
                                }}
                            />
                            <Input type='email' label="Email" crossOrigin={undefined} value={registerFormData.email} name="email" onChange={handleInputChange}
                                style={{
                                    backgroundColor: '#fff',
                                    height: '3rem',
                                    fontSize: '1rem',
                                    color: 'gray',
                                }}
                            />
                            {/* TODO: show/hide button */}
                            <Input type="password" label="Password" crossOrigin={undefined} value={registerFormData.password} name="password" onChange={handleInputChange}
                                style={{
                                    backgroundColor: '#fff',
                                    height: '3rem',
                                    fontSize: '1rem',
                                    color: 'gray',
                                }}
                                icon={ validPassword ? <Image className={registerFormData.password ? 'visible' : 'hidden'} src={check} alt={'correct'}></Image> : <Image className={registerFormData.password ? 'visible' : 'hidden'} src={cross} alt={'wrong'}></Image>}
                            />
                            {/* TODO: show/hide button */}
                            <Input type="password" label="Repeat Password" crossOrigin={undefined} value={registerFormData.repeatPassword} name="repeatPassword" onChange={handleInputChange}
                                style={{
                                    backgroundColor: '#fff',
                                    height: '3rem',
                                    fontSize: '1rem',
                                    color: 'gray',
                                }}
                                icon={ matchingPassword ? <Image className={registerFormData.repeatPassword ? 'visible' : 'hidden'} src={check} alt={'correct'}></Image> : <Image className={registerFormData.repeatPassword ? 'visible' : 'hidden'} src={cross} alt={'wrong'}></Image>}
                            />
                        </div>
                        <div className='grid justify-stretch mt-8 text-sm'>
                            <button type="submit" className='p-2 rounded-full bg-primary-blue text-white'>Register</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default RegisterForm;
