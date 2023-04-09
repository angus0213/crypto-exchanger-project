import { CurrentUserContext } from "../CurrentUserContext";
import { useContext } from "react";
import React from "react";
import {COLORS} from "../Constants"
import styled from "styled-components";
import cryptos from "../../data/cryptos.json";
import { Table, Avatar } from "antd";
import { CurrentPriceContext } from "../CurrentPricesContext";
import { useNavigate } from "react-router-dom";

const TermDepositWalletHistory=()=>{
    const { currentUser} = useContext(CurrentUserContext);
    const { currentPrice } = useContext(CurrentPriceContext);
    const navigate=useNavigate();

  
  const data=  currentUser.depositWalletHistory.map((history)=>{
   
    return {
        "ImageURL":history.imageSrc,
        "CryptoName":history.crypto,
        "Type":history.type,
        "Amount":history.amount,
        "Date":new Date(history.timestamp).toLocaleString("en-US")
    }
})
    const columns = [
      {
        dataIndex: "ImageURL",
        width:"1%",
        render: (text, record) => <Avatar src={record.ImageURL} />,
      },
     
      {
        title: "Crypto Name",
        dataIndex: "CryptoName",
        key: "CryptoName",
        sorter: (a,b)=>a["CryptoName"].charCodeAt(0)-b["CryptoName"].charCodeAt(0),
      },
      {
        title: "Type",
        dataIndex: "Type",
        key: "Type",
        sorter: (a,b)=>a["Type"].charCodeAt(0)-b["Type"].charCodeAt(0),
      },
      {
        title: "Amount",
        dataIndex: "Amount",
        key: "Amount",
        sorter: (a, b) => a["Amount"] - b["Amount"],
      },
     
      {
        title: "Date",
        dataIndex: "Date",
        key: "Date",
        sorter: (a, b) => Date.parse(a["Date"]) - Date.parse(b["Date"]),
      },
  
    ];
 
    return (
    <>
    <History>Trading History</History>
    <MyTable dataSource={data} columns={columns} rowClassName={"row"} pagination={{ pageSize: 15}}/>;
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

export default TermDepositWalletHistory;