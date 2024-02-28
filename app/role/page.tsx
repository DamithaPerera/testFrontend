'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import RolePageCover from '../../public/assets/Group 487.svg';
import StarIcon from '../../public/assets/star.svg';
import LinkIcon from '../../public/assets/link.svg';
import SendIcon from '../../public/assets/send.svg';
import { Card, CardBody, Input, Select, Option } from '@material-tailwind/react';
import RichTextEditor from './components/richTextEditor';
import { Toaster, toast } from 'sonner';
import { useAtom } from 'jotai';
import { authAtom, jobRoleFromDataAtom } from '../providers/jotaiProvider';
import { createJobRole } from './services/jobRoleService';
import { RESET } from 'jotai/utils';


const RolePage = () => {

  const router = useRouter();
  const { data: session, status } = useSession()
  const [loggedIn] = useAtom(authAtom);
  const [jobRoleFormData, setJobRoleFormData] = useAtom(jobRoleFromDataAtom);
  const [userRole, setUserRole] = useState('');
  const [roleName, setRoleName] = useState('');
  const [jobDescription, setJobDescription] = useState('');

  useEffect(() => {
    // checking if the user is authenticated
    if (typeof window !== 'undefined') {
    const authStatus = localStorage.getItem('authenticated');
    const authenticated:boolean = authStatus ? JSON.parse(authStatus) : false;
    if (!loggedIn && !authenticated) {
      toast.warning('You have to be logged in!');
      router.push('/login');
    }
  }

    setRoleName(jobRoleFormData.roleName);
    setJobDescription(jobRoleFormData.jobDescription);
  }, [loggedIn]);

  // auto saving to localhost: 2s intervals
  // retrieved only on reload
  useEffect(() => {
    const interval = setInterval(() => {
      setJobRoleFormData({
        roleName: roleName,
        jobDescription: jobDescription
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [roleName, jobDescription]);
  
  const handleCreate = async () => {
    const jobRoleData: JobRoleDto = {
      title: roleName,
      description: jobDescription
    } 
    try {
      const res = await createJobRole(jobRoleData);
      // reset form
      if(res.success) {
        setUserRole('');
        setRoleName('');
        setJobDescription('');
        setJobRoleFormData(RESET);
        router.push('/role-dashboard');
      }
    } catch (error) {
      console.error(error);
    }
  }
  
  return (
    <>
      <Toaster richColors position='top-center'/>
      <div className='md:grid md:grid-cols-8 md:pt-16'>
        <div className='flex justify-end md:col-span-6'>
            <Card className='flex w-4/6 p-6' placeholder={undefined}>
              <CardBody placeholder={undefined} className='grid h-full gap-6'>
              {/* <Select
                placeholder={userRole}
                label='Assign recruiter or hiring manager'
                onChange={(e) => setUserRole(e || '')}
                value={userRole}
              >
                <Option value="Recruiter">Recruiter</Option>
                <Option value="Hiring Manager">Hiring Manager</Option>
              </Select> */}

                <Input crossOrigin={undefined} type='text' label='Name of the role' onChange={(e) => setRoleName(e.target.value)} value={roleName}></Input>
                <RichTextEditor setJobDescription={setJobDescription} jobDescription={jobDescription}/>
                <div className='inline-flex gap-4 justify-self-end justify-end text-sm w-1/2'>
                  <button type="submit" className='h-10 px-6 rounded-full bg-gray-200 text-gray-500'>Save as draft</button>
                  <button type="submit" className='h-10 px-6 rounded-full bg-primary-blue text-white inline-flex items-center gap-2' onClick={handleCreate}>
                    <Image src={SendIcon} alt={'Send'}></Image>
                    <p>Create</p>
                  </button>
                </div>
              </CardBody>
            </Card>
        </div>
        <div className='md:col-span-2 flex justify-center h-fit px-2.5 -z-10'>
            <Card className='w-5/6 p-2' placeholder={undefined}>
              <CardBody placeholder={undefined} className='grid'>
                <div className='inline-flex text-primary-blue text-sm mb-1 gap-2'>
                  <Image src={StarIcon} alt={'Star'}></Image>
                  <p>Must-read posts</p>
                </div>
                <hr/>
                <div className='text-xs mt-3 mb-8'>
                  <ul className='grid gap-3'>
                    <li>Please read rules before you start working on a platform</li>
                    <li>Vision & Strategy of Finlay</li>
                  </ul>
                </div>
                {/* <div className='inline-flex text-primary-blue text-sm mb-1 gap-2'>
                  <Image src={LinkIcon} alt={'Link'}></Image>
                  <p>Featured Links</p>
                </div>
                <hr/>
                <div className='text-xs mt-3'>
                  <ul className='grid gap-3'>
                    <li>lorem ipsum</li>
                    <li>lorem ipsum</li>
                    <li>lorem ipsum</li>
                  </ul>
                </div> */}
              </CardBody>
            </Card>
        </div>

      </div>
      <Image src={RolePageCover} alt={'Background'} className='fixed top-0 left-1/2 -translate-x-1/2 -z-50'></Image>
    </>
  )
}

export default RolePage