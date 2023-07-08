// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract WalletContract {
    address immutable owner;
    event FundsReceived(address indexed owner, uint256 amount);
    mapping(address => uint256) public balances;
    mapping(address => mapping(address => uint256)) public tokenBalances;
    address public constant maticTokenAddress = 0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889; // MATIC token address


    modifier onlyOwner() {
        require(msg.sender == owner, "Caller is not the owner");
        _;
    }

    constructor(address walletOwner) {
        require(walletOwner != address(0), "Invalid wallet owner address");
        owner = walletOwner;
    }

    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }

    function transfer(WalletContract to, address token, uint256 amount) external {
        if (token == address(0)) {
            require(balances[msg.sender] >= amount, "Insufficient balance");

            balances[msg.sender] -= amount;
            balances[address(to)] += amount;

            payable(address(to)).transfer(amount);
        } else {
            IERC20 tokenContract = IERC20(token);
            require(tokenContract.balanceOf(address(this)) >= amount, "Insufficient balance");

            balances[msg.sender] -= amount;
            balances[address(to)] += amount;

            require(tokenContract.transfer(address(to), amount), "Token transfer failed");
        }
    }

    receive() external payable {
        balances[owner] += msg.value;
        emit FundsReceived(owner, msg.value);
    }

    function receiveMATIC() external payable {}

    function receiveMATIC(uint256 amount) external {
        balances[owner] += amount;
        emit FundsReceived(owner, amount);
    }

    function getMATICBalance() external view returns (uint256) {
        return tokenBalances[owner][maticTokenAddress];
    }

}


