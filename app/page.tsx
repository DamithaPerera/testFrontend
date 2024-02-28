'use client';

import { useEffect } from 'react';
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import RolePage from './role/page';

export default function Home() {
  
  const router = useRouter();
  const { data: session, status } = useSession();
  
  useEffect(() => {
    if (status === "authenticated") {
      router.push('/role');
    } else if (status === "unauthenticated") {
      router.push('/login');
    }
  }, [status, router]);

  return (
    <div>
      {/* might add something */}
      {/* <RolePage/> */}
      <div>============LOADING...=====================</div>
      <div>============LOADING...=====================</div>
      <div>============LOADING...=====================</div>
      <div>============LOADING...=====================</div>
      <div>============LOADING...=====================</div>
      <div>============LOADING...=====================</div>
      <div>============LOADING...=====================</div>
      <div>============LOADING...=====================</div>
      <div>============LOADING...=====================</div>
    </div>
  );
}
