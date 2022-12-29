import axios from 'axios';

  let data = JSON.stringify({
  "jsonrpc": "2.0",
  "id": 0,
  "method": "alchemy_getAssetTransfers",
  "params": [
    {
      "fromBlock": "0xA97AB8",
      "fromAddress": "0x5c43B1eD97e52d009611D89b74fA829FE4ac56b1",
      "category": [
          "external"
      ],
    }
  ]
});

async function main () {

  var requestOptions = {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: data,
  };

  const apiKey = "demo"
  const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${apiKey}`;
  const axiosURL = `${baseURL}`;

  const res = await axios(axiosURL, requestOptions);

  // Print token name / asset value
  for (const events of res.data.result.transfers) {
    console.log("Token Transfer: ", events.value, " ", events.asset);
  }
  
} 

main()
