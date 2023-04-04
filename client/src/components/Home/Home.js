import { useContext, useEffect } from "react";
import styled from "styled-components";
import { CurrentPriceContext } from "../CurrentPricesContext";
// import SinglePairTrade from "./SinglePairTrade";
import cryptos from "../../data/cryptos.json";
import Tables from "./Tables"


const Home = () => {
  const { currentPrice, priceRefetch, setPriceRefetch } = useContext(CurrentPriceContext);
  console.log(cryptos);
  // setInterval(() => {
  //   setPriceRefetch(!priceRefetch)
  // }, 5000);
  return (
    currentPrice && <Tables/>


 
    
  );
};



export default Home;

