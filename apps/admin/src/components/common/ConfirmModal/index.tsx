import { createContext, useContext, useState } from 'react';
import Popup from '../Popup';
import { Button } from '../../../components/common/shadcn-ui-kit/button';

export interface Confirm {
  open: boolean;
  action?: 'clone' | 'delete';
  selectedId: string;
}

interface Props {
  open: boolean;
  title?: string;
  description?: string;
  onClose(): any;
  onConfirm?(data?: any): any;
  onOpenChange(params?: any): any;
}

interface ModalInfo {
  open?: boolean;
  title?: string;
  description?: string;
  onConfirm?(data?: any): any;
}

const defaultConfirmModal: ModalInfo = {
  open: false,
  title: '',
  description: '',
};

const ConfirmModalContext = createContext<any>(undefined);

export function ConfirmModalWrapper({ children }: any) {
  const [modalInfo, setModalInfo] = useState<ModalInfo>(defaultConfirmModal);

  const closeModal = () => {
    setModalInfo((prev) => {
      return {
        ...prev,
        open: false,
      };
    });
  };

  const toggleModelOpen = () => {
    setModalInfo((prev) => {
      return {
        ...prev,
        open: !prev.open,
      };
    });
  };

  return (
    <ConfirmModalContext.Provider value={{ modalInfo, setModalInfo }}>
      {children}
      <ConfirmModal
        open={modalInfo.open || false}
        onOpenChange={toggleModelOpen}
        onClose={closeModal}
        title={modalInfo.title}
        description={modalInfo.description}
        onConfirm={modalInfo.onConfirm}
      />
    </ConfirmModalContext.Provider>
  );
}

export function useConfirmModal() {
  const { setModalInfo, setOpen } = useContext(ConfirmModalContext);

  const openModal = (info: ModalInfo) => {
    setModalInfo({ ...info, open: true });
  };

  return {
    openModal,
  };
}

export function ConfirmModal({
  open,
  title,
  description,
  onClose,
  onConfirm,
  onOpenChange,
}: Props) {
  const handleConfirm = () => {
    onConfirm?.();
    onClose();
  };

  return (
    <Popup
      open={open}
      onOpenChange={onOpenChange}
      title={title}
      actionEle={
        <>
          <Button onClick={onClose}>Cancel</Button>
          {onConfirm && (
            <Button onClick={handleConfirm} autoFocus>
              Confirm
            </Button>
          )}
        </>
      }
    >
      {description}
    </Popup>
  );
}
