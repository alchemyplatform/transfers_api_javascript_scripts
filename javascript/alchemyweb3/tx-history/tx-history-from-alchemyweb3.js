// Setup: npm install alchemy-sdk
import { Alchemy, Network } from "alchemy-sdk";

const config = {
  apiKey: "<-- ALCHEMY APP API KEY -->",
  network: Network.ETH_MAINNET,
};
const alchemy = new Alchemy(config);

const data = await alchemy.core.getAssetTransfers({
  fromBlock: "0x0",
  fromAddress: "0x5c43B1eD97e52d009611D89b74fA829FE4ac56b1",
  category: ["external", "internal", "erc20", "erc721", "erc1155"],
});

console.log(data);
