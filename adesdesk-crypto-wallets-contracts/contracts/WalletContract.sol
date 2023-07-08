// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract WalletContract {
    address immutable owner;
    event FundsReceived(address indexed owner, uint256 amount);
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
    function transfer(WalletContract to, address token, uint256 amount) external {
        if (token == address(0)) {
            // If the token is ETH (address 0), transfer the specified amount of ETH
            require(balances[msg.sender] >= amount, "Insufficient balance");

            balances[msg.sender] -= amount;
            balances[address(to)] += amount;

            payable(address(to)).transfer(amount); // Transfer ETH to the specified wallet
        } else {
            // If the token is an ERC-20 token, transfer the specified amount of tokens
            IERC20 tokenContract = IERC20(token);
            require(tokenContract.balanceOf(address(this)) >= amount, "Insufficient balance");
            
            balances[msg.sender] -= amount;
            balances[address(to)] += amount;

            require(tokenContract.transfer(address(to), amount), "Token transfer failed"); // Transfer tokens to the specified wallet
        }
    }

    // enable owner receive funds and reflect such in their balance
    receive() external payable {
        balances[owner] += msg.value;
        emit FundsReceived(owner, msg.value);
    }


}

