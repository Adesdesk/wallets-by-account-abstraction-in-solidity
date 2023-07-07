// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// The IERC20 interface to enable interaction with ERC-20 compliant tokens in a standardized manner
interface IERC20 {
    function transfer(address recipient, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
}

contract WalletContract {
    address public owner;

    modifier onlyOwner() {
        require(msg.sender == owner, "Caller is not the owner");
        _;
    }

    constructor(address walletOwner) {
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
            tokenContract.transfer(address(to), amount); // Transfer tokens to the specified wallet
        }
    }
}
