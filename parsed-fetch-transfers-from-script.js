import fetch from 'node-fetch';

  let data = JSON.stringify({
  "jsonrpc": "2.0",
  "id": 0,
  "method": "alchemy_getAssetTransfers",
  "params": [
    {
      "fromBlock": "0x0",
      "fromAddress": "0x5c43B1eD97e52d009611D89b74fA829FE4ac56b1",
    }
  ]
});


  var requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: data,
    redirect: 'follow'
  };

  const apiKey = "demo"
  const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${apiKey}`;
  const fetchURL = `${baseURL};`
  
  const res = await fetch(axiosURL, requestOptions);

  // Print token name / asset value
  for (const events of res.data.result.transfers) {
    console.log("Token Transfer: ", events.value, " ", events.asset);
  }
