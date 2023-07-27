import { useMemo } from "react";
import { ILedger } from "../apis/types";
import BigNumber from "bignumber.js";

export const useCalculate = (listLedger?: ILedger[]) => {
  const totalDeposit = useMemo(() => {
    if (!listLedger) return BigNumber(0);
    return BigNumber.sum(
      ...listLedger
        .filter((record) => record.transaction_type === "deposit")
        .map((record) => record.amount)
    );
  }, [listLedger]);

  const tvl = useMemo(() => {
    if (!listLedger) return BigNumber(0);
    const sumWithdraw = BigNumber.sum(
      ...listLedger
        .filter((record) => record.transaction_type === "withdraw")
        .map((record) => record.amount)
    );

    return totalDeposit.minus(sumWithdraw);
  }, [listLedger, totalDeposit]);

  return {
    totalDeposit,
    tvl,
  };
};
