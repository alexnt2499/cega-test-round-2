# CEGA home test

Tech: ReactJS, Wagmi, @solana/web3.js, Bignumber.js, Mantine.dev, React Query, Typescript and more packages.

## Requirement

The following **required** and **option** functionality is completed:

# **required**

- [x] I want to see a summary of total deposits and transactions
  - [x] Page should show the sum of deposits in dollars (two decimals) across chains (labeled as TVL) less withdrawals
  - [x] Page should load even if no chain is specified / wallet connected
- [x] I want to connect my wallet
  - [x] I should be able to choose what chain I want to connect to
  - [x] I should be able to connect to a corresponding wallet (based on chain)
  - [x] I should be able to see what my wallet address is when I'm connected
  - [x] I should be able to disconnect my wallet
- [x] I want to deposit some money (note: no money is deposited, just use the API endpoint to mock)
  - [x] I should be depositing to the chain I've selected
  - [x] I shouldn't be able to deposit unless I'm connected to a wallet

# **option**

- [x] I get format and validate Deposit Input Form.
- [x] I change the wallet logo to each connected wallet.
- [x] I do a copy address function.

## Install and Run Project

> DEV environment

```sh
cd cega-test-round-2
npm install
npm run dev

```

> Production environment

```sh
cd cega-test-round-2
npm install
npm run build
npm run preview

```
