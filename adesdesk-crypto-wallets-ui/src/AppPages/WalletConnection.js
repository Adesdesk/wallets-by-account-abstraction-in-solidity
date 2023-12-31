import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar/NavigationBar.js';

const WalletConnection = ({ onConnect }) => {
    const [walletConnected, setWalletConnected] = useState(false);
    const navigate = useNavigate();

    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                setWalletConnected(true);
                onConnect();
            } catch (error) {
                console.log('Error connecting wallet:', error);
            }
        } else {
            console.log('No Ethereum wallet found');
        }
    };

    const handleNavigateToWalletDashboard = () => {
        navigate('/wallet-user-dashboard');
    };

    const handleNavigateToSendFunds = () => {
        navigate('/send-funds');
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-violet-500 to-fuchsia-500">
            {walletConnected && (<NavigationBar />)}
            <h2 className="text-2xl text-center text-black font-bold mb-2">
            Seamless Account Abstraction with Adesdesk Wallets for ERC20 Tokens
            </h2>
            <div className="mt-5">
                {!walletConnected && (
                    <button
                        className="bg-gradient-to-r from-violet-900 to-fuchsia-900 text-2xl hover:bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold py-2 px-4 rounded"
                        onClick={connectWallet}
                    >
                        Connect Ethereum Wallet
                    </button>
                )}
                {walletConnected && (
                    <div className='flex flex-col items-center justify-center'>
        
                        <button
                            className="bg-gradient-to-r from-violet-500 to-fuchsia-500 border-white text-white font-bold py-2 px-4 border-2 rounded"
                            onClick={handleNavigateToWalletDashboard}
                        >
                            Connected! Click here to create or view your cryptocurrency wallet details
                        </button>
                        <br></br>

                        <button
                            className="bg-gradient-to-r from-violet-500 to-fuchsia-500 border-white text-white font-bold py-2 px-4 border-2 rounded"
                            onClick={handleNavigateToSendFunds}
                        >
                            Instant Fund Transfers Here
                        </button>

                    </div>
                )}
            </div>
        </div>
    );
};

export default WalletConnection;
