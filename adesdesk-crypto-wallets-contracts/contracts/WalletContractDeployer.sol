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
    
    mapping(address => mapping(address => uint256)) public tokenBalances;

    event WalletCreated(address indexed owner, address indexed walletAddress);
    event Transfer(address indexed from, address indexed to, uint256 amount);

    function createWallet() external {
        require(wallets[msg.sender].owner == address(0), "Wallet already exists");
        address newWalletAddress = address(new WalletContract(msg.sender));
        wallets[msg.sender] = Wallet(msg.sender, newWalletAddress);
        ownerToWallet[msg.sender] = newWalletAddress;
        emit WalletCreated(msg.sender, newWalletAddress);
    }

    function getBalance(address walletOwner) external view returns (uint256) {
        WalletContract wallet = WalletContract(payable(ownerToWallet[walletOwner]));
        return wallet.getBalance();
    }

    function getWalletOwner(address walletAddress) external view returns (address) {
        return wallets[walletAddress].owner;
    }

    function getWalletAddress(address walletOwner) external view returns (address) {
        return ownerToWallet[walletOwner];
    }

    function transfer(address from, address to, address token, uint256 amount) external {
        require(wallets[from].owner != address(0), "Sender wallet does not exist");
        require(wallets[to].owner != address(0), "Receiver wallet does not exist");

        WalletContract fromWallet = WalletContract(payable(ownerToWallet[from]));
        WalletContract toWallet = WalletContract(payable(ownerToWallet[to]));

        require(fromWallet.getBalance() >= amount, "Insufficient balance");

        fromWallet.transfer(toWallet, token, amount);
        emit Transfer(from, to, amount);
    }
}