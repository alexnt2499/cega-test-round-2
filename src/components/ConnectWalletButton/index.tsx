import { ActionIcon, Button, CopyButton, Flex } from "@mantine/core";
import { useModalContext } from "../../contexts/useModalContext";
import { useWallet } from "@solana/wallet-adapter-react";
import { useEffect } from "react";
import { middleEllipsis } from "../../lib/converter/string";
import { useAccount } from "wagmi";
import { disconnect } from "@wagmi/core";
import { IconPlugConnectedX } from "@tabler/icons-react";
import { renderIcon } from "../Modal/ConnectWalletSelectModal/WagmiWalletConnect";

const ConnectWalletButton = () => {
  const { connectWalletSelectModal } = useModalContext();
  const {
    publicKey,
    connected,
    disconnect: solanaDisconnect,
    wallet,
  } = useWallet();
  const { address, isConnected, connector } = useAccount();

  useEffect(() => {
    if (publicKey || address) {
      connectWalletSelectModal.close();
    }
  }, [connectWalletSelectModal, publicKey, address]);

  const connectedBuilder = () => {
    if (publicKey && connected) {
      return (
        <Flex align={"center"} justify={"center"}>
          <CopyButton value={publicKey.toBase58()}>
            {({ copied, copy }) => (
              <Button
                color={"teal"}
                variant={copied ? "filled" : "default"}
                onClick={copy}
                leftIcon={
                  <img
                    src={wallet?.adapter.icon}
                    alt={wallet?.adapter.name}
                    height={20}
                  />
                }
              >
                {copied
                  ? "Copied address"
                  : middleEllipsis(publicKey.toBase58(), 4, 4)}
              </Button>
            )}
          </CopyButton>
          <ActionIcon
            onClick={() => {
              solanaDisconnect();
              disconnect();
            }}
            ml={10}
          >
            <IconPlugConnectedX size="1.250rem" />
          </ActionIcon>
        </Flex>
      );
    }
    if (address && isConnected) {
      return (
        <Flex align={"center"} justify={"center"}>
          <CopyButton value={address}>
            {({ copied, copy }) => (
              <Button
                color={"teal"}
                variant={copied ? "filled" : "default"}
                onClick={copy}
                leftIcon={renderIcon(connector?.id ?? "", 20)}
              >
                {copied ? "Copied address" : middleEllipsis(address, 4, 4)}
              </Button>
            )}
          </CopyButton>

          <ActionIcon
            onClick={() => {
              solanaDisconnect();
              disconnect();
            }}
            ml={10}
          >
            <IconPlugConnectedX size="1.250rem" />
          </ActionIcon>
        </Flex>
      );
    }
    return (
      <Button onClick={connectWalletSelectModal.open}>Connect wallet</Button>
    );
  };

  return connectedBuilder();
};

export default ConnectWalletButton;
