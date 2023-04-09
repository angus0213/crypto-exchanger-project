import { CurrentUserContext } from "../CurrentUserContext";
import { useContext } from "react";
import React from "react";
import { COLORS } from "../Constants";
import styled from "styled-components";
import cryptos from "../../data/cryptos.json";
import { Table, Avatar } from "antd";

const SpotWalletHistory = () => {
  const { currentUser } = useContext(CurrentUserContext);

  const data = currentUser.walletHistory.map((history) => {

    return {
      ImageURLReceived: "",
      CryptoReceived: history.tradeInfo[1]._id,
      ReceivedAmount: history.tradeInfo[1].balanceChange,
      ImageURLSold: "",
      CryptoSold: history.tradeInfo[0]._id,
      SoldAmount: -history.tradeInfo[0].balanceChange,
      TradeTime: new Date(history.timestamp).toLocaleString("en-US"),
    };
  });//prepare ant design table data

  const dataWithImg = data.map((singleTrade) => {
    cryptos.forEach((crypto) => {
      if (singleTrade.CryptoReceived === crypto._id) {
        singleTrade.ImageURLReceived = crypto.imageSrc;
      }
      if (singleTrade.CryptoSold === crypto._id) {
        singleTrade.ImageURLSold = crypto.imageSrc;
      }
    });
    return singleTrade;
  });

  const columns = [
    {
      dataIndex: "ImageURLReceived",
      width: "1%",
      render: (text, record) => <Avatar src={record.ImageURLReceived} />,
    },
    {
      title: "Crypto Received",
      dataIndex: "CryptoReceived",
      key: "CryptoReceived",
      sorter: (a, b) =>
        a["CryptoReceived"].charCodeAt(0) - b["CryptoReceived"].charCodeAt(0),
    },
    {
      title: "Received Amount",
      dataIndex: "ReceivedAmount",
      key: "ReceivedAmount",
      sorter: (a, b) => a["ReceivedAmount"] - b["ReceivedAmount"],
    },
    {
      dataIndex: "ImageURLSold",
      width: "1%",
      render: (text, record) => <Avatar src={record.ImageURLSold} />,
    },
    {
      title: "Crypto Sold",
      dataIndex: "CryptoSold",
      key: "CryptoSold",
      sorter: (a, b) =>
        a["CryptoSold"].charCodeAt(0) - b["CryptoSold"].charCodeAt(0),
    },

    {
      title: "Sold Amount",
      dataIndex: "SoldAmount",
      key: "SoldAmount",
      sorter: (a, b) => a["SoldAmount"] - b["SoldAmount"],
    },
    {
      title: "Trade Time",
      dataIndex: "TradeTime",
      key: "TradeTime",
      sorter: (a, b) => Date.parse(a["TradeTime"]) - Date.parse(b["TradeTime"]),
    },
  ];

  return (
    <Wrapper>
      <History>Trading History</History>
      <MyTable
        dataSource={dataWithImg}
        columns={columns}
        rowClassName={"row"}
        pagination={{ pageSize: 15 }}
      />
    </Wrapper>
  );
}; // setup wallet table

const Wrapper=styled.div`
height: 595px;
`;

const History = styled.h1`
  color: ${COLORS.white};
  position: relative;
  top: 120px;
  left: 200px;
  width: 260px;
`;

const MyTable = styled(Table)`
  width: 80%;
  position: relative;
  top: 150px;
  left: 200px;
  margin-bottom: 165px;
  background-color: ${COLORS.grey};
  .row {
    color: ${COLORS.black};
    background-color: ${COLORS.grey};
  }
`;

export default SpotWalletHistory;
