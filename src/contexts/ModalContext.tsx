'use client';

import React, { PropsWithChildren, createContext, useContext, useState } from 'react';

interface ModalState {
  isVisible: boolean;
}

const initialModalState: ModalState = {
  isVisible: false,
};

const ModalContext = createContext<{
  modalState: ModalState;
  openModal: () => void;
  closeModal: () => void;
}>({
  modalState: initialModalState,
  openModal: () => {},
  closeModal: () => {},
});

export const ModalProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [modalState, setModalState] = useState<ModalState>(initialModalState);

  const openModal = () => {
    setModalState({ isVisible: true });
  };

  const closeModal = () => {
    setModalState(initialModalState);
  };

  return <ModalContext.Provider value={{ modalState, openModal, closeModal }}>{children}</ModalContext.Provider>;
};

export default ModalProvider;
export { ModalContext };
