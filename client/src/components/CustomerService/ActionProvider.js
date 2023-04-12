import React from "react";
import { useContext } from "react";
import { CurrentPriceContext } from "../CurrentPricesContext";

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
  const { currentPrice, priceStatus } = useContext(CurrentPriceContext);

  const handleHello = () => {
    const botMessage = createChatBotMessage("Hello. Nice to meet you.");
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };
  console.log(currentPrice);
  const handleBNBprice = () => {
    const bnb = currentPrice.find(
      (crypto) =>
        crypto.asset_id_base_exchange === "BNB" &&
        crypto.asset_id_quote_exchange === "USDT"
    );
    const botMessage = createChatBotMessage(
      `The price of BNB is ${bnb.price} USDT currently, and the trading volume of last one hour is ${bnb.volume_1hrs_usd} USD`
    );
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const handleBTCprice = () => {
    const btc = currentPrice.find(
      (crypto) =>
        crypto.asset_id_base_exchange === "BTC" &&
        crypto.asset_id_quote_exchange === "USDT"
    );
    const botMessage = createChatBotMessage(
      `The price of BTC is ${btc.price} USDT currently, and the trading volume of last one hour is ${btc.volume_1hrs_usd} USD`
    );
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const handleETHprice = () => {
    const eth = currentPrice.find(
      (crypto) =>
        crypto.asset_id_base_exchange === "ETH" &&
        crypto.asset_id_quote_exchange === "USDT"
    );
    const botMessage = createChatBotMessage(
      `The price of ETH is ${eth.price} USDT currently, and the trading volume of last one hour is ${eth.volume_1hrs_usd} USD`
    );
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const handleLTCprice = () => {
    const ltc = currentPrice.find(
      (crypto) =>
        crypto.asset_id_base_exchange === "LTC" &&
        crypto.asset_id_quote_exchange === "USDT"
    );
    const botMessage = createChatBotMessage(
      `The price of LTC is ${ltc.price} USDT currently, and the trading volume of last one hour is ${ltc.volume_1hrs_usd} USD`
    );
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const handleADAprice = () => {
    const ada = currentPrice.find(
      (crypto) =>
        crypto.asset_id_base_exchange === "ADA" &&
        crypto.asset_id_quote_exchange === "USDT"
    );
    const botMessage = createChatBotMessage(
      `The price of ADA is ${ada.price} USDT currently, and the trading volume of last one hour is ${ada.volume_1hrs_usd} USD`
    );
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const handleXRPprice = () => {
    const xrp = currentPrice.find(
      (crypto) =>
        crypto.asset_id_base_exchange === "XRP" &&
        crypto.asset_id_quote_exchange === "USDT"
    );
    const botMessage = createChatBotMessage(
      `The price of XRP is ${xrp.price} USDT currently, and the trading volume of last one hour is ${xrp.volume_1hrs_usd} USD`
    );
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const handleMATICprice = () => {
    const matic = currentPrice.find(
      (crypto) =>
        crypto.asset_id_base_exchange === "MATIC" &&
        crypto.asset_id_quote_exchange === "USDT"
    );
    const botMessage = createChatBotMessage(
      `The price of MATIC is ${matic.price} USDT currently, and the trading volume of last one hour is ${matic.volume_1hrs_usd} USD`
    );
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const handleDOGEprice = () => {
    const doge = currentPrice.find(
      (crypto) =>
        crypto.asset_id_base_exchange === "DOGE" &&
        crypto.asset_id_quote_exchange === "USDT"
    );
    const botMessage = createChatBotMessage(
      `The price of DOGE is ${doge.price} USDT currently, and the trading volume of last one hour is ${doge.volume_1hrs_usd} USD`
    );
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const handleSOLprice = () => {
    const sol = currentPrice.find(
      (crypto) =>
        crypto.asset_id_base_exchange === "SOL" &&
        crypto.asset_id_quote_exchange === "USDT"
    );
    const botMessage = createChatBotMessage(
      `The price of SOL is ${sol.price} USDT currently, and the trading volume of last one hour is ${sol.volume_1hrs_usd} USD`
    );
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const handleDOTprice = () => {
    const dot = currentPrice.find(
      (crypto) =>
        crypto.asset_id_base_exchange === "DOT" &&
        crypto.asset_id_quote_exchange === "USDT"
    );
    const botMessage = createChatBotMessage(
      `The price of DOT is ${dot.price} USDT currently, and the trading volume of last one hour is ${dot.volume_1hrs_usd} USD`
    );
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };
  // Put the handleHello function in the actions object to pass to the MessageParser
  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            handleHello,
            handleBNBprice,
            handleBTCprice,
            handleETHprice,
            handleLTCprice,
            handleADAprice,
            handleXRPprice,
            handleMATICprice,
            handleDOGEprice,
            handleSOLprice,
            handleDOTprice,
          },
        });
      })}
    </div>
  );
};

export default ActionProvider;
