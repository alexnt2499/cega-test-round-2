import { ChainConnection } from "../contexts/useConnectWalletContext";

export interface ILedger {
  id: number;
  created_at: string;
  transaction_type: "deposit" | "withdraw";
  amount: number;
  chain_name: ChainConnection;
  wallet_address: string;
}
