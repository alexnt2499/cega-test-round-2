import { ChainConnection } from "../contexts/useConnectWalletContext";
import { ILedger } from "./types";

export const fetchAllLedger = async (): Promise<ILedger[]> => {
  const response = await fetch("https://cega-careers-ledger.glitch.me/ledger");
  const data: ILedger[] = await response.json();
  return data;
};

export const depositToLedger = async (
  transaction_type: "deposit" | "withdraw",
  amount: bigint,
  chain_name: ChainConnection,
  wallet_address: string
) => {
  const response = await fetch(
    "https://cega-careers-ledger.glitch.me/ledger/transaction_type",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        transaction_type,
        amount: Number(amount),
        chain_name,
        wallet_address,
      }),
    }
  );
  const data: ILedger = await response.json();
  return data;
};
