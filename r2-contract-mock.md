# Frontend Hiring Exercises

```
TIMEBOX:    2-4 hours max.
LANGUAGES:  Typescript, React, HTML / CSS
WEB2 FRAMEWORKS: React and any libraries you want. We use Mantine (https://mantine.dev/) and MUI(https://mui.com/).
WEB3 FRAMEWORKS: Wagmi/Ethers.js on Ethereum and Web3.js on Solana
TESTS:      nice to have, but not mandatory
DOCS:       nice to have, but not mandatory
```

# Overview
We're evaluating your ability to take a set of requirements and build a solution that demonstrates craftsmanship, thoughtfulness and attention to user experience. The best solution is one that is easy for the end-user and easy for developers to debug/test/extend.

Ideally, we should be able to run your solution locally and visualize the results in a browser!

# Choose one of the exercises below

## Exercise 1: Multichain Wallet Connections
### User Story: As a defi degen user

* I want to see a summary of total deposits and transactions
  * Page should show the sum of deposits in dollars (two decimals) across chains (labeled as TVL) less withdrawals
  * Page should load even if no chain is specified / wallet connected
* I want to connect my wallet
  * I should be able to choose what chain I want to connect to
  * I should be able to connect to a corresponding wallet (based on chain)
  * I should be able to see what my wallet address is when I'm connected
  * I should be able to disconnect my wallet
* I want to deposit some money (note: no money is deposited, just use the API endpoint to mock)
  * I should be depositing to the chain I've selected
  * I shouldn't be able to deposit unless I'm connected to a wallet

### API Mock Details
* Wallet Connectors
  * Ethereum: feel free to use wagmi.sh and ethers.js
  * Solana: feel free to use [Solana Lab's Wallet Adapater](https://github.com/solana-labs/wallet-adapter)
* Data
  * `transaction_type` can be either `["deposit", "withdraw"]`
  * `amount` is USDC stored with 6 decimal places
  * `chain_name` can be either `["ethereum-mainnet", "solana-mainnet"]`
  * `wallet_address` is the wallet address as a string value

* Transaction Summary
  * `get` to `https://cega-careers-ledger.glitch.me/ledger`
* Deposit
  * `post` to `https://cega-careers-ledger.glitch.me/ledger/transaction_type` with body `{ "transaction_type", TRANSACTION_TYPE, "amount": AMOUNT_TO_BE_DEPOSITED, "chain_name": CHAIN_NAME, "wallet_address": WALLET_ADDRESS }`


# Submitting your exercise

1. See [instructions for submitting your work](https://github.com/cega-fi/careers/blob/main/README.md#general-instructions)