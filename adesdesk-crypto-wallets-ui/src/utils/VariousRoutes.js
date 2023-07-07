import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import WalletConnection from '../AppPages/WalletConnection';
import WalletUserDasboard from '../AppPages/WalletUserDasboard';
import SendFunds from '../AppPages/SendFunds';


const VariousRoutes = () => {
  const [wallet, setWallet] = useState(null);
  const [contractAddress, setContractAddress] = useState('');

  const handleWalletConnect = () => {
    setWallet(window.ethereum);
  };

  const handleCreatewallet = (address) => {
    setContractAddress(address);
  };

  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/"
          element={<WalletConnection onConnect={handleWalletConnect} />}
        />
        <Route
          exact
          path="/wallet-user-dashboard"
          element={<WalletUserDasboard wallet={wallet} onContractDeploy={handleCreatewallet} />}
        />
        <Route
          exact
          path="/send-funds"
          element={<SendFunds wallet={wallet} onContractDeploy={handleCreatewallet} />}
        />
      </Routes>
    </Router>
  );
};

export default VariousRoutes;
