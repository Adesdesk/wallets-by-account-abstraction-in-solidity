# Project Title
Wallets-by-account-abstraction-in-solidity

## Description

This project consists of 2 main solidity smart contracts. The WalletContract.sol implements a smart contract wallet for users using account abstraction, while the WalletContractDeployer.sol enables various users to create their unique wallet, and keeps track of each owner's corresponding wallets and token balances. The contract bundle, including its imported library - OpenZeppelin's IERC20 interface functions to enable wallet owners maintain, receive and send ERC20 standard compliant tokens. This version implements support for my custom test tokens named ADESCOIN. Users of this wallet get to seamlessly send, receive, and retain balances of the ADESCOIN tokens, while the same principle can be applied to other ERC20 standards compliant tokens.

## Getting Started
* Clone this repository to get an exact copy of this program on your computer by running the following command.

```
git clone https://github.com/Adesdesk/wallets-by-account-abstraction-in-solidity.git
```

### Installing
* Open the repository folder (now in your device) using your preferred command line interface. 
* Navigate into the frontend application folder by running the command.

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
WalletContract deployed to: 0xC232C23F2fe17D0fC0eCc55bdEbB083a176e9316

WalletContractDeployer deployed to: 0xc28Df48d0d94291d3704B7fD77FAB55b96CA2aFd