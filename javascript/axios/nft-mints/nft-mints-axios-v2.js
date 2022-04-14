import axios from 'axios';

  async function makeERC721Requests() {

      // Replace with your Alchemy API key:
      const apiKey = "PchzJjBo0NyERsATh6I60JuYmBZV3r0k"
      const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${apiKey}`;
      const axiosURL = `${baseURL}`;

      // Address we want get NFT mints from
      const toAddress = "0x292c6DAE7417B3D31d8B6e1d2EeA0258d14C4C4b";

      let assetTxData = JSON.stringify({
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
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        data: assetTxData,
      };

      console.log(Date().toLocaleString());

      const assetTxs = await axios(axiosURL, requestOptions);

      // Print contract address and tokenId for each NFT:

      var total_nfts = 0;
      const erc721_nfts = [];
      const erc721_reqs = [];
      const erc1155_nfts = [];
      const erc1155_reqs = [];

      for (const events of assetTxs.data.result.transfers) {
          total_nfts +=1;
          if (events.erc1155Metadata == null) {
            erc721_nfts.push(events.address);

            let assetHashData = JSON.stringify({
            "jsonrpc": "2.0",
            "id": 0,
            "method": "eth_getTransactionReceipt",
            "params": [events.hash]
          });

            var requestOptions = {
              method: 'post',
              headers: { 'Content-Type': 'application/json' },
              data: assetHashData,
            };

            //const nftData = await axios(axiosURL, requestOptions);
            erc721_reqs.push(requestOptions);
            //console.log("ERC-721 Token Minted: ID- ", events.tokenId, " Contract- ", events.rawContract.address);
          }
          else{
            for (const erc1155 of events.erc1155Metadata) {
              erc1155_nfts.push(events);

              let assetHashData = JSON.stringify({
              "jsonrpc": "2.0",
              "id": 0,
              "method": "eth_getTransactionReceipt",
              "params": [events.hash]
            });

              var requestOptions = {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                data: assetHashData,
              };

              //const nftData = await axios(axiosURL, requestOptions);
              erc1155_reqs.push(requestOptions);

            //console.log("ERC-1155 Token Minted: ID- ", erc1155.tokenId, " Contract- ", events.rawContract.address);
            }
          }
      }

      let erc721_gas = 0
      const fetchUrl = (erc721_reqs) => axios(axiosURL, erc721_reqs);
      const promises = erc721_reqs.map(fetchUrl);

      let responses = await Promise.all(promises);

      for (const r of responses) {
          erc721_gas = erc721_gas + (parseInt(r.data.result.gasUsed, 16));
      }
      console.log(erc721_gas*0.000000001)
      console.log(erc721_reqs.length)
      return(erc721_gas)
  }

  makeERC721Requests();
