require("dotenv").config()
const API_URL = process.env.API_URL
const PUBLIC_KEY = process.env.PUBLIC_KEY

const PRIVATE_KEY = process.env.PRIVATE_KEY
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS

const hre = require("hardhat");

async function main() {
    console.log("main")
    const MyNFT = await hre.ethers.getContractFactory("MyNFT")
    console.log("got contract factory")
    const contract = await MyNFT.attach(CONTRACT_ADDRESS)
    const ownerOf = await contract.tokenURI(1);
    console.log(ownerOf)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
