import { useMutation, useQuery } from "react-query";
import MainLayout from "../layouts/MainLayout";
import { depositToLedger, fetchAllLedger } from "../apis/cega";
import { Button, Flex, Loader, Table, Text } from "@mantine/core";
import { middleEllipsis } from "../lib/converter/string";
import { formatNumber, toBigInt } from "../lib/converter/number";
import { formatDate } from "../lib/converter/date";
import { useCalculate } from "../hooks/useCalculate";
import DepositForm from "../components/DepositForm/DepositInput";
import { useState } from "react";
import { useCheckConnectedChain } from "../hooks/useCheckConnectedChain";
import { useModalContext } from "../contexts/useModalContext";
import { ChainConnection } from "../contexts/useConnectWalletContext";
import { toast } from "react-toastify";

const HomeContainer = () => {
  const [depositAmount, setDepositAmount] = useState<number | string>("");
  const { connectWalletSelectModal } = useModalContext();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["fetchAllLedger"],
    queryFn: fetchAllLedger,
  });

  const { totalDeposit, tvl } = useCalculate(data);
  const { chainConnected, addressCurrent } = useCheckConnectedChain();

  const { mutate, isLoading: depositIsLoading } = useMutation({
    mutationKey: "deposit",
    mutationFn: () =>
      depositToLedger(
        "deposit",
        depositAmount ? toBigInt(depositAmount, 6) : toBigInt(0),
        chainConnected ?? ChainConnection.EthereumMainnet,
        addressCurrent ?? ""
      ),
    onSuccess: () => {
      toast.success(`You have deposited successfully $${depositAmount}!`);
      setDepositAmount("");
      refetch();
    },
    onError: (error) => {
      console.log(error);
      toast.error(`Deposit failed, please try again!`);
    },
  });

  return (
    <MainLayout>
      <Flex mt={60} mb={20} justify={"end"} align={"center"}>
        <DepositForm
          onChange={(e) => {
            setDepositAmount(e.target.value);
          }}
          placeholder="0.0"
          value={depositAmount}
          disabled={!chainConnected || depositIsLoading}
        />
        <Button
          onClick={() => {
            if (!chainConnected) {
              connectWalletSelectModal.open();
            } else {
              if (!depositAmount || Number(depositAmount) === 0) return;
              mutate();
            }
          }}
          ml={10}
          variant={chainConnected ? "filled" : "default"}
          loading={depositIsLoading}
        >
          <Text>{chainConnected ? "Deposit" : "Connect your wallet"}</Text>
        </Button>
      </Flex>
      <Flex my={10}>
        <Text size={30} weight={700} mr={100}>
          Total deposit: $
          {totalDeposit
            ? formatNumber(totalDeposit.toString(), 6, { displayDp: 2 })
            : 0}
        </Text>

        <Text size={30} weight={700}>
          TVL: ${tvl ? formatNumber(tvl.toString(), 6, { displayDp: 2 }) : 0}
        </Text>
      </Flex>
      <Table striped highlightOnHover withBorder>
        <thead>
          <tr>
            <th>ID</th>
            <th>Address</th>
            <th>Amount</th>
            <th>Transaction Type</th>
            <th>Chain name</th>
            <th>Created at</th>
          </tr>
        </thead>
        <tbody>
          {!isLoading &&
            data?.map((item) => {
              return (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{middleEllipsis(item.wallet_address, 6, 4)}</td>
                  <td>${formatNumber(item.amount, 6, { displayDp: 2 })}</td>
                  <td>{item.transaction_type}</td>
                  <td>{item.chain_name}</td>
                  <td>{formatDate(item.created_at)}</td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      {isLoading && (
        <Flex align={"center"} mt={10} justify={"center"} w={"100%"}>
          <Loader size={"sm"} />
        </Flex>
      )}
    </MainLayout>
  );
};

export default HomeContainer;
