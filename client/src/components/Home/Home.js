import { useContext } from "react";
import HomeSwiper from "./HomeSwiper";
import { CurrentPriceContext } from "../CurrentPricesContext";
import TradeTable from "./TradeTable";
import UserPanel from "./UserPanel";
import NewsHome from "./NewsHome";
import { CurrentNewsContext } from "../CurrentNewsContext";
import { CircularProgress } from "@mui/material";
import styled from "styled-components";
import { CurrentUserContext } from "../CurrentUserContext";

const Home = () => {
  const { currentPrice, priceStatus } = useContext(CurrentPriceContext);
  const { newsStatus } = useContext(CurrentNewsContext);
  const { currentUser, userStatus } = useContext(CurrentUserContext);
  const currentUserId = sessionStorage.getItem("userId");
  // setInterval(() => {
  //   setPriceRefetch(!priceRefetch)
  // }, 5000);
  console.log(currentPrice);
  //set fetech new market data every 5 seconds
  return priceStatus === "loading" ||
    newsStatus === "loading" ||
    (currentUserId && userStatus === "loading") ? (
    <MyCircularProgress size="60px" />
  ) : (
    <>
      {currentPrice && (
        <div>
          <UserPanel currentPrice={currentPrice} />
          <HomeSwiper />
          {(!currentUser || currentUser.wallet) && <TradeTable />}//if user skip KYC, they can not trade, but can see some parts of the home page
          <NewsHome />
        </div>
      )}
    </>
  );
};

const MyCircularProgress = styled(CircularProgress)`
  position: fixed;
  left: 900px;
  top: 400px;
  width: 300px;
  z-index: 99;
`;

export default Home;
