import { useState } from "react";
import ExchangeFrom from "./ExchangeFrom";
import ExchangeTo from "./ExchangeTo";
import { CurrentUserContext } from "../CurrentUserContext";
import { useContext } from "react";
import { MdCurrencyExchange } from "react-icons/md";
import styled from "styled-components";
import Modal from "react-modal";
import { GrClose } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { COLORS } from "../Constants";
import { CurrentPriceContext } from "../CurrentPricesContext";
import { CircularProgress } from "@mui/material";

const Exchange = () => {
  const { currentUser, refetch, setRefetch } = useContext(CurrentUserContext); //refetch currentUser
  const [formDataFrom, setFormDataFrom] = useState(""); //record user the crypto name and amount that user wish to spend
  const [formDataTo, setFormDataTo] = useState(""); //record user the crypto name and amount that user wish to buy
  const [maxAmount, setMaxAmount] = useState(false); // if the user press max amount button, the whole amount in the wallet will be shown in input area automaticlly
  const [modalOpen, setModalOpen] = useState(false); //set confirmation modal open or close
  const [exchangeRate, setExchangeRate] = useState(""); //set exchange rate between selected cryptos
  const { priceStatus } = useContext(CurrentPriceContext);
  const navigate = useNavigate();

  const handleChangeFrom = (key, value) => {
    setFormDataFrom({
      ...formDataFrom,
      [key]: value,
    });
  }; //record the inputs of sell

  const handleChangeTo = (key, value) => {
    setFormDataTo({
      ...formDataTo,
      [key]: value,
    });
  }; //record the inputs of buy

  let walletAmount = 0;
  if (currentUser && formDataFrom.cryptoFrom) {
    walletAmount = currentUser.wallet.find(
      (crypto) => crypto.name === formDataFrom.cryptoFrom
    ).amount;
  } //get the wallet amount that user want to sell

  if (formDataFrom.amount > walletAmount) {
    formDataFrom.amount = walletAmount;
  } //set the user sell input amount no high than wallet amount

  if (formDataTo.amount / exchangeRate > walletAmount) {
    formDataFrom.amount = walletAmount;
    formDataTo.amount = formDataFrom.amount * exchangeRate;
  } //set the user buy input amount no high than wallet amount

  let balanceMinus;
  let balancePlus;
  if (formDataFrom.amount && exchangeRate) {
    balanceMinus = Number(formDataFrom.amount);
    balancePlus = Number(formDataFrom.amount * exchangeRate);
  }
  if (formDataTo.amount && exchangeRate) {
    balanceMinus = Number(formDataTo.amount / exchangeRate);
    balancePlus = Number(formDataTo.amount);
  } //if input data in sell input text area, will use "if" statement will set the changed amount; if input data in buy input text area, will use "else" statement will set the changed amount

  const handleConfirm = () => {
    fetch(`/wallet/${currentUser._id}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        userId: currentUser._id,
        updateInfo: [
          { _id: formDataFrom.cryptoFrom, balanceChange: -balanceMinus },
          { _id: formDataTo.cryptoTo, balanceChange: balancePlus },
        ],
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.data.modifiedCount >= 1) {
          setModalOpen(false);
          setRefetch(!refetch);
          navigate(`/wallet/${currentUser._id}`);
        }
      })
      .catch((err) => console.log(err));
  }; // set changed info to backend

  return priceStatus === "loading" ? (
    <MyCircularProgress size="60px" />
  ) : (
    <>
      <ExchangeFrom
        formDataFrom={formDataFrom}
        setFormDataFrom={setFormDataFrom}
        handleChangeFrom={handleChangeFrom}
        formDataTo={formDataTo}
        maxAmount={maxAmount}
        setMaxAmount={setMaxAmount}
        walletAmount={walletAmount}
        exchangeRate={exchangeRate}
      />
      <MyMdCurrencyExchange />
      <ToWrapper>
        <ExchangeImg src="../webImages/chart.png" />
        <ExchangeTo
          formDataTo={formDataTo}
          setFormDataTo={setFormDataTo}
          handleChangeTo={handleChangeTo}
          formDataFrom={formDataFrom}
          walletAmount={walletAmount}
          setModalOpen={setModalOpen}
          exchangeRate={exchangeRate}
          setExchangeRate={setExchangeRate}
          setFormDataFrom={setFormDataFrom}
        />
        <MyModal
          isOpen={modalOpen}
          shouldCloseOnOverlayClick={true}
          shouldCloseOnEsc={true}
        >
          <CloseButton onClick={() => setModalOpen(false)}>
            {" "}
            <GrClose />
          </CloseButton>
          <h1>
            <span>Thanks for using Crypto</span>
            <Highlight>Beats!</Highlight>
          </h1>
          <h1>
            <span>You Will GET </span>
            <Highlight>{Number(balancePlus).toFixed(5)} </Highlight>
            <Highlight>{formDataTo.cryptoTo}</Highlight>
          </h1>
          <h1>
            <span>The Cost is </span>
            <Highlight>{Number(balanceMinus).toFixed(5)}</Highlight>
            <Highlight> {formDataFrom.cryptoFrom} </Highlight>
          </h1>
          <ConfirmButton onClick={handleConfirm}>Confirm</ConfirmButton>
        </MyModal>
      </ToWrapper>
    </>
  );
};

const ToWrapper = styled.div`
  display: flex;
`;

const MyCircularProgress = styled(CircularProgress)`
  position: fixed;
  left: 900px;
  top: 400px;
  width: 300px;
  z-index: 99;
`;

const ExchangeImg = styled.img`
  width: 25%;
  border-radius: 50%;
  position: relative;
  top: 50px;
  left: 120px;
`;

const MyModal = styled(Modal)`
  background-color: ${COLORS.darkgray};
  width: 800px;
  height: 500px;
  position: fixed;
  left: 720px;
  top: 120px;
  border-radius: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MyMdCurrencyExchange = styled(MdCurrencyExchange)`
  font-size: 80px;
  color: white;
  position: relative;
  left: 1000px;
  top: 120px;
`;

const CloseButton = styled.button`
  background-color: transparent;
  position: fixed;
  top: 160px;
  right: 380px;
`;

const Highlight = styled.span`
  color: ${COLORS.blue};
`;

const ConfirmButton = styled.button`
  width: 300px;
  height: 50px;
  color: ${COLORS.white};
  background-color: ${COLORS.blue};
  font-weight: 600px;
  font-size: 20px;
  border-radius: 15px;
  margin-top: 60px;
`;

export default Exchange;
