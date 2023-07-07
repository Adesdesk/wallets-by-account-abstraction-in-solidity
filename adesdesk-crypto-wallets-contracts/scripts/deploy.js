// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.

// Deploy script for Token smart contract on Hardhat

// Import Hardhat environment and Ethereum libraries

// import { ethers } from "hardhat";
// Import Hardhat environment and Ethereum libraries
const hre = require("hardhat");
import { ethers } from "hardhat";


async function deploy() {
  // Set up Ethereum wallet
  const [deployer] = await ethers.getSigners();

  // Indicate a grab of WalletContractDeployer.sol
  console.log("Deploying the WalletContractDeployer contract with the account:", deployer.address);

  // Deploy WalletContractDeployer contract
  const walletContractDeployer = await ethers.deployContract("WalletContractDeployer");

  await walletContractDeployer.waitForDeployment();
  // Display WalletContractDeployer contract deployment details
  console.log("WalletContractDeployer deployed to:", walletContractDeployer.address);

  console.log("Waiting....");
  // Wait for block explorer to notice that the contract has been deployed
  await sleep(100000);

  // Verify the WalletContractDeployer contract after deploying
  await hre.run("verify:verify", {
    contract: "contracts/WalletContractDeployer.sol:WalletContractDeployer",
    address: WalletContractDeployer.address,
    constructorArguments: [],
  });
  console.log("Verified WalletContractDeployer ")


  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }


// invoke the deploy() function
deploy()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

}