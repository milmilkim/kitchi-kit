import React from "react";
import { Dialog } from "primereact/dialog";
import { useModal } from "@/contexts/ModalContext";

const GlobalModal: React.FC = () => {
  const { modalState, closeModal } = useModal();

  return (
    <Dialog
      visible={modalState.isVisible}
      onHide={closeModal}
      {...modalState.props}
    >
      {modalState.content}
    </Dialog>
  );
};

export default GlobalModal;
