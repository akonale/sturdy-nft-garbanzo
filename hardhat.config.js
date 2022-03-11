/**
* @type import('hardhat/config').HardhatUserConfig
*/
require('dotenv').config();
require("@nomiclabs/hardhat-ethers");
const { API_URL, PRIVATE_KEY } = process.env;
module.exports = {
   solidity: "0.8.0",
   defaultNetwork: "ropsten",
   networks: {
      hardhat: {},
      ropsten: {
         url: "https://eth-ropsten.alchemyapi.io/v2/r9u1NsjWCThozj5NVdmfjOncaWoT3gkK",
         accounts: ["0x16d751e0312aec3a4b06ad26f5bdd1700eb3f438c9ed8bee4b11a4a607b1782a"]
      }
   },
}