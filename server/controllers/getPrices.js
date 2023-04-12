//get price from API
const getPrices = (req, res) => {
  //get price API info

  try {
    fetch(
      "https://rest.coinapi.io/v1/symbols?filter_symbol_id=BINANCE_SPOT_XRP_BTC;BINANCE_SPOT_ETH_USDT;BINANCE_SPOT_BNB_ETH;BINANCE_SPOT_BNB_BTC;BINANCE_SPOT_BNB_USDT;BINANCE_SPOT_BTC_USDT;BINANCE_SPOT_ADA_ETH;BINANCE_SPOT_LTC_USDT;BINANCE_SPOT_ADA_BTC;BINANCE_SPOT_ETH_BTC;BINANCE_SPOT_XRP_ETH;BINANCE_SPOT_LTC_BTC;BINANCE_SPOT_LTC_ETH;BINANCE_SPOT_ADA_USDT;BINANCE_SPOT_XRP_USDT;BINANCE_SPOT_MATIC_BTC;BINANCE_SPOT_MATIC_USDT;BINANCE_SPOT_DOGE_BTC;BINANCE_SPOT_DOGE_USDT;BINANCE_SPOT_SOL_BTC;BINANCE_SPOT_SOL_USDT;BINANCE_SPOT_DOT_BTC;BINANCE_SPOT_DOT_USDT;BINANCE_SPOT_SOL_ETH;BINANCE_SPOT_DOT_ETH;BINANCE_SPOT_MATIC_ETH",
      {
        method: "GET",
        headers: { "X-CoinAPI-Key": "53934CDD-6C74-4009-A772-2893F61F2370" }, //it should be in .env file
      }
    )
      .then((res) => res.json())
      .then((tradeInfo) => {
        /*I do not delete the following part as I will use it to develop more functions in future */

        // const priceResponse = await request(
        //   "https://rest.coinapi.io/v1/quotes/current?filter_symbol_id=BINANCE_SPOT_BTC_USDT;BINANCE_SPOT_ETH_USDT;BINANCE_SPOT_BNB_USDT;BINANCE_SPOT_XRP_USDT;BINANCE_SPOT_ADA_USDT;BINANCE_SPOT_DOGE_USDT;BINANCE_SPOT_MATIC_USDT;BINANCE_SPOT_SOL_USDT;BINANCE_SPOT_DOT_USDT;BINANCE_SPOT_LTC_USDT;BINANCE_SPOT_ETH_BTC;BINANCE_SPOT_BNB_BTC;BINANCE_SPOT_XRP_BTC;BINANCE_SPOT_ADA_BTC;BINANCE_SPOT_DOGE_BTC;BINANCE_SPOT_MATIC_BTC;BINANCE_SPOT_SOL_BTC;BINANCE_SPOT_DOT_BTC;BINANCE_SPOT_LTC_BTC;BINANCE_SPOT_BNB_ETH;BINANCE_SPOT_XRP_ETH;BINANCE_SPOT_ADA_ETH;BINANCE_SPOT_MATIC_ETH;BINANCE_SPOT_SOL_ETH;BINANCE_SPOT_DOT_ETH;BINANCE_SPOT_LTC_ETH",
        //   {
        //     method: "GET",
        //     headers: { "X-CoinAPI-Key": "53934CDD-6C74-4009-A772-2893F61F2370" },
        //   }
        // );
        // const priceQuote = JSON.parse(priceResponse);
        // const priceAndVolume=priceQuote.reduce((arr1, arr2)=>{
        //   const target=arr1.find(e=>e.symbol_id===arr2.symbol_id);
        //   if(target){
        //     Object.assign(target, arr2)
        //   }else{
        //     arr1.push(arr2);
        //   }
        //   return arr1
        // }, tradeVolume)

        if (tradeInfo) {
          return res.status(200).json({ status: 200, data: tradeInfo });
        } else {
          return res
            .status(404)
            .json({ status: 404, message: "prices do not exist" });
        }
      });
  } catch (err) {
    return res.status(500).json({ status: 500, message: err.message });
  }
};

module.exports = { getPrices };
