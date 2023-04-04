import React from "react";
import {COLORS} from "../Constants"
import { useContext } from "react";
import styled from "styled-components";
import cryptos from "../../data/cryptos.json";
import { Table, Avatar } from "antd";
import { CurrentUserContext } from "../CurrentUserContext";
import { CurrentPriceContext } from "../CurrentPricesContext";
import { useNavigate } from "react-router-dom";

const SpotWallet=()=>{
    const { currentUser } = useContext(CurrentUserContext);
    const { currentPrice } = useContext(CurrentPriceContext);
    const navigate=useNavigate();

    const handleClick=()=>{
      navigate(`/exchange/${currentUser._id}`)
    }
 
 
  // const btcPrice=currentPrice.find((item)=>item.symbol_id_exchange==="BTCUSDT").price
    const data=currentUser.wallet.map((item)=>{
        const crypto = cryptos.find(
            (singleCrypto) => item.name === singleCrypto.name
          );


     
      return {
        cryptoImgSrc: crypto.imageSrc,
        "Coin": crypto.name,
        "Total": item.amount,
        "Available": item.amount,
        // "BTC Value":(item.amount/btcPrice).toFixed(6)
      
      };
    }
    );
  
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
        title: "BTC Value",
        dataIndex: "BTC Value",
        key: "BTC Value",
        sorter: (a, b) => a["BTC Value"] - b["BTC Value"],
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
          <Button onClick={handleClick}>
            {"Deposit"}
          </Button>)
      },
  
    ];
  
    return <MyTable dataSource={data} columns={columns} rowClassName={"row"} pagination={{ pageSize: 15}}/>;
  };
  
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














//     const {currentUser}=useContext(CurrentUserContext)
//     console.log(currentUser.fullName);
//     return (
      
      
//     currentUser &&
// <>
//     <Img src="data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMzkuNDMgMjk1LjI3Ij48dGl0bGU+dGV0aGVyLXVzZHQtbG9nbzwvdGl0bGU+PHBhdGggZD0iTTYyLjE1LDEuNDVsLTYxLjg5LDEzMGEyLjUyLDIuNTIsMCwwLDAsLjU0LDIuOTRMMTY3Ljk1LDI5NC41NmEyLjU1LDIuNTUsMCwwLDAsMy41MywwTDMzOC42MywxMzQuNGEyLjUyLDIuNTIsMCwwLDAsLjU0LTIuOTRsLTYxLjg5LTEzMEEyLjUsMi41LDAsMCwwLDI3NSwwSDY0LjQ1YTIuNSwyLjUsMCwwLDAtMi4zLDEuNDVoMFoiIHN0eWxlPSJmaWxsOiM1MGFmOTU7ZmlsbC1ydWxlOmV2ZW5vZGQiLz48cGF0aCBkPSJNMTkxLjE5LDE0NC44djBjLTEuMi4wOS03LjQsMC40Ni0yMS4yMywwLjQ2LTExLDAtMTguODEtLjMzLTIxLjU1LTAuNDZ2MGMtNDIuNTEtMS44Ny03NC4yNC05LjI3LTc0LjI0LTE4LjEzczMxLjczLTE2LjI1LDc0LjI0LTE4LjE1djI4LjkxYzIuNzgsMC4yLDEwLjc0LjY3LDIxLjc0LDAuNjcsMTMuMiwwLDE5LjgxLS41NSwyMS0wLjY2di0yOC45YzQyLjQyLDEuODksNzQuMDgsOS4yOSw3NC4wOCwxOC4xM3MtMzEuNjUsMTYuMjQtNzQuMDgsMTguMTJoMFptMC0zOS4yNVY3OS42OGg1OS4yVjQwLjIzSDg5LjIxVjc5LjY4SDE0OC40djI1Ljg2Yy00OC4xMSwyLjIxLTg0LjI5LDExLjc0LTg0LjI5LDIzLjE2czM2LjE4LDIwLjk0LDg0LjI5LDIzLjE2djgyLjloNDIuNzhWMTUxLjgzYzQ4LTIuMjEsODQuMTItMTEuNzMsODQuMTItMjMuMTRzLTM2LjA5LTIwLjkzLTg0LjEyLTIzLjE1aDBabTAsMGgwWiIgc3R5bGU9ImZpbGw6I2ZmZjtmaWxsLXJ1bGU6ZXZlbm9kZCIvPjwvc3ZnPg=="/>
//     <H1>{currentUser.fullName}</H1>
//     {currentUser.wallet.map((item)=>{
//     return (
//         <>
//         {/* <P>{item.name}</P>
//         <P>{item.amount}</P> */}
//         <h1>123</h1>
//         </>
//     ) 
//     }
//     )
// }
//   </>

      
//     )
// }


// const Img=styled.img`
// width: 100px;
// position: relative;
// top:200px
// `;

// const H1=styled.h1`
// width: 100px;
// position: relative;
// top:200px;
// color: white;

// `;

// const P=styled.p`
// width: 100px;
// position: relative;
// top:200px;
// color: white;

// `;


export default SpotWallet;