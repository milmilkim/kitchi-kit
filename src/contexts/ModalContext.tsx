'use client';

import React, { PropsWithChildren, createContext, useState } from 'react';

interface Modal {
  id: string;
  isVisible: boolean;
  component?: React.ComponentType<any> | React.ReactNode;
}

const initialModalState: Modal[] = [];

const ModalContext = createContext<{
  modals: Modal[];
  openModal: (id: string, component: Modal['component']) => void;
  closeModal: (id: string) => void;
}>({
  modals: initialModalState,
  openModal: () => {},
  closeModal: () => {},
});

export const ModalProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [modals, setModals] = useState<Modal[]>(initialModalState);

  const openModal = (id: string, component: Modal['component']) => {
    if (modals.some((modal) => modal.id === id)) return;
    setModals([...modals, { id, isVisible: true, component }]);
  };

  const closeModal = (id: string) => {
    setModals(modals.filter((modal) => modal.id !== id));
  };

  return <ModalContext.Provider value={{ modals, openModal, closeModal }}>{children}</ModalContext.Provider>;
};

export default ModalProvider;
export { ModalContext };
