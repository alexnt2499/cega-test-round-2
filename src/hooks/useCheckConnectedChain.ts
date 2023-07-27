import { useWallet } from "@solana/wallet-adapter-react";
import { useMemo } from "react";
import { useAccount } from "wagmi";
import { ChainConnection } from "../contexts/useConnectWalletContext";

export const useCheckConnectedChain = () => {
  const { publicKey, connected } = useWallet();
  const { address, isConnected } = useAccount();

  const chainConnected = useMemo(() => {
    if (publicKey && connected) {
      return ChainConnection.SolanaMainnet;
    }
    if (address && isConnected) {
      return ChainConnection.EthereumMainnet;
    }
    return null;
  }, [publicKey, connected, address, isConnected]);

  const addressCurrent = useMemo(() => {
    if (publicKey && connected) {
      return publicKey.toBase58();
    }
    if (address && isConnected) {
      return address;
    }
    return null;
  }, [publicKey, connected, address, isConnected]);

  return {
    chainConnected,
    addressCurrent,
  };
};
