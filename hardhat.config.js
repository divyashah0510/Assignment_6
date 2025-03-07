require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28", // or the Solidity version you prefer
  networks: {
    hardhat: { // This is the default Hardhat network configuration, you can customize it if needed
    },
    localganche: { // Configuration for connecting to Ganache
      url: process.env.PROVIDER_URL, // Replace with your Ganache RPC Server URL if different
      accounts: [process.env.PRIVATE_KEY], // Replace with your Ganache account private key 
    }
  },
};