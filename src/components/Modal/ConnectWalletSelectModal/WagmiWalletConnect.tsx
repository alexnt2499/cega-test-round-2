import { Button } from "@mantine/core";
import { useConnect } from "wagmi";
import { coinbase_logo, metamask_logo } from "../../../assets";

export const renderIcon = (connectorId: string, size?: number) => {
  switch (connectorId) {
    case "metaMask":
      return <img src={metamask_logo} width={size ?? 30} />;
    case "coinbaseWallet":
      return <img src={coinbase_logo} width={size ?? 30} />;
  }
};

const WagmiWalletConnect = () => {
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();

  return (
    <div>
      {connectors.map((connector) => (
        <Button
          disabled={!connector.ready}
          key={connector.id}
          onClick={() => connect({ connector })}
          variant="default"
          size="lg"
          fullWidth
          display={"flex"}
          mb={15}
          loading={isLoading}
          leftIcon={renderIcon(connector.id)}
        >
          {connector.name}
          {isLoading && pendingConnector?.id === connector.id}
        </Button>
      ))}

      {error && <div>{error.message}</div>}
    </div>
  );
};

export default WagmiWalletConnect;
