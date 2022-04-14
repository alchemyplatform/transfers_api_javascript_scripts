import { createAlchemyWeb3 } from "@alch/alchemy-web3";

// Replace with your Alchemy API key:
const apiKey = "demo";

// Address we want get NFT mints from
const toAddress = "0x5c43B1eD97e52d009611D89b74fA829FE4ac56b1";

// Initialize an alchemy-web3 instance:
const web3 = createAlchemyWeb3(
  `https://eth-mainnet.alchemyapi.io/v2/${apiKey}`,
);

const assetTxs = await web3.alchemy.getAssetTransfers({
  fromBlock: "0x0",
  fromAddress: "0x0000000000000000000000000000000000000000",
  toAddress: toAddress,
  excludeZeroValue:true,
  category: ["erc721","erc1155"]
})

// Print contract address and tokenId for each NFT (ERC721 or ERC1155):
var total_nfts = 0;
var erc721_nfts = 0;
var erc1155_nfts = 0;

for (const events of assetTxs.transfers) {
    total_nfts +=1;
    if (events.erc1155Metadata == null) {
      erc721_nfts +=1;
      //console.log("ERC-721 Token Minted: ID- ", events.tokenId, " Contract- ", events.rawContract.address);

      const assetReceipt = await web3.alchemy.getTransactionReceipts({
        blockHash: events.hash,
      })

    }
    else{
      for (const erc1155 of events.erc1155Metadata) {
        erc1155_nfts +=1;
      //console.log("ERC-1155 Token Minted: ID- ", erc1155.tokenId, " Contract- ", events.rawContract.address);

      const assetReceipt = await web3.alchemy.getTransactionReceipts({
        blockHash: events.hash,
      })

      }
    }
}

console.log("Total ERC721 NFTs: ", erc721_nfts)
console.log("Total ERC1155 NFTs: ", erc1155_nfts)
console.log("Total NFTs: ", total_nfts)
