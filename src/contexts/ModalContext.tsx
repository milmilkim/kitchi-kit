'use client';

import { DialogProps } from 'primereact/dialog';
import React, { PropsWithChildren, createContext, useState } from 'react';

interface Modal {
  id: string;
  isVisible: boolean;
  component: React.ComponentType<any> | React.ReactNode;
  props?: DialogProps;
}

const initialModalState: Modal[] = [];

const ModalContext = createContext<{
  modals: Modal[];
  openModal: (id: string, component: Modal['component'], props?: DialogProps) => Promise<void>;
  closeModal: (id: string) => Promise<void>;
}>({
  modals: initialModalState,
  openModal: () => Promise.resolve(),
  closeModal: () => Promise.resolve(),
});

export const ModalProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [modals, setModals] = useState<Modal[]>(initialModalState);

  const openModal = (id: string, component: Modal['component'], props?: DialogProps): Promise<void> => {
    return new Promise((resolve) => {
      if (modals.some((modal) => modal.id === id)) {
        resolve();
        return;
      }

      setModals((prevModals) => [...prevModals, { id, isVisible: true, component, props }]);
      resolve();
    });
  };

  const closeModal = (id: string): Promise<void> => {
    return new Promise((resolve) => {
      setModals((prevModals) => {
        const filteredModals = prevModals.filter((modal) => modal.id !== id);
        if (filteredModals.length !== prevModals.length) {
          resolve(); // 모달 상태가 실제로 변경되었다면 프로미스를 해결함
        }
        return filteredModals;
      });
    });
  };

  return <ModalContext.Provider value={{ modals, openModal, closeModal }}>{children}</ModalContext.Provider>;
};

export default ModalProvider;
export { ModalContext };
