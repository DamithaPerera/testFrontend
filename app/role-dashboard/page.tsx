import React from 'react';
import Image from 'next/image';
import VectorTopLeft from '../../public/assets/role-dashboard/Vector-top-left.svg';
import VectorBottomRight from '../../public/assets/role-dashboard/Vector-bottom-right.svg';
import { SideNavComponent } from '../components/sideNav';

const RoleDashboardPage = () => {
  return (
    <>
        <div>
            <SideNavComponent/>
        </div>
        <Image src={VectorTopLeft} alt={'Shape'} className='fixed top-16 left-24 -z-20'></Image>
        <Image src={VectorBottomRight} alt={'Shape'} className='fixed -bottom-48 -right-24 -z-20'></Image>
    </>
  )
}

export default RoleDashboardPage