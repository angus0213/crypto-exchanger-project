import { useState } from "react";
import ExchangeFrom from "./ExchangeFrom";
import ExchangeTo from "./ExchangeTo";
import { CurrentUserContext } from "../CurrentUserContext";
import { useContext } from "react";
import { MdCurrencyExchange } from "react-icons/md";
import styled from "styled-components";
import Modal from "react-modal";
import { GrClose } from "react-icons/gr";

const Exchange = () => {
  const { currentUser } = useContext(CurrentUserContext);
  const [formDataFrom, setFormDataFrom] = useState("");
  const [formDataTo, setFormDataTo] = useState("");
  const [maxAmount, setMaxAmount] = useState(false);
  const [inputFromFlag, setInputFromFlag] = useState(false);
  const [inputToFlag, setInputToFlag] = useState(false);
  const [modalOpen, setModalOpen]=useState(false);
  const [exchangeRate, setExchangeRate]=useState("");


  const handleChangeFrom = (key, value) => {
    setFormDataFrom({
      ...formDataFrom,
      [key]: value,
    });
  };

  const handleChangeTo = (key, value) => {
    setFormDataTo({
      ...formDataTo,
      [key]: value,
    });
  };

  let walletAmount = 0;
  if (currentUser && formDataFrom) {
    walletAmount = currentUser.wallet.find(
      (crypto) => crypto.name === formDataFrom.cryptoFrom
    ).amount;
  }

  if(formDataFrom.amount>walletAmount) {
    formDataFrom.amount=walletAmount
  }
  if(formDataTo.amount/exchangeRate>walletAmount) {
    formDataFrom.amount=walletAmount;
    formDataTo.amount=formDataFrom.amount*exchangeRate
  }

  let balanceMinus
  let balancePlus
  console.log(formDataFrom.amount);
  console.log(exchangeRate);
  if(formDataFrom.amount &&exchangeRate){
    balanceMinus=formDataFrom.amount
    balancePlus=formDataFrom.amount*exchangeRate
    console.log(formDataFrom.amount);
  }else{
    balanceMinus=formDataTo.amount/exchangeRate
    balancePlus=formDataTo.amount
  }

  
  const handleConfirm=()=>{

    fetch(`/wallet/${currentUser._id}`, {

    })}



  return (
    <>
      <ExchangeFrom
        formDataFrom={formDataFrom}
        setFormDataFrom={setFormDataFrom}
        handleChangeFrom={handleChangeFrom}
        formDataTo={formDataTo}
        maxAmount={maxAmount}
        setMaxAmount={setMaxAmount}
        inputFromFlag={inputFromFlag}
        setInputFromFlag={setInputFromFlag}
        inputToFlag={inputToFlag}
        setInputToFlag={setInputToFlag}
        walletAmount={walletAmount}
        exchangeRate={exchangeRate}
   
      />
     <MyMdCurrencyExchange/>

      <ExchangeTo
        formDataTo={formDataTo}
        setFormDataTo={setFormDataTo}
        handleChangeTo={handleChangeTo}
        formDataFrom={formDataFrom}
        maxAmount={maxAmount}
        setMaxAmount={setMaxAmount}
        inputFromFlag={inputFromFlag}
        setInputFromFlag={setInputFromFlag}
        inputToFlag={inputToFlag}
        setInputToFlag={setInputToFlag}
        walletAmount={walletAmount}
        setModalOpen={setModalOpen}
        exchangeRate={exchangeRate}
        setExchangeRate={setExchangeRate}
    
      />
      <Modal isOpen={modalOpen}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}>
                <CloseButton onClick={() => setModalOpen(false)}>
          {" "}
          <GrClose />
        </CloseButton>
        <div>
          <h1>Thanks for using Crypto<span>Beats</span></h1>
          <h1><span>You will get</span><span>{balancePlus}</span><span>{formDataTo.cryptoTo}</span></h1>
          <h1><span>Your</span><span>{formDataFrom.cryptoFrom}</span><span>balance will be reduced to</span> <span>{walletAmount- balanceMinus}</span></h1>
            <button onClick={handleConfirm}>Confirm</button>
        </div>
      </Modal>
    </>
  );
};

const MyMdCurrencyExchange=styled(MdCurrencyExchange)`
  font-size: 120px;
  color: white; 
  position: relative;
  left: 300px;
  top:200px
  /* background-color:red; */
`;

const Div = styled.div`
  
  font-size: 20px;
  color: white;
  z-index:99;
  position: relative;
  left: 800px;
  background-color:red;
`;

const CloseButton = styled.button`
  background-color: transparent;
  position: fixed;
  top: 160px;
  right: 680px;
`;
export default Exchange;
