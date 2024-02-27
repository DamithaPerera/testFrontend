'use client';

import { Provider } from "jotai";
import { atomWithStorage } from "jotai/utils";

import React from 'react'

const JotaiProvider = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
  return (
    <Provider>{children}</Provider>
  )
}

// Atoms
const authAtom = atomWithStorage('authenticated', false);
const jobRoleFromDataAtom = atomWithStorage('jobRoleFormData', {
    roleName: '',
    jobDescription: ''
});

export{
    JotaiProvider,
    authAtom,
    jobRoleFromDataAtom
}