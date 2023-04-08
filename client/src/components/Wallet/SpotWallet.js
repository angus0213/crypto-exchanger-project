import React, { useState } from "react";
import {COLORS} from "../Constants"
import { useContext } from "react";
import styled from "styled-components";
import cryptos from "../../data/cryptos.json";
import { Table, Avatar } from "antd";
import { CurrentUserContext } from "../CurrentUserContext";
import { CurrentPriceContext } from "../CurrentPricesContext";
import { useNavigate } from "react-router-dom";
import DepositModal from "./DepositModal";

const SpotWallet=()=>{
    const { currentUser } = useContext(CurrentUserContext);
    const { currentPrice } = useContext(CurrentPriceContext);
    const navigate=useNavigate();
    const [modalOpen, setModalOpen]=useState(false);

    const handleClick=()=>{
      navigate(`/exchange`)
    }
 
const handleDeposit=()=>{
  setModalOpen(true);
}

  const btcPrice=currentPrice.find((item)=>item.symbol_id_exchange==="BTCUSDT").price//get BTC price
    const data=currentUser.wallet.map((item)=>{
      let totalCryptoAmount=0;
        const crypto = cryptos.find(
            (singleCrypto) => item.name === singleCrypto.name
          );
        currentUser.depositWallet.forEach((depositCrypto)=>{
          if (item._id===depositCrypto._id){
            totalCryptoAmount=Number(item.amount)+Number(depositCrypto.amount);
          }
        })
      return {
        cryptoImgSrc: crypto.imageSrc,
        "Coin": crypto.name,
        "Total": totalCryptoAmount,
        "Available": item.amount,
        "BTC Equivalent  Value":(item.amount/btcPrice)
      };
    }
    );// get the right data that need to input in the wallet table
  
    const columns = [
      {
        dataIndex: "ImageURL",
        width:"1%",
        render: (text, record) => <Avatar src={record.cryptoImgSrc} />,
      },
      {
        title: "Coin",
        dataIndex: "Coin",
        key: "Coin",
        sorter: (a,b)=>a["Coin"].charCodeAt(0)-b["Coin"].charCodeAt(0),
      },
      {
        title: "Total",
        dataIndex: "Total",
        key: "Total",
        sorter: (a, b) => a.Total - b.Total,
      },
      {
        title: "Available",
        dataIndex: "Available",
        key: "Available",
        sorter: (a, b) => a["Available"] - b["Available"],
      },
  
      {
        title: "BTC Equivalent  Value",
        dataIndex: "BTC Equivalent  Value",
        key: "BTC Equivalent  Value",
        sorter: (a, b) => a["BTC Equivalent  Value"] - b["BTC Equivalent  Value"],
      },
      {
        dataIndex: "Buy",
        key: "Buy",
        width:"10%",
        render: () => (
          <Button onClick={handleClick}>
            {"Buy"}
          </Button>)
      },
      {
        dataIndex: "Sell",
        key: "Sell",
        width:"10%",
        render: () => (
          <Button onClick={handleClick}>
            {"Sell"}
          </Button>)
      },
  
      {
        dataIndex: "Deposit",
        key: "Deposit",
        width:"10%",
        render: () => (
          <Button onClick={handleDeposit}>
            {"Deposit"}
          </Button>)
      },
  
    ];
 
    return (
    <>
    <History onClick={()=>navigate(`/spotwallethistory/${currentUser._id}`)}>History</History>
    <MyTable dataSource={data} columns={columns} rowClassName={"row"} pagination={{ pageSize: 15}}/>
    {currentUser&&<DepositModal modalOpen={modalOpen} setModalOpen={setModalOpen}/>};
    </>
  )};// setup wallet table
  
  const MyTable = styled(Table)`
  width: 80%;
    position: relative;
    top: 30px;
    background-color: ${COLORS.grey};
    border-radius: 15px;
    .row {
      color: ${COLORS.black};
      background-color: ${COLORS.grey};
    }
  `;
   const Button=styled.button`
   border-radius: 15px;
   width: 100px;
   color: ${COLORS.grey};
   padding: 3px;
   background-color:${COLORS.blue};
   `;

const History=styled.button`
width: 150px;
height:50px;
color: ${COLORS.white};
background-color: ${COLORS.blue};
font-weight:600px;
font-size:20px;
border-radius:15px;
margin-top:20px;
position: relative;
left:600px;
`;



export default SpotWallet;