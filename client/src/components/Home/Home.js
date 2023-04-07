import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { CurrentPriceContext } from "../CurrentPricesContext";
import cryptos from "../../data/cryptos.json";
import Tables from "./Tables";
import UserPanel from "./UserPanel";
import NewsHome from "./NewsHome";


const Home = () => {
  const { currentPrice, priceRefetch, setPriceRefetch } = useContext(CurrentPriceContext);
  


  // setInterval(() => {
  //   setPriceRefetch(!priceRefetch)
  // }, 5000);
  return (
    currentPrice &&
    <>
    <UserPanel currentPrice={currentPrice}/>
    <Tables/>
    <NewsHome/>
    </>
 
    
  );
};



export default Home;

