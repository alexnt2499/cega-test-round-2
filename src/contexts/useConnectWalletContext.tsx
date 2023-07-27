import React, { createContext, useState } from "react";

export enum ChainConnection {
  EthereumMainnet = "ethereum-mainnet",
  SolanaMainnet = "solana-mainnet",
}

interface IConnectWalletContext {
  chainConnection: ChainConnection | null;
}

interface IContextValue {
  connectWalletContext: IConnectWalletContext;
  onSetChainConnection: (chainConnection: ChainConnection) => void;
  onResetChainConnection: () => void;
}

const contextValueInit: IContextValue = {
  connectWalletContext: { chainConnection: null },
  onSetChainConnection: () => {},
  onResetChainConnection: () => {},
};

export const ConnectWallet = createContext<IContextValue>(contextValueInit);

interface IModalProviderProps {
  children: React.ReactNode;
}

const ConnectWalletProvider = ({ children }: IModalProviderProps) => {
  const [chainConnection, setChainConnection] =
    useState<ChainConnection | null>(null);

  const contextValue = {
    connectWalletContext: { chainConnection },
    onSetChainConnection: (chainConnection: ChainConnection) => {
      setChainConnection(chainConnection);
    },
    onResetChainConnection: () => {
      setChainConnection(null);
    },
  };

  return (
    <ConnectWallet.Provider value={contextValue}>
      {children}
    </ConnectWallet.Provider>
  );
};

export const useConnectWallet = () => React.useContext(ConnectWallet);

export default ConnectWalletProvider;
