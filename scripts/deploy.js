const hre = require("hardhat");

async function main() {
  const MyTokenContractFactory = await hre.ethers.getContractFactory("MyToken");
  
  console.log("Deploying MyToken contract...");
  const myTokenContract = await MyTokenContractFactory.deploy(
    "My Awesome Token", 
    "MAT", 
    1000000
  );
  
  // Wait for the deployment transaction to be mined
  await myTokenContract.waitForDeployment();
  
  // Get the contract address after deployment is confirmed
  const contractAddress = await myTokenContract.getAddress();
  
  console.log(`MyToken deployed to: ${contractAddress}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
