import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import WalletContractDeployer from '../contracts/WalletContractDeployer.json';
import WalletContract from '../contracts/WalletContract.json';
import NavigationBar from '../components/NavigationBar/NavigationBar.js';
import PolygonMumbaiContractABI from '../contracts/PolygonMumbaiContract.json';
import CustomTokenContractABI from '../contracts/CustomTokenContract.json';


const SendFunds = ({ wallet }) => {
  const walletContractDeployerAddress = '0x80764eC89F806C4DD8Fbf2fF58ba571ef761814D';
  const customTokenAddress = '0xd9145CCE52D386f254917e481eB44e9943F39138';
  const maticTokenAddress = '0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889'; // the actual address of Polygon Mumbai Matic token
  const [customTokenBalance, setCustomTokenBalance] = useState('0');
  const [toAddress, setToAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [balance, setBalance] = useState(0);
  const [maticBalance, setMaticBalance] = useState(0);
  const [walletAddress, setWalletAddress] = useState('');

  useEffect(() => {
    loadWallet();
  }, []);

  async function loadWallet() {
    try {
      const provider = new ethers.providers.Web3Provider(wallet);
      const signer = provider.getSigner();

      // Creating a new instance of the WalletContractDeployer
      const walletContractDeployer = new ethers.Contract(
        walletContractDeployerAddress,
        WalletContractDeployer.abi,
        signer
      );

      // Retrieving the user's wallet address using the getWalletAddress function in WalletContractDeployer.sol
      const userWalletAddress = await walletContractDeployer.getWalletAddress(signer.getAddress());

      if (userWalletAddress !== ethers.constants.AddressZero) {
        setWalletAddress(userWalletAddress);

        // Creating a new instance of the WalletContract
        const walletContract = new ethers.Contract(
          userWalletAddress,
          WalletContract.abi,
          signer
        );

        // Create a new instance of the custom token contract
        const customTokenContract = new ethers.Contract(
            customTokenAddress,
            CustomTokenContractABI,
            signer
        );
  
        // Get the wallet custom token balance
        const customTokenBalance = await customTokenContract.balanceOf(userWalletAddress);
        setCustomTokenBalance(customTokenBalance.toString());
  

        // Getting the wallet ETH balance
        const ethBalance = await walletContract.getBalance();
        setBalance(ethBalance.toString());

        // Creating a new instance of the Matic token contract
        const maticTokenContract = new ethers.Contract(maticTokenAddress, PolygonMumbaiContractABI, signer);

        // Getting the wallet Matic balance
        const maticBalance = await maticTokenContract.balanceOf(userWalletAddress);
        setMaticBalance(maticBalance.toString());
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function sendFunds() {
    try {
      const provider = new ethers.providers.Web3Provider(wallet);
      const signer = provider.getSigner();

      // Creating a new instance of the WalletContractDeployer
      const walletContractDeployer = new ethers.Contract(
        walletContractDeployerAddress,
        WalletContractDeployer.abi,
        signer
      );

      // Retrieving the user's wallet address using the getWalletAddress function in WalletContractDeployer.sol
      const userWalletAddress = await walletContractDeployer.getWalletAddress(signer.getAddress());

      if (userWalletAddress !== ethers.constants.AddressZero) {
        // Creating a new instance of the WalletContract
        const walletContract = new ethers.Contract(
          userWalletAddress,
          WalletContract.abi,
          signer
        );

        // To send funds
        await walletContract.transfer(toAddress, ethers.constants.AddressZero, amount);

        // Reload the wallet data
        await loadWallet();

        // Clear input fields
        setToAddress('');
        setAmount('');
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <NavigationBar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-violet-500 to-fuchsia-500">
        <h2 className="text-2xl text-center text-white font-bold mb-2">
          Adesdesk Wallets User Dashboard
        </h2>

        <div className="max-w-lg px-4 py-2 rounded-lg shadow-lg border-white border-2">
          <h3 className="text-white text-lg font-bold mb-2">Wallet Address:</h3>
          <p className="text-white">{walletAddress}</p>
          <h3 className="text-white text-lg font-bold mb-2">ETH Balance:</h3>
          <p className="text-white">{balance} ETH</p>
          <h3 className="text-white text-lg font-bold mb-2">Matic Balance:</h3>
          <p className="text-white">{maticBalance} Matic</p>
          <h3 className="text-white text-lg font-bold mb-2">ADESCOIN Balance:</h3>
          <p className="text-white">{customTokenBalance} ADESCOIN</p>

          <div className="mt-4">
            <h3 className="text-white text-lg font-bold mb-2">Send Funds</h3>
            <label htmlFor="toAddress" className="text-white mb-2 block">
              To Address:
            </label>
            <input
              type="text"
              id="toAddress"
              className="border border-white rounded-lg px-3 py-2 mb-2"
              value={toAddress}
              onChange={(e) => setToAddress(e.target.value)}
            />
            <label htmlFor="amount" className="text-white mb-2 block">
              Amount:
            </label>
            <input
              type="text"
              id="amount"
              className="border border-white rounded-lg px-3 py-2 mb-2"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <br></br>
            <button
              className="bg-gradient-to-r from-violet-500 to-fuchsia-500 border-white text-white font-bold py-2 px-4 border-2 rounded"
              onClick={sendFunds}
            >
              Send Funds
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendFunds;
