import { useContext, useEffect, useState } from "react";
import HomeSwiper from "./HomeSwiper"
import { CurrentPriceContext } from "../CurrentPricesContext";
import TradeTable from "./TradeTable";
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
    <HomeSwiper/>
    <TradeTable/>
    <NewsHome/>
    </>
 
    
  );
};



export default Home;

