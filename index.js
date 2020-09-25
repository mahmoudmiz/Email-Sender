const fetch = require("node-fetch");
const BigNumber = require("bignumber.js");
require("dotenv").config();
const { transporter, send } = require("./mailer");
const User = require("./models/users");
const emailTemp = require("./emailTemp/gasPriceTemp");
const GasEthereum_API =
  "https://ethgasstation.info/api/ethgasAPI.json?api-key=";
const API_KEY = process.env.GasEthereum_KEY;
const EthereumPrice_API =
  "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd";
const requiredGas = 21000;

// calculating the gas unit price and the total gas price
const getGasEthereumPrices = async () => {
  let response = await fetch(`${GasEthereum_API}${API_KEY}`);
  let data = await response.json();
  const averageGweis = Number(data.fast) / 10;
  const priceOf1GasInETH = BigNumber(averageGweis).dividedBy(
    BigNumber(10 ** 9)
  );
  const latestETHPriceInUsd = await getEthereumUsdPrice();
  const priceOf1GasInUsd = BigNumber(latestETHPriceInUsd).multipliedBy(
    priceOf1GasInETH
  );
  const priceOfGasForETHInUsd = BigNumber(priceOf1GasInETH)
    .multipliedBy(requiredGas)
    .multipliedBy(latestETHPriceInUsd)
    .toFixed(2);
  return priceOfGasForETHInUsd;
};

// getting the latest ETH prices in USD
const getEthereumUsdPrice = async () => {
  let response = await fetch(EthereumPrice_API);
  let data = await response.json();
  console.log(data);
  return data.ethereum.usd;
};

const sendEmailsToUsers = async () => {
  try {
    // Find all users
    const users = await User.findAll();
    const currentGasPrice = await getGasEthereumPrices();
    for (let user of users) {
      if (currentGasPrice < Number(user.threshold)) {
        const msg = {
          to: `${user.email}`,
          from: "mahmoudmiz1991@gmail.com",
          subject: "Gas prices just changed!!",
          html: emailTemp(user, currentGasPrice),
        };
        const info = await send(msg, transporter);
        console.log(info);
      }
    }
  } catch (err) {
    console.log(err);
  }
};

const intervalObj = setInterval(sendEmailsToUsers, 3600000);
//setTimeout(() => clearInterval(intervalObj), 2000000);

module.exports.getGasEthereumPrices = getGasEthereumPrices;
