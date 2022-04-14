import fetch from 'node-fetch';

  // Replace with your Alchemy API key:
  const apiKey = "PchzJjBo0NyERsATh6I60JuYmBZV3r0k"
  const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${apiKey}`;
  const fetchURL = `${baseURL}`;

  // Address we want get NFT mints from
  const toAddress = "0x5c43B1eD97e52d009611D89b74fA829FE4ac56b1";

  let data = JSON.stringify({
  "jsonrpc": "2.0",
  "id": 0,
  "method": "alchemy_getAssetTransfers",
  "params": [
    {
      "fromBlock": "0x0",
      "fromAddress": "0x0000000000000000000000000000000000000000",
      "toAddress": toAddress,
      "excludeZeroValue":true,
      "category": ["erc721","erc1155"]
    }
  ]
});


  var requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: data,
    redirect: 'follow'
  };

  console.log(Date().toLocaleString());

  var total_nfts = 0;
  const erc721_nfts = [];
  const erc1155_nfts = [];

  fetch(fetchURL, requestOptions)
    .then((res) => {
      return res.json()
    })
    .then((jsonResponse) => {
      //Print token name / asset value
      //console.log(jsonResponse)
      for (const events of jsonResponse.result.transfers) {
          total_nfts +=1;
          if (events.erc1155Metadata == null) {
            erc721_nfts.push(events);
            console.log("ERC-721 Token Minted: ID- ", events.tokenId, " Contract- ", events.rawContract.address);
          }
          else{
            erc1155_nfts.push(events);
            for (const erc1155 of events.erc1155Metadata) {
            console.log("ERC-1155 Token Minted: ID- ", erc1155.tokenId, " Contract- ", events.rawContract.address);
            }
          }
      }
      console.log(erc721_nfts.length)
      console.log(erc1155_nfts.length)
      console.log(Date().toLocaleString());
    })
    .catch((err) => {
      // handle error
      console.error(err);
    });
