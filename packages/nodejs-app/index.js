const express = require('express')
const cors = require('cors')

const Moralis = require('moralis').default
const { EvmChain } = require('@moralisweb3/common-evm-utils')

const app = express()
const port = process.env.EXPRESS_PORT || 4000

const chain = EvmChain.ETHEREUM
const MAX_PRICE = 10 ** 9

async function getTokenPrice(address) {
  let tokenPrice = null
  try {
    const response = await Moralis.EvmApi.token.getTokenPrice({
      address: address.toString(),
      chain,
    })
    tokenPrice = response?.result.usdPrice
  } catch (error) {
    tokenPrice = null
  }
  return tokenPrice
}

async function getData(address) {
  // Get native balance
  const nativeBalance = await Moralis.EvmApi.balance.getNativeBalance({
    address,
    chain,
  })

  // Format the native balance formatted in ether via the .ether getter
  const native = Number(nativeBalance.result.balance.ether)
  const eth_price = await getTokenPrice(
    '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'
  )
  const nativeInUsd = Number(eth_price * native)

  // Get token balances
  const tokenBalances = await Moralis.EvmApi.token.getWalletTokenBalances({
    address,
    chain,
  })

  let tokens = []
  tokenBalances.result.forEach((res) => {
    if (res._token.logo !== undefined) {
      tokens.push({
        symbol: res._token.symbol,
        logo: res._token.logo,
        address: res._token.contractAddress._value,
        balance: (
          Number(res._value.amount.value) /
          10 ** res._value.decimals
        ).toFixed(2),
      })
    }
  })

  let totalBalance = 0
  let delay = 0
  const delayIncrement = 100
  const promises = tokens.map(async (token) => {
    delay += delayIncrement
    return new Promise((resolve) => setTimeout(resolve, delay)).then(
      async () => {
        const tokenPrice = await getTokenPrice(token.address)
        if (tokenPrice && tokenPrice <= MAX_PRICE) {
          totalValue = Number((token.balance * tokenPrice).toFixed(2))
          totalBalance += totalValue
          return {
            ...token,
            usdPrice: Number(tokenPrice),
            totalValue: totalValue,
          }
        }
      }
    )
  })

  tokens = (await Promise.all(promises))
    .filter((token) => token !== undefined)
    .sort((a, b) => (a.totalValue > b.totalValue ? -1 : 1))

  const maxValue = Math.max(...tokens.map((token) => token.totalValue))
  tokens = tokens.map((token) => {
    return { ...token, pct: token.totalValue / totalBalance }
  })

  return { native, nativeInUsd, tokens, maxValue, totalBalance }
}

app.get('/api/getData', async (req, res) => {
  try {
    const address = req.query.address
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
    apiKey: process.env.MORALIS_API_KEY,
  })

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
}

startServer()
