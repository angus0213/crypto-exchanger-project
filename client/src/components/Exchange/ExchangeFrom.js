import { useEffect, useState } from "react";
import styled from "styled-components";
import cryptos from "../../data/cryptos.json";
import { CurrentUserContext } from "../CurrentUserContext";
import { useContext } from "react";
import {COLORS} from "../Constants";

const ExchangeFrom = ({
  formDataFrom,
  formDataTo,
  handleChangeFrom,
  maxAmount,
  setMaxAmount,
  inputFromFlag,
  setInputFromFlag,
  inputToFlag,
  setInputToFlag,
  walletAmount,
  exchangeRate
}) => {
  const { currentUser } = useContext(CurrentUserContext);

  const handleClickMaxAmountFlag = () => {
    setMaxAmount(true);
  };// when user click, will let the max amount be showed in the sell text area

  const handleFocus = () => {
    setMaxAmount(false);
    setInputToFlag(false);
    setInputFromFlag(true);
    if (inputToFlag && formDataTo.amount) {
      formDataFrom.amount = "";
      formDataTo.amount = "";
    }
  };//if user type amount in sell text area, but changed to input in buy text area later(same as reverse), this function will reset the value of two input areas

  useEffect(() => {
    setMaxAmount(false);
  }, [formDataFrom.cryptoFrom]);// if the user choose to type in the sell text area manually, the max amount button in sell form will be disabled


  return (
    <WrapperFrom>
      <div>
      <Direction>From</Direction>
        {currentUser && formDataFrom && (
          <WalletInfo>
                 <MaxButton onClick={handleClickMaxAmountFlag}>
            Max Amount
            </MaxButton>
            <p>
              <span>Your wallet Amount: </span>
              <Amount>{walletAmount}</Amount>
            </p>
          </WalletInfo>
        )}
      </div>

      <Form>
        <Input
          type={"text"}
          id="amount"
          required
          onChange={(e) => handleChangeFrom(e.target.id, e.target.value)}
          value={
            (maxAmount ? walletAmount : formDataFrom.amount) ||
            (inputFromFlag
              ? formDataFrom.amount
              : formDataTo.amount/exchangeRate
              ? formDataTo.amount/exchangeRate
              : "")/*this part of code will work with exchangeTo.js's same part, and let the input value be showed correctly whenever user typed in sell text area or buy text area*/
          }
          onFocus={handleFocus}
          disabled={!formDataFrom.cryptoFrom}
        />
        {formDataFrom.cryptoFrom && (
          <Img
            src={
              cryptos.find((crypto) => crypto.name === formDataFrom.cryptoFrom)
                .imageSrc
            }
          />
        )}
        <Select
          id="cryptoFrom"
          onChange={(e) => handleChangeFrom(e.target.id, e.target.value)}
        >
          <Option disabled selected>
            Select
          </Option>
          ;
          {cryptos.map((item, index) => {
            return <Option id={index}>{item.name}</Option>;
          })}
        </Select>
      </Form>
    </WrapperFrom>
  );
};

const Direction = styled.h1`
  display: flex;
  color: ${COLORS.blue};
  font-size: 30px;
  position: relative;
  top:10px;
  left: 80px;
`;

const Amount = styled.span`
  color: ${COLORS.blue};
`;

const MaxButton = styled.button`
  display: flex;
  font-size: 20px;
  position: relative;
  left: -30px;
  top:-5px;
  background-color: ${COLORS.blue};
  height: 40px;
  border-radius: 15px;
  color: ${COLORS.white};
  padding: 5px 30px 5px 30px;
`;

const WalletInfo = styled.div`
  display: flex;
  font-size: 20px;
  color: black;
  position: relative;
  left: 300px;
  top:-35px;
`;
const Select = styled.select`
  position: relative;
  margin-left: 15px;
  width: 150px;
  height: 35px;
  font-size: 20px;
`;

const WrapperFrom = styled.div`
  background-color: ${COLORS.white}  ;
  position: relative;
  top: 100px;
  width: 800px;
  height: 300px;
  left:500px;
  border-radius: 15px;
`;

const Img = styled.img`
  width: 4%;
`;
const Input = styled.input`
  width: 300px;
  height: 35px;
  background-color: ${COLORS.white};
  margin-right: 50px;
`;

const Option = styled.option`
color: ${COLORS.charcoal};
background-color: ${COLORS.white};
`;

const Form = styled.form`
display: flex;
align-items: center;
justify-content: center;
position: relative;
top: 30px;
`;


export default ExchangeFrom;
