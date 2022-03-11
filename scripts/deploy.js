const hre = require("hardhat");

async function main() {
    console.log("main")
  const MyNFT = await hre.ethers.getContractFactory("MyNFT")
    console.log("got contract factory")
  // Start deployment, returning a promise that resolves to a contract object
  const myNFT = await MyNFT.deploy()
    console.log("start deploy")
  await myNFT.deployed()
  console.log("Contract deployed to address:", myNFT.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
