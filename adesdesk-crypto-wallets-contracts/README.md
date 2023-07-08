# Project Title
Wallets-by-account-abstraction-in-solidity

## Description

This project consists of 2 main solidity smart contracts. The WalletContract.sol implements a smart contract wallet for users using account abstraction, while the WalletContractDeployer.sol enables various users to create their unique wallet, and keeps track of each owner's corresponding wallets and token balances. The contract bundle, including its imported library - OpenZeppelin's IERC20 interface functions to enable wallet owners maintain, receive and send ERC20 standard compliant tokens. This version implements support for my custom test tokens named ADESCOIN. Users of this wallet get to seamlessly send, receive, and retain balances of the ADESCOIN tokens, while the same principle can be applied to other ERC20 standards compliant tokens.

## Getting Started

### Installing
* Clone this repository to get an exact copy of this program on your computer.
* Open the repository folder in your preferred command line interface. 
* Using the terminal in VSCode is a good option, since you will also need  to access the sub-folders and files in an IDE.
* In the root directry of the smart contracts folder, create an additional document named exactly ".env" (quotes not inclusive), where you should add your evnvironment variables according to the variable names available in the hardhat.config.js file, or as you may choose to.
* Back in the terminal, once in the project folder, navigate into the smart contracts application folder by running the following commands in the same order.

```
cd adesdesk-crypto-wallets-contracts
npm install
npx hardhat run scripts/deploy.js --network mumbai
```

* Take note of the contract addresses printed out to the console on successful deployment and grab the address of WalletsContractDeployer.sol for use in the frontend component. 
* Replace the address assigned to "const walletContractDeployerAddress" in the files name "SendFunds.js" and "WalletUserDashboard.js" available at the file path "adesdesk-crypto-wallets-ui/src/AppPages/".

* Open a split terminal and in the second split, navigate into the frontend application folder by running the command.

```
cd adesdesk-crypto-wallets-ui
npm install
npm start
```

* Look out for an automatic launch of your device default browser with the content of the frontend app rendered for your interaction.

### Executing program

* When the app is launched on your browser, simply connect an ethereum wallet that has some test Ether of the corresponding network to which your deployment was made.
* This will give you access to other sections of the application so that you can carry out transactions as you dim necessary.
* Follow the messages conveyed in texts and labels of each button and interfaces to conduct your desired transactions.

## Help

* Note that you have to save every change you make to the file contents inorder to see them take effect where it matters.
* If the default browser does not start automatically after the "npm start" command, you will need to start a browser on your own and browse the url http://localhost:3000

## Authors

Contributor(s) names and contact info

Name: Adeola David Adelakun

Email: adesdesk@outlook.com

## License

This project is licensed under the MIT License - see the LICENSE.md file for details

## Smart Contract addresses
WalletContract deployed to: 0x040D5ee3125D0B4c066c5c9565801D1B62A81da2
WalletContractDeployer deployed to: 0x87537680E0f6C972E6b05AAdF5b5902a072B0859