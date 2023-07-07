// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import './WalletContract.sol';

contract WalletContractDeployer {
    struct Wallet {
        address owner;
    }

    mapping(address => Wallet) private wallets;

    event WalletCreated(address indexed owner);
    event Transfer(address indexed from, address indexed to, uint256 amount);

    // Create a new wallet for the sender
    function createWallet() external {
        require(wallets[msg.sender].owner == address(0), "Wallet already exists");
        wallets[msg.sender].owner = address(new WalletContract(msg.sender)); // Create a new instance of WalletContract for the sender
        emit WalletCreated(msg.sender); // Emit an event to indicate that a wallet was created
    }

    // Get the balance of the wallet
    function getBalance(address walletOwner) external view returns (uint256) {
        return WalletContract(wallets[walletOwner].owner).getBalance(); // Retrieve the balance of the specified wallet using the WalletContract
    }

    // Transfer funds from one wallet to another
    function transfer(address from, address to, address token, uint256 amount) external {
        require(wallets[from].owner != address(0), "Sender wallet does not exist");
        require(wallets[to].owner != address(0), "Receiver wallet does not exist");

        WalletContract fromWallet = WalletContract(wallets[from].owner); // Get the WalletContract instance for the sender's wallet
        WalletContract toWallet = WalletContract(wallets[to].owner); // Get the WalletContract instance for the receiver's wallet

        require(fromWallet.getBalance() >= amount, "Insufficient balance"); // Check if the sender's wallet has sufficient balance

        fromWallet.transfer(toWallet, token, amount); // Transfer the specified amount of funds from the sender's wallet to the receiver's wallet
        emit Transfer(from, to, amount); // Emit an event to indicate the transfer
    }
}

    