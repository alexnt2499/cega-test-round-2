import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import useCombinedRefs from "../../hooks/useCombineRef";
import { createStyles } from "@mantine/core";

const useStyles = createStyles(() => ({
  inputCustom: {
    padding: "8px 15px",
    border: "1px solid #ccc",
    borderRadius: 5,
  },
}));

const inputRegex = RegExp(`^\\d*(?:\\\\[.])?\\d*$`);
function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
}
interface IDepositInput
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  decimals?: number;
}

const DepositInput: FC<IDepositInput> = ({
  decimals: _d,
  onChange,
  ref,
  ...rest
}) => {
  const { classes } = useStyles();

  const _ref = useRef<HTMLInputElement>(null);
  const targetRef = useCombinedRefs<HTMLInputElement>(_ref, ref);

  const [previousVal, setPreviousVal] = useState("");
  const decimals = useMemo(() => {
    if (typeof _d === "number") {
      return Math.min(_d, 8);
    }
  }, [_d]);

  const _onChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      const raw = e.target.value.replace(/,/g, ".").replace(/^0+/, "0");

      if (raw === "" || inputRegex.test(escapeRegExp(raw))) {
        const numDecimals = raw.split(".")[1]?.length || 0;
        if (
          typeof decimals === "number" &&
          decimals >= 0 &&
          numDecimals > decimals
        ) {
          e.target.value = previousVal;
        } else {
          e.target.value = raw;
          setPreviousVal(raw);
        }
      } else {
        e.target.value = previousVal;
      }
      if (typeof onChange === "function") {
        onChange(e);
      }
    },
    [onChange, previousVal, decimals]
  );

  useEffect(() => {
    if (typeof rest.value !== "string") return;
    const raw = rest.value.replace(/,/g, ".") || "";
    setPreviousVal(raw);
  }, [rest.value]);

  return (
    <div>
      <input
        {...rest}
        ref={targetRef}
        type="text"
        // universal input options
        inputMode="decimal"
        autoComplete="off"
        autoCorrect="off"
        pattern="^[0-9]*[.,]?[0-9]*$"
        minLength={1}
        maxLength={79}
        spellCheck="false"
        onChange={_onChange}
        className={classes.inputCustom}
      />
    </div>
  );
};

export default DepositInput;
