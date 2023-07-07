// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import './WalletContract.sol';

contract WalletContractDeployer {
    struct Wallet {
        address owner;
        address walletAddress;
    }

    mapping(address => Wallet) private wallets;
    mapping(address => address) private ownerToWallet;
    
    // Mapping to store balances of different tokens for each wallet
    mapping(address => mapping(address => uint256)) public tokenBalances;

    event WalletCreated(address indexed owner, address indexed walletAddress);
    event Transfer(address indexed from, address indexed to, uint256 amount);

    // Create a new wallet for the sender
    function createWallet() external {
        require(wallets[msg.sender].owner == address(0), "Wallet already exists");
        address newWalletAddress = address(new WalletContract(msg.sender));
        wallets[msg.sender] = Wallet(msg.sender, newWalletAddress);
        ownerToWallet[msg.sender] = newWalletAddress;
        emit WalletCreated(msg.sender, newWalletAddress); // Emit an event to indicate that a wallet was created
    }

    // Get the balance of the wallet
    function getBalance(address walletOwner) external view returns (uint256) {
        return WalletContract(ownerToWallet[walletOwner]).getBalance(); // Retrieve the balance of the specified wallet using the WalletContract
    }

    // Get the owner of a wallet
    function getWalletOwner(address walletAddress) external view returns (address) {
        return wallets[walletAddress].owner; // Retrieve the owner of the specified wallet
    }

    // Get the wallet address for a known owner address
    function getWalletAddress(address walletOwner) external view returns (address) {
        return ownerToWallet[walletOwner]; // Retrieve the wallet address for the known owner address
    }

    // Transfer funds from one wallet to another
    function transfer(address from, address to, address token, uint256 amount) external {
        require(wallets[from].owner != address(0), "Sender wallet does not exist");
        require(wallets[to].owner != address(0), "Receiver wallet does not exist");

        WalletContract fromWallet = WalletContract(ownerToWallet[from]); // Get the WalletContract instance for the sender's wallet
        WalletContract toWallet = WalletContract(ownerToWallet[to]); // Get the WalletContract instance for the receiver's wallet

        require(fromWallet.getBalance() >= amount, "Insufficient balance"); // Check if the sender's wallet has sufficient balance

        fromWallet.transfer(toWallet, token, amount); // Transfer the specified amount of funds from the sender's wallet to the receiver's wallet
        emit Transfer(from, to, amount); // Emit an event to indicate the transfer
    }
}
