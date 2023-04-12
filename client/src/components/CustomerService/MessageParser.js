// in MessageParser.js
import React from "react";

const MessageParser = ({ children, actions }) => {
  const parse = (message) => {
    if (message.includes("hello")) {
      actions.handleHello();
    }

    if (message.includes("bnb") || message.includes("BNB")) {
      actions.handleBNBprice();
    }

    if (message.includes("btc") || message.includes("BTC")) {
      actions.handleBTCprice();
    }

    if (message.includes("eth") || message.includes("ETH")) {
      actions.handleETHprice();
    }
    if (message.includes("LTC") || message.includes("ltc")) {
      actions.handleLTCprice();
    }

    if (message.includes("ada") || message.includes("ADA")) {
      actions.handleADAprice();
    }

    if (message.includes("XRP") || message.includes("xrp")) {
      actions.handleXRPprice();
    }

    if (message.includes("MATIC") || message.includes("matic")) {
      actions.handleMATICprice();
    }

    if (message.includes("DOGE") || message.includes("doge")) {
      actions.handleDOGEprice();
    }

    if (message.includes("SOL") || message.includes("sol")) {
      actions.handleSOLprice();
    }

    if (message.includes("DOT") || message.includes("dot")) {
      actions.handleDOTprice();
    }
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          parse: parse,
          actions,
        });
      })}
    </div>
  );
};

export default MessageParser;
