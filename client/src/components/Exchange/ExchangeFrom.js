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
  };

  const handleFocus = () => {
    setMaxAmount(false);
    setInputToFlag(false);
    setInputFromFlag(true);
    if (inputToFlag && formDataTo.amount) {
      formDataFrom.amount = "";
      formDataTo.amount = "";
    }
  };
console.log(walletAmount);
console.log(formDataFrom.amount);
console.log(formDataFrom.amount>walletAmount);
  useEffect(() => {
    setMaxAmount(false);
  }, [formDataFrom.cryptoFrom]);


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
              : "")
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
