import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import WalletContractDeployer from '../contracts/WalletContractDeployer.json';
import WalletContract from '../contracts/WalletContract.json';
import NavigationBar from '../components/NavigationBar/NavigationBar.js';

const WalletUserDashboard = ({ wallet }) => {
  // const walletContractAddress = '0x334641dc62D9a9B978E938d823496A33520dc5a7';
  const walletContractDeployerAddress = '0xE81F4BBf78eD636999B2731326625A08d02AF04c';

  const [balance, setBalance] = useState(0);
  const [walletAddress, setWalletAddress] = useState('');

  useEffect(() => {
    loadWallet();
  }, []);

  async function loadWallet() {
    try {
      const provider = new ethers.providers.Web3Provider(wallet);
      const signer = provider.getSigner();
      
      // Create a new instance of the WalletContractDeployer
      const walletContractDeployer = new ethers.Contract(
        walletContractDeployerAddress,
        WalletContractDeployer.abi,
        signer
      );

      // Check if the user has a wallet
      const userWalletAddress = await walletContractDeployer.wallets(signer.getAddress());
      if (userWalletAddress !== ethers.constants.AddressZero) {
        setWalletAddress(userWalletAddress);
        
        // Create a new instance of the WalletContract
        const walletContract = new ethers.Contract(
          userWalletAddress,
          WalletContract.abi,
          signer
        );

        // Get the wallet balance
        const walletBalance = await walletContract.getBalance();
        setBalance(walletBalance.toString());
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function createWallet() {
    try {
      const provider = new ethers.providers.Web3Provider(wallet);
      const signer = provider.getSigner();

      // Create a new instance of the WalletContractDeployer
      const walletContractDeployer = new ethers.Contract(
        walletContractDeployerAddress,
        WalletContractDeployer.abi,
        signer
      );

      // Call the createWallet function in the WalletContractDeployer
      await walletContractDeployer.createWallet();

      // Reload the wallet data
      await loadWallet();
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
        
        {walletAddress !== '' ? (
          <div>
            <h3 className="text-white text-lg font-bold mb-2">Wallet Address:</h3>
            <p className="text-white">{walletAddress}</p>
            <h3 className="text-white text-lg font-bold mb-2">Balance:</h3>
            <p className="text-white">{balance} ETH</p>
          </div>
        ) : (
          <div>
            <p className="text-white mb-2">You don't have a wallet yet.</p>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={createWallet}
            >
              Create Wallet
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WalletUserDashboard;
