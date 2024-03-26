"use client";

import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from "react";

interface ModalState {
  isVisible: boolean;
  content: React.ReactNode | null;
  props: any;
}

const initialModalState: ModalState = {
  isVisible: false,
  content: null,
  props: {},
};

const ModalContext = createContext<{
  modalState: ModalState;
  openModal: (content: React.ReactNode, props?: any) => void;
  closeModal: () => void;
}>({
  modalState: initialModalState,
  openModal: () => {},
  closeModal: () => {},
});

export const ModalProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [modalState, setModalState] = useState<ModalState>(initialModalState);

  const openModal = (content: React.ReactNode, props = {}) => {
    setModalState({ isVisible: true, content, props });
  };

  const closeModal = () => {
    setModalState(initialModalState);
  };

  return (
    <ModalContext.Provider value={{ modalState, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

// Hook
export const useModal = () => useContext(ModalContext);
