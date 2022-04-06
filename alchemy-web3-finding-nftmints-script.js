import { createAlchemyWeb3 } from "@alch/alchemy-web3";

// Replace with your Alchemy api key:
const apiKey = "demo";

// Initialize an alchemy-web3 instance:
const web3 = createAlchemyWeb3(
  `https://eth-mainnet.alchemyapi.io/v2/${apiKey}`,
);

const res = await web3.alchemy.getAssetTransfers({
  fromBlock: "0x0",
  fromAddress: "0x0000000000000000000000000000000000000000",
  toAddress: "0x5c43B1eD97e52d009611D89b74fA829FE4ac56b1"
})

// Print contract address and tokenId for each NFT:
for (const events of res.transfers) {
    if (events.erc1155Metadata == null) {
      console.log("ERC-721 Token Minted: ID- ", events.tokenId, " Contract- ", events.rawContract.address);
    }
    else{
      for (const erc1155 of events.erc1155Metadata) {
      console.log("ERC-1155 Token Minted: ID- ", erc1155.tokenId, " Contract- ", events.rawContract.address);
      }
    }
}
