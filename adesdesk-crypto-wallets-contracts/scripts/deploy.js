// deploy.js

const hre = require("hardhat");

async function main() {
  // Retrieve the accounts from Hardhat's Ethereum provider
  const [deployer] = await hre.ethers.getSigners();

  // Deploy the WalletContract
  const WalletContract = await hre.ethers.getContractFactory("WalletContract");
  const walletContract = await WalletContract.deploy(deployer.address);

  await walletContract.deployed();

  console.log("WalletContract deployed to:", walletContract.address);

  // Deploy the WalletContractDeployer
  const WalletContractDeployer = await hre.ethers.getContractFactory("WalletContractDeployer");
  const walletContractDeployer = await WalletContractDeployer.deploy();

  await walletContractDeployer.deployed();

  console.log("WalletContractDeployer deployed to:", walletContractDeployer.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
