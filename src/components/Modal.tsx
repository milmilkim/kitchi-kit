'use client';

import React from 'react';
import { Dialog } from 'primereact/dialog';
import { useContext } from 'react';
import { ModalContext } from '@/contexts/ModalContext';

const GlobalModal: React.FC = () => {
  const { modalState, closeModal } = useContext(ModalContext);
  return (
    <Dialog visible={modalState.isVisible} onHide={closeModal}>
      모달 테스트
    </Dialog>
  );
};

export default GlobalModal;
