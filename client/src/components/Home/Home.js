import { useContext } from "react";
import HomeSwiper from "./HomeSwiper";
import { CurrentPriceContext } from "../CurrentPricesContext";
import TradeTable from "./TradeTable";
import UserPanel from "./UserPanel";
import NewsHome from "./NewsHome";

const Home = () => {
  const { currentPrice} =
    useContext(CurrentPriceContext);

  // setInterval(() => {
  //   setPriceRefetch(!priceRefetch)
  // }, 5000);

  //set fetech new market data every 5 seconds
  return (
    currentPrice && (
      <>
        <UserPanel currentPrice={currentPrice} />
        <HomeSwiper />
        <TradeTable />
        <NewsHome />
      </>
    )
  );
};

export default Home;
