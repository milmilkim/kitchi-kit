'use client';

import { Button } from 'primereact/button';

import { useContext } from 'react';
import { ModalContext } from '@/contexts/ModalContext';
export default function Home() {
  const { openModal } = useContext(ModalContext);
  const handleClick = () => {
    console.log('버튼 클릭');
    openModal();
  };
  return (
    <>
      <Button onClick={handleClick}>버튼 클릭</Button>
      <Button onClick={handleClick}>버튼 클릭</Button>
    </>
  );
}
