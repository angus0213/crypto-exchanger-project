import styled from "styled-components";
import { CurrentUserContext } from "../CurrentUserContext";
import { useContext } from "react";
import { COLORS } from "../Constants";
import { AiTwotoneSound } from "react-icons/ai";
import { Link } from "react-router-dom";

const UserPanel = ({ currentPrice }) => {
  const { currentUser } = useContext(CurrentUserContext);
  let sumValueWithoutUSDTinWallet = 0;
  let sumValueinWallet = 0;
  let sumValueWithoutUSDTinDepositWallet = 0;
  let sumValueinDepositWallet = 0;
  let sumValue = 0;
  if (currentUser.wallet) {
    currentUser.wallet.forEach((crypto) => {
      currentPrice.forEach((tradingPair) => {
        if (
          crypto._id === tradingPair.asset_id_base_exchange &&
          tradingPair.asset_id_quote_exchange === "USDT"
        ) {
          sumValueWithoutUSDTinWallet =
            sumValueWithoutUSDTinWallet + crypto.amount * tradingPair.price;
        }
      });
      if (crypto._id === "USDT") {
        sumValueinWallet = sumValueWithoutUSDTinWallet + crypto.amount;
      }
    }); //calculate the total asset in wallet

    currentUser.depositWallet.forEach((crypto) => {
      currentPrice.forEach((tradingPair) => {
        if (
          crypto._id === tradingPair.asset_id_base_exchange &&
          tradingPair.asset_id_quote_exchange === "USDT"
        ) {
          sumValueWithoutUSDTinDepositWallet =
            sumValueWithoutUSDTinDepositWallet +
            crypto.amount * tradingPair.price;
        }
      });
      if (crypto._id === "USDT") {
        sumValueinDepositWallet =
          sumValueWithoutUSDTinDepositWallet + crypto.amount;
      }
    }); //calculate the total asset in deposit wallet

    sumValue = Number(sumValueinWallet) + Number(sumValueinDepositWallet);//calculate the total asset of the user and showed in Home page
  }
  return (
    currentUser.country? (
      <Panel>
        <MyAiTwotoneSound />{" "}
        <Announce>
          Dear{" "}
          <Highlight>{currentUser._id.slice(0, 5).concat("***")}</Highlight>{" "}
          customer: You have <Highlight>{sumValue.toFixed(4)} USDT</Highlight>{" "}
          equivalent asset at {new Date().toLocaleString()}
        </Announce>
      </Panel>
    ):
    (currentUser &&
      <Panel>
        <MyAiTwotoneSound />{" "}
        <Announce>
          Dear{" "}
          <Highlight>{currentUser._id.slice(0, 5).concat("***")}</Highlight>{" "}
          customer: Please Finish <Highlight>KYC </Highlight>{" "}
          before trade! <Link to={"/updateuserinfo"}>Update Here</Link>
        </Announce>
      </Panel>
    )
  );
};

const Panel = styled.div`
  position: relative;
  top: 80px;
  left: 200px;
  height: 40px;
  background-color: ${COLORS.white};
  width: 1490px;
  display: flex;
  align-items: center;
`;
const Announce = styled.p`
  position: relative;
  left: 50px;
  font-size: 15px;
`;

const MyAiTwotoneSound = styled(AiTwotoneSound)`
  position: relative;
  left: 30px;
  font-size: 20px;
  color: ${COLORS.black};
`;

const Highlight = styled.span`
  color: ${COLORS.blue};
`;

export default UserPanel;
