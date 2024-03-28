'use client';

import React, { createElement } from 'react';
import { Dialog } from 'primereact/dialog';
import { useContext } from 'react';
import { ModalContext } from '@/contexts/ModalContext';

const GlobalModal: React.FC = () => {
  const { modals, closeModal } = useContext(ModalContext);

  return (
    <>
      {modals
        .filter((modal) => modal.isVisible)
        .map((modal) => (
          <Dialog key={modal.id} visible={modal.isVisible} onHide={() => closeModal(modal.id)} modal={false}>
            {modal.component ? createElement(modal.component as React.ComponentType<any>) : null}
          </Dialog>
        ))}
    </>
  );
};

export default GlobalModal;
