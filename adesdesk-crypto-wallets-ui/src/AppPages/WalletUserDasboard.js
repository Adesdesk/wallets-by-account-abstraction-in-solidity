import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import WalletContractDeployer from '../contracts/WalletContractDeployer.json';
import WalletContract from '../contracts/WalletContract.json';
import NavigationBar from '../components/NavigationBar/NavigationBar.js';
import PolygonMumbaiContract from '../contracts/PolygonMumbaiContract.json';


const WalletUserDashboard = ({ wallet }) => {
  const walletContractDeployerAddress = '0x80764eC89F806C4DD8Fbf2fF58ba571ef761814D';
  const ethTokenAddress = ethers.constants.AddressZero;
  const maticTokenAddress = '0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889'; // the actual address of Polygon Mumbai Matic token

  const [ethBalance, setEthBalance] = useState('0');
  const [maticBalance, setMaticBalance] = useState('0');
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

        // Get the wallet ETH balance
        const ethBalance = await walletContract.getBalance();
        setEthBalance(ethBalance.toString());

        // Create a new instance of the Matic token contract
        const maticTokenContract = new ethers.Contract(maticTokenAddress, PolygonMumbaiContract.abi, signer);

        // Get the wallet Matic balance
        const maticBalance = await maticTokenContract.balanceOf(userWalletAddress);
        setMaticBalance(maticBalance.toString());
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function createWallet() {
    try {
      const provider = new ethers.providers.Web3Provider(wallet);
      const signer = provider.getSigner();

      // Creating a new instance of the WalletContractDeployer
      const walletContractDeployer = new ethers.Contract(
        walletContractDeployerAddress,
        WalletContractDeployer.abi,
        signer
      );

      // Calling the createWallet function in the WalletContractDeployer
      await walletContractDeployer.createWallet();

      // Reload wallet data
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

        <div className="max-w-lg px-4 py-2 rounded-lg shadow-lg border-white border-2">
          {walletAddress !== '' ? (
            <div>
              <h3 className="text-white text-lg font-bold mb-2">Wallet Address:</h3>
              <p className="text-white">{walletAddress}</p>
              <h3 className="text-white text-lg font-bold mb-2">ETH Balance:</h3>
              <p className="text-white">{ethBalance} ETH</p>
              <h3 className="text-white text-lg font-bold mb-2">Matic Balance:</h3>
              <p className="text-white">{maticBalance} Matic</p>
            </div>
          ) : (
            <div>
              <p className="text-white mb-2">You don't have a wallet yet.</p>
              <button
                className="bg-violet-700 border-white text-white font-bold py-2 px-4 border-2 rounded"
                onClick={createWallet}
              >
                Create Wallet
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WalletUserDashboard;
