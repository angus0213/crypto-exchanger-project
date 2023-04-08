import { CurrentUserContext } from "../CurrentUserContext";
import { useContext } from "react";
import React from "react";
import {COLORS} from "../Constants"
import styled from "styled-components";
import cryptos from "../../data/cryptos.json";
import { Table, Avatar } from "antd";
import { CurrentPriceContext } from "../CurrentPricesContext";
import { useNavigate } from "react-router-dom";

const SpotWalletHistory=()=>{
    const { currentUser} = useContext(CurrentUserContext);
    const { currentPrice } = useContext(CurrentPriceContext);
    const navigate=useNavigate();

  
  const data=  currentUser.walletHistory.map((history)=>{
    // ImageURLReceived
    // Crypto Received
    // Received Amount
    // ImageURLSold
    // Crypto Sold
    // Sold Amount
    // Trade Time
    return {
        "ImageURLReceived":"",
        "CryptoReceived":history.tradeInfo[1]._id,
        "ReceivedAmount":history.tradeInfo[1].balanceChange,
        "ImageURLSold":"",
        "CryptoSold":history.tradeInfo[0]._id,
        "SoldAmount":-history.tradeInfo[0].balanceChange,
        "TradeTime":new Date(history.timestamp).toLocaleString("en-US")
    }

    // history.tradeInfo.map((singleTrade)=>{
    //     return {
    //         "cryptoRec":singleTrade
    //     }
    // })

    })

    const dataWithImg=data.map((singleTrade)=>{
     cryptos.forEach((crypto)=>{
            if(singleTrade.CryptoReceived===crypto._id){
                singleTrade.ImageURLReceived=crypto.imageSrc
            }
            if(singleTrade.CryptoSold===crypto._id){
                singleTrade.ImageURLSold=crypto.imageSrc
            }
         
        })
        return singleTrade;
    })


    // const data=currentUser.wallet.map((item)=>{
    //     const crypto = cryptos.find(
    //         (singleCrypto) => item.name === singleCrypto.name
    //       );
    //   return {
    //     cryptoImgSrc: crypto.imageSrc,
    //     "Coin": crypto.name,
    //     "Total": item.amount,
    //     "Available": item.amount,
    //     "BTC Value":(item.amount/btcPrice)
    //   };
    // }
    // );// get the right data that need to input in the wallet table
  
    const columns = [
      {
        dataIndex: "ImageURLReceived",
        width:"1%",
        render: (text, record) => <Avatar src={record.ImageURLReceived} />,
      },
      {
        title: "Crypto Received",
        dataIndex: "CryptoReceived",
        key: "CryptoReceived",
        sorter: (a,b)=>a["CryptoReceived"].charCodeAt(0)-b["CryptoReceived"].charCodeAt(0),
      },
      {
        title: "Received Amount",
        dataIndex: "ReceivedAmount",
        key: "ReceivedAmount",
        sorter: (a, b) => a["ReceivedAmount"] - b["ReceivedAmount"],
      },
      {
        dataIndex: "ImageURLSold",
        width:"1%",
        render: (text, record) => <Avatar src={record.ImageURLSold} />,
      },
      {
        title: "Crypto Sold",
        dataIndex: "CryptoSold",
        key: "CryptoSold",
        sorter: (a, b) => a["CryptoSold"].charCodeAt(0)-b["CryptoSold"].charCodeAt(0),
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
    <>
    <History>Trading History</History>
    <MyTable dataSource={dataWithImg} columns={columns} rowClassName={"row"} pagination={{ pageSize: 15}}/>;
    </>
  )};// setup wallet table

  const History=styled.h1`
  color: white;
  position: relative;
  top:100px;
  left: 200px;
  `;

  const MyTable = styled(Table)`
  width: 80%;
    position: relative;
    top: 130px;
    left:200px;
    background-color: ${COLORS.grey};
    border-radius: 15px;
    .row {
      color: ${COLORS.black};
      background-color: ${COLORS.grey};
    }
  `;

export default SpotWalletHistory;