import { MantineProvider } from "@mantine/core";
import HomeContainer from "./containers/HomeContainer";
import ModalProvider from "./contexts/useModalContext";
import ConnectWalletSelectModal from "./components/Modal/ConnectWalletSelectModal";
import { WagmiConfig } from "wagmi";
import { config } from "./lib/wagmi/config";
import ConnectWalletProvider from "./contexts/useConnectWalletContext";
import SolanaConnectWalletContext from "./contexts/useSolanaConnectWalletContext";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient();

const App = () => {
  return (
    <MantineProvider
      theme={{ colorScheme: "dark" }}
      withGlobalStyles
      withNormalizeCSS
    >
      <QueryClientProvider client={queryClient}>
        <WagmiConfig config={config}>
          <SolanaConnectWalletContext>
            <ConnectWalletProvider>
              <ModalProvider>
                <HomeContainer />
                <ConnectWalletSelectModal />
                <ToastContainer />
              </ModalProvider>
            </ConnectWalletProvider>
          </SolanaConnectWalletContext>
        </WagmiConfig>
      </QueryClientProvider>
    </MantineProvider>
  );
};

export default App;
