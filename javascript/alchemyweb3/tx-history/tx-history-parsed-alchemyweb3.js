// Setup: npm install alchemy-sdk
import { Alchemy, Network } from "alchemy-sdk";

const config = {
  apiKey: "<-- ALCHEMY APP API KEY -->",
  network: Network.ETH_MAINNET,
};
const alchemy = new Alchemy(config);

const res = await web3.alchemy.getAssetTransfers({
  fromBlock: "0xA97AB8",
  fromAddress: "0x5c43B1eD97e52d009611D89b74fA829FE4ac56b1",
})

// Print each token transfer and it associated value:
for (const events of res.transfers) {
  console.log("Token Transfer: ", events.value, " ", events.asset);
}
