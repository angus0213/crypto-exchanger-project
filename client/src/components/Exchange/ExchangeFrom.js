import { useEffect, useState } from "react";
import styled from "styled-components";
import cryptos from "../../data/cryptos.json";
import { CurrentUserContext } from "../CurrentUserContext";
import { useContext } from "react";

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
        <p>From</p>
        {currentUser && formDataFrom && (
          <WalletInfo>
            <p>
              <span>Your wallet Amount:</span>
              <span>{walletAmount}</span>
            </p>
            <button onClick={handleClickMaxAmountFlag}>
              Trade Max Amount Click Here
            </button>
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

const WalletInfo = styled.div`
  display: flex;
  gap: 30px;
  font-size: 20px;
`;
const Select = styled.select`
  position: relative;
  margin-left: 15px;
  width: 250px;
  height: 40px;
  font-size: 20px;
`;

const WrapperFrom = styled.div`
  background-color: white;
  position: relative;
  top: 200px;
  width: 1000px;
  height: 300px;
`;

const Img = styled.img`
  width: 4%;
`;
const Input = styled.input`
  width: 300px;
  height: 35px;
  margin-right: 50px;
  margin-top: 40px;
  margin-left: 50px;
`;

const Option = styled.option``;

const Form = styled.form``;

export default ExchangeFrom;
