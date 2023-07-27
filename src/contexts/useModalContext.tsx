import { useDisclosure } from "@mantine/hooks";
import React, { createContext, useMemo } from "react";

interface IModalContext {
  opened: boolean;
  open: () => void;
  close: () => void;
}

interface IContextValue {
  connectWalletSelectModal: IModalContext;
}

const contextValueInit: IContextValue = {
  connectWalletSelectModal: { opened: false, open: () => {}, close: () => {} },
};

export const ModalContext = createContext<IContextValue>(contextValueInit);

interface IModalProviderProps {
  children: React.ReactNode;
}

const ModalProvider = ({ children }: IModalProviderProps) => {
  const [opened, { open, close }] = useDisclosure(false);

  const contextValue = useMemo(
    () => ({
      connectWalletSelectModal: { opened, open, close },
    }),
    [opened, open, close]
  );

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => React.useContext(ModalContext);

export default ModalProvider;
