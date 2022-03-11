require("dotenv").config()
const API_URL = process.env.API_URL
const PUBLIC_KEY = process.env.PUBLIC_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS


const {createAlchemyWeb3} = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)

async function main() {
    const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json")

    const nftContract = new web3.eth.Contract(contract.abi, CONTRACT_ADDRESS)
    // call()  actually calls contract function
    const tokenUri = await nftContract.methods.ownerOf(1).call();
    console.log(tokenUri)
    // Transfer

    let from = "0x0a117ad9ada1321c5a3e411117afd652bbc5a1cb";
    const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest'); //get latest nonce
    const tx = {
        'from': PUBLIC_KEY,
        'to': CONTRACT_ADDRESS,
        'nonce': nonce,
        'gas': 500000,
        'data': nftContract.methods.transferFrom(from, PUBLIC_KEY, 1).encodeABI()
    }

    const signedTx = await web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);

    await web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
        function (err, hash) {
            console.log("after sending")
            if (!err) {
                console.log(
                    "The hash of your transaction is: ",
                    hash,
                    "\nCheck Alchemy's Mempool to view the status of your transaction!"
                )
            } else {
                console.error("Something went wrong in the txn", err)
            }
        }
    )
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        console.error("error")
        process.exit(1)
    })