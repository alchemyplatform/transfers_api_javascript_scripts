import { createAlchemyWeb3 } from "@alch/alchemy-web3";

// Replace with your Alchemy api key:
const apiKey = "demo";

// Initialize an alchemy-web3 instance:
const web3 = createAlchemyWeb3(
  `https://eth-mainnet.alchemyapi.io/v2/${apiKey}`,
);

const res = await web3.alchemy.getAssetTransfers({
  fromBlock: "0xcd7467",
  toBlock: "latest",
  fromAddress: "0x049aA75E6ab5e2ab2ae21ddab95252aB76EC800a",
  toAddress: "0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F",
  category:["erc20", "internal"]
})

console.log(res);
