// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract WalletContract {
    address immutable owner;
    mapping(address => uint256) public balances;

    modifier onlyOwner() {
        require(msg.sender == owner, "Caller is not the owner");
        _;
    }

    constructor(address walletOwner) {
        require(walletOwner != address(0), "Invalid wallet owner address"); // validate that the walletOwner address is not the zero address 
        owner = walletOwner; // Set the wallet owner during contract deployment
    }

    // Returns the balance of the contract
    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }

    // Transfer funds from the contract to another wallet or token contract
    function transfer(WalletContract to, address token, uint256 amount) external onlyOwner {
        if (token == address(0)) {
            // If the token is ETH (address 0), transfer the specified amount of ETH
            require(address(this).balance >= amount, "Insufficient balance");
            payable(address(to)).transfer(amount); // Transfer ETH to the specified wallet
        } else {
            // If the token is an ERC-20 token, transfer the specified amount of tokens
            IERC20 tokenContract = IERC20(token);
            require(tokenContract.balanceOf(address(this)) >= amount, "Insufficient balance");
            require(tokenContract.transfer(address(to), amount), "Token transfer failed"); // Transfer tokens to the specified wallet
        }
    }

}
