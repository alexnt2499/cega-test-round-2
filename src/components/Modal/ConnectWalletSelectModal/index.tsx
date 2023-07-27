import { ActionIcon, Button, Flex, Modal } from "@mantine/core";
import { useModalContext } from "../../../contexts/useModalContext";
import { eth_logo, sol_logo } from "../../../assets";
import {
  ChainConnection,
  useConnectWallet,
} from "../../../contexts/useConnectWalletContext";
import WagmiWalletConnect from "./WagmiWalletConnect";
import { IconArrowLeft } from "@tabler/icons-react";
import SolanaWalletConnect from "./SolanaWalletConnect";

const ConnectWalletSelectModal = () => {
  const { connectWalletSelectModal } = useModalContext();
  const { onSetChainConnection, connectWalletContext, onResetChainConnection } =
    useConnectWallet();

  const renderSelectChain = () => {
    return (
      <>
        <Button
          leftIcon={<img src={eth_logo} width={30} />}
          variant="default"
          size="lg"
          fullWidth
          display={"flex"}
          onClick={() => onSetChainConnection(ChainConnection.EthereumMainnet)}
        >
          Ethereum
        </Button>

        <Button
          leftIcon={<img src={sol_logo} width={30} />}
          variant="default"
          size="lg"
          mt={15}
          fullWidth
          display={"flex"}
          onClick={() => onSetChainConnection(ChainConnection.SolanaMainnet)}
        >
          Solana
        </Button>
      </>
    );
  };

  const selectBuilder = () => {
    switch (connectWalletContext.chainConnection) {
      case ChainConnection.SolanaMainnet:
        return <SolanaWalletConnect />;
      case ChainConnection.EthereumMainnet:
        return <WagmiWalletConnect />;
      default:
        return renderSelectChain();
    }
  };

  const renderTitle = () => {
    switch (connectWalletContext.chainConnection) {
      case ChainConnection.SolanaMainnet:
      case ChainConnection.EthereumMainnet:
        return (
          <>
            <ActionIcon onClick={onResetChainConnection} mr={2}>
              <IconArrowLeft size="1.150rem" />
            </ActionIcon>
            <h2>Select wallet</h2>
          </>
        );
      default:
        return <h2>Select chain</h2>;
    }
  };

  return (
    <Modal
      opened={connectWalletSelectModal.opened}
      onClose={connectWalletSelectModal.close}
      title={
        <Flex px={0} display={"flex"} align={"center"}>
          {renderTitle()}
        </Flex>
      }
      centered
      size={"xs"}
    >
      {selectBuilder()}
    </Modal>
  );
};

export default ConnectWalletSelectModal;
