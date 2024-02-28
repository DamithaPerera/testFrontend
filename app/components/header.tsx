import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import UserRegisterIcon from '../../public/assets/UserRegister.svg';
import MainFinlayIconBlue from '../../public/assets/Main Finlay Logo blue.png';
import UserIcon from '@/public/assets/UserIcon.svg';
import BellIcon from '@/public/assets/Bell.svg';
import CaretUp from '@/public/assets/caret-up-solid.svg';
import CaretDown from '@/public/assets/caret-down-solid.svg';
import NotificationFlag from '@/public/assets/NotificationFlag.svg';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import HeaderDropDown from './headerDropDown';
import { useAtom } from 'jotai';
import { authAtom } from '../providers/jotaiProvider';

const Header = () => {
  const { data: session, status } = useSession();
  const [dorpDownActivated, setDropDownActivated] = useState(false);
  const [loggedIn] = useAtom(authAtom);
  


  return (
    <header className='flex justify-between items-center w-screen shadow-sm bg-white fixed top-0 h-24 z-50' >
      <div>
        <Image src={MainFinlayIconBlue} alt="Main Finlay Logo Blue" className='w-48 2xl:ml-16 sm:ml-8' />
      </div>
      {loggedIn ? (
        <div className='inline-flex gap-8 items-center mr-14'>
          <div className='relative'>
            <Image src={BellIcon} alt="Bell Icon" className='cursor-pointer w-10 p-2 rounded-full hover:bg-blue-gray-50 relative'/>
            <Image src={NotificationFlag} alt="Notification Flag" className='absolute top-0 right-2'/>
          </div>
          <div className='inline-flex gap-5 items-center'>
            <Image src={UserIcon} alt="User Icon" className='cursor-pointer'/>
            {dorpDownActivated ? (
              <Image src={CaretUp} alt={'up'} onClick={() => {setDropDownActivated(!dorpDownActivated)}} className='w-7 cursor-pointer p-2 rounded-full hover:bg-blue-gray-50'></Image>
            ) : (
              <Image src={CaretDown} alt={'down'}  onClick={() => {setDropDownActivated(!dorpDownActivated)}} className='w-7 cursor-pointer p-2 rounded-full hover:bg-blue-gray-50'></Image>
            )}
          </div>
        </div>
      ) : (
        <div className='inline-flex gap-4 items-center mr-8'>
          <Link href='/register' className='py-3 px-6 text-sm bg-primary-blue rounded-full text-white inline-flex gap-3 justify-center'>
            <Image src={UserRegisterIcon} alt={'Register'} />
            Register
          </Link>
          <Link href='/login' className='py-3 px-6 text-sm bg-gray-200 rounded-full text-primary-blue'>
            Login
          </Link>
        </div>
      )}
      
      {dorpDownActivated && <HeaderDropDown/>}      
    </header>
  );
};

export default Header;
