'use client';

import { signOut } from 'next-auth/react';
import React from 'react'
import { Card, CardBody } from '@material-tailwind/react';
import { useAtom } from 'jotai';
import { authAtom } from '../providers/jotaiProvider';

const HeaderDropDown = () => {

    const [_, setLoggedIn] = useAtom(authAtom);  

    const handleLogOut = () => {
      setLoggedIn(false);
      signOut({
        redirect: true,
        callbackUrl: 'http://13.48.204.99:3000/login'
      });
    }
    
    return (
        <Card className='w-fit border-gray-400 border fixed top-24 right-2 z-50' placeholder={undefined}>
            <CardBody placeholder={undefined} className='w-full'>
              <p className='py-2 px-8 text-sm cursor-pointer hover:bg-blue-gray-50 w-full text-red-500' onClick={handleLogOut}>Log out</p>
            </CardBody>
        </Card>
    )
}

export default HeaderDropDown