import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./header and footer/Header";
import GlobalStyles from "./GlobalStyles";
import Home from "./Home/Home";
import SignUp from "./SignUp/SignUp";
import TermsandConditions from "./SignUp/TermsandConditions/TermsandConditions";
import UserVerify from "./SignUp/UserVerify/UserVerify";
import Wallet from "./Wallet/Wallet";
import Exchange from "./Exchange/Exchange";
import NFTHome from "./NFT/NFTHome";
import SpotWalletHistory from "./Wallet/SpotWalletHistory";
import { CurrentUserContext } from "./CurrentUserContext";
import { useContext } from "react";
import NewsHome from "./Home/NewsHome";
import Footer from "./header and footer/Footer";
import TradeTable from "./Home/TradeTable";
import { CurrentPriceContext } from "./CurrentPricesContext";
import TermDepositWalletHistory from "./Wallet/TermDepositWalletHistory";
import UpdateUserInfo from "./SignUp/UserVerify/UpdateUserInfo";

const App = () => {
  const { currentUser } = useContext(CurrentUserContext);
  const { currentPrice } = useContext(CurrentPriceContext);
  return (
    <>
      <BrowserRouter>
        <GlobalStyles />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup/:userId" element={<SignUp />} />
          <Route path="/termsandconditions" element={<TermsandConditions />} />
          <Route path="/userverify/:userId" element={<UserVerify />} />
          <Route path="/wallet/:userId" element={<Wallet />} />
          <Route path="/exchange" element={<Exchange />} />
          <Route path="/nft" element={<NFTHome />} />
          <Route path="/updateuserinfo" element={<UpdateUserInfo/>} />
          <Route path="/trade" element={currentPrice && <TradeTable />} />
          <Route
            path="/spotwallethistory/:userId"
            element={currentUser && <SpotWalletHistory />}
          />
          <Route path="/news" element={<NewsHome />} />
          <Route
            path="/termdepositwallethistory/:userId"
            element={currentUser && <TermDepositWalletHistory />}
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
