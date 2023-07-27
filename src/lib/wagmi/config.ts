import { configureChains, createConfig } from "wagmi";
import { mainnet } from "@wagmi/core/chains";
import { publicProvider } from "wagmi/providers/public";
import { MetaMaskConnector } from "@wagmi/core/connectors/metaMask";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { alchemyAPIKey } from "../../configs/mainConfig";

const chainsSupport = [mainnet];

const { chains, publicClient, webSocketPublicClient } = configureChains(
  chainsSupport,
  [alchemyProvider({ apiKey: alchemyAPIKey }), publicProvider()]
);

export const config = createConfig({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({
      chains,
    }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: "AlexTest",
      },
    }),
  ],
  publicClient,
  webSocketPublicClient,
});
