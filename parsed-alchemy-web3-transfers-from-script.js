import { createAlchemyWeb3 } from "@alch/alchemy-web3";

// Replace with your Alchemy api key:
const apiKey = "demo";

// Initialize an alchemy-web3 instance:
const web3 = createAlchemyWeb3(
  https://eth-mainnet.alchemyapi.io/v2/${apiKey},
);

const res = await web3.alchemy.getAssetTransfers({
  fromBlock: "0x0",
  fromAddress: "0x5c43B1eD97e52d009611D89b74fA829FE4ac56b1",
})

// Print each token transfer and it associated value:
for (const events of res.data.result.transfers) {
  console.log("Token Transfer: ", events.value, " ", events.asset);
}
