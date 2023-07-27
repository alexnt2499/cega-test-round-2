import { Button, Text } from "@mantine/core";
import { useWallet } from "@solana/wallet-adapter-react";

const SolanaWalletConnect = () => {
  const { select, wallets } = useWallet();

  return (
    <div>
      {wallets.map((wallet) => {
        return (
          <Button
            disabled={!wallet.readyState}
            key={wallet.adapter.name}
            onClick={() => select(wallet.adapter.name)}
            variant="default"
            size="lg"
            fullWidth
            display={"flex"}
            mb={15}
            leftIcon={
              <img
                src={wallet.adapter.icon}
                alt={wallet.adapter.name}
                height={30}
              />
            }
          >
            {wallet.adapter.name}
            {wallet.readyState === "Installed" && (
              <Text size={"xs"} ml={4} weight={"lighter"} color={"cyan"}>
                {" "}
                (detected)
              </Text>
            )}
          </Button>
        );
      })}
    </div>
  );
};

export default SolanaWalletConnect;
