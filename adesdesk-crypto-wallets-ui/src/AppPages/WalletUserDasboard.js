import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import WalletContractDeployer from '../contracts/WalletContractDeployer.json';
import WalletContract from '../contracts/WalletContract.json';
import NavigationBar from '../components/NavigationBar/NavigationBar.js';

const WalletUserDasboard = ({ wallet }) => {
  

  
  return (
    <div>   <NavigationBar />
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-violet-500 to-fuchsia-500">
            <h2 className="text-2xl text-center text-white font-bold mb-2">
            Adesdesk Wallets User Dashboard
            </h2>


    </div>
    </div>
 
  );
};

export default WalletUserDasboard;
