const express = require("express")
const cors = require("cors");

const Moralis = require("moralis").default
const { EvmChain } = require("@moralisweb3/common-evm-utils")
const MORALIS_API_KEY = require("./config").MORALIS_API_KEY

const app = express()
const port = 4000

const chain = EvmChain.ETHEREUM

// allow access to React app domain
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

async function getData(address) {
  // Get native balance
  const nativeBalance = await Moralis.EvmApi.balance.getNativeBalance({
    address,
    chain,
  })

  // Format the native balance formatted in ether via the .ether getter
  const native = nativeBalance.result.balance.ether

  // Get token balances
  const tokenBalances = await Moralis.EvmApi.token.getWalletTokenBalances({
    address,
    chain,
  })

  let tokens = tokenBalances.result.map((token) => {
    const _token = token._token;
    const _balance = Number(token._value.amount.value) / 10**token._value.decimals;
    if (_token.logo !== undefined)
      return {
        symbol: _token.symbol,
        logo: _token.logo,
        address: _token.contractAddress._value,
        balance: Number(_balance.toFixed(2))
      }
  });
  tokens = tokens.filter((token) => token !== undefined)

  let delay = 0; const delayIncrement = 100;
  const promises = tokens.map(async (token) => {
    delay += delayIncrement;
    return new Promise(resolve => setTimeout(resolve, delay)).then(async () => {
     const tokenPrice = await getTokenPrice(token.symbol, token.address);
     if (tokenPrice && tokenPrice <= 10**9)
      return {...token, usdPrice: Number(tokenPrice), totalValue: Number((token.balance * tokenPrice).toFixed(2))};
    })
  });
  tokens = await Promise.all(promises);
  tokens = tokens.filter((token) => token !== undefined)
  tokens.sort((a, b) => (a.totalValue > b.totalValue ? -1 : 1));

  const maxValue = Math.max(...tokens.map(token => token.totalValue));
  // // Get the nfts
  // const nftsBalances = await Moralis.EvmApi.nft.getWalletNFTs({
  //   address,
  //   chain,
  //   limit: 10,
  // })

  // // Format the output to return name, amount and metadata
  // const nfts = nftsBalances.result.map((nft) => ({
  //   name: nft.result.name,
  //   amount: nft.result.amount,
  //   metadata: nft.result.metadata,
  // }))

  return { native, tokens, maxValue }
}

async function getTokenPrice (name, address) {
  let tokenPrice = null;
  try{ 
    const response = await Moralis.EvmApi.token.getTokenPrice({
      address: address.toString(),
      chain,
    });
    tokenPrice = response?.result.usdPrice;
  }
  catch(error){
    tokenPrice = null;
  }
  return tokenPrice;
}

app.get("/getData", async (req, res) => {
  try {
    const address = req.query.address;
    const data = await getData(address)
    res.status(200)
    return res.json(data)
  } catch (error) {
    // Handle errors
    console.error(error)
    res.status(500)
    res.json({ error: error.message })
  }
})

const startServer = async () => {
  await Moralis.start({
    apiKey: MORALIS_API_KEY,
  })

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
}

startServer()