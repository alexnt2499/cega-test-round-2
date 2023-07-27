import { FetchBalanceResult } from "@wagmi/core";
import BigNumber from "bignumber.js";

const strToNumberStr = (input: string) => input.replace(/[^0-9-.]/g, "");

type DisplayDpOptions = {
  displayDp: number;
  roundingMode?: BigNumber.RoundingMode;
};

type NumberFloat = string | number | BigNumber;
type NumberInteger = string | number | bigint;

type FloatToFloatArgs = [
  value: NumberFloat, //
  options?: DisplayDpOptions
];
type IntegerToFloatArgs = [
  value: NumberInteger,
  decimals: number,
  options?: DisplayDpOptions
];
type FetchBalanceResultArgs = [
  value: FetchBalanceResult,
  options?: DisplayDpOptions
];

const isFetchBalanceResult = (
  result: (FloatToFloatArgs | IntegerToFloatArgs | FetchBalanceResultArgs)[0]
): result is FetchBalanceResult =>
  typeof result === "object" &&
  "value" in result &&
  typeof result.value === "bigint" &&
  "decimals" in result &&
  typeof result.decimals === "number";

const isDisplayDpOptions = (
  options: number | DisplayDpOptions | undefined
): options is DisplayDpOptions | undefined =>
  typeof options === "undefined" ||
  (typeof options === "object" &&
    "displayDp" in options &&
    typeof options.displayDp === "number");

const isFloatToFloatArgs = (
  args: FloatToFloatArgs | IntegerToFloatArgs | FetchBalanceResultArgs
): args is FloatToFloatArgs => isDisplayDpOptions(args[1]);

const isIntegerToFloatArgs = (
  args: FloatToFloatArgs | IntegerToFloatArgs | FetchBalanceResultArgs
): args is IntegerToFloatArgs =>
  typeof args[1] === "number" && isDisplayDpOptions(args[2]);

const isFetchBalanceResultArgs = (
  args: FloatToFloatArgs | IntegerToFloatArgs | FetchBalanceResultArgs
): args is FetchBalanceResultArgs =>
  isFetchBalanceResult(args[0]) && isDisplayDpOptions(args[1]);

const bigNumberFrom = (value: NumberFloat | NumberInteger) => {
  if (BigNumber.isBigNumber(value)) return value;
  if (typeof value === "string") return new BigNumber(strToNumberStr(value));
  if (typeof value === "number") return new BigNumber(value);
  if (typeof value === "bigint") return new BigNumber(value.toString());
  return new BigNumber(String(value));
};

export const toBigNumber = (
  ...args: FloatToFloatArgs | IntegerToFloatArgs | FetchBalanceResultArgs
): BigNumber => {
  if (isFetchBalanceResultArgs(args)) {
    const [{ value, decimals }, options] = args;
    return toBigNumber(value, decimals, options);
  } else if (isFloatToFloatArgs(args)) {
    const [value, options] = args;
    const bigNumber = bigNumberFrom(value);
    return options
      ? bigNumber.decimalPlaces(
          options.displayDp,
          options?.roundingMode ?? BigNumber.ROUND_DOWN
        )
      : bigNumber;
  } else if (isIntegerToFloatArgs(args)) {
    const [value, decimals, options] = args as IntegerToFloatArgs;
    const bigNumber = bigNumberFrom(value);
    return toBigNumber(bigNumber.shiftedBy(-decimals), options);
  }
  return new BigNumber(0);
};

export const formatNumber = (
  ...args: FloatToFloatArgs | IntegerToFloatArgs | FetchBalanceResultArgs
) => toBigNumber(...args).toFormat();

export const toBigInt = (
  ...args:
    | [value: NumberInteger] // integer to integer
    | [value: NumberFloat, decimals: number] // float to integer
): bigint => {
  try {
    if (args.length === 1) {
      const [value] = args;
      if (typeof value === "bigint") return value;
      if (typeof value === "number") return BigInt(parseInt(String(value), 10));
      if (typeof value === "string") return BigInt(value);
    } else {
      const [value, decimals] = args;
      const bigNumber = toBigNumber(value).shiftedBy(decimals).decimalPlaces(0);
      if (bigNumber.isNaN()) return 0n;
      return toBigInt(bigNumber.toString());
    }
    throw new Error(`Invalid toBigInt args: ${args}`);
  } catch (error) {
    console.error(error);
    return 0n;
  }
};
