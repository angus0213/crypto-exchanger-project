import styled from "styled-components";
import cryptos from "../../data/cryptos.json";
import { useContext} from "react";
import { CurrentPriceContext } from "../CurrentPricesContext";
import {COLORS} from "../Constants";

const ExchangeTo = ({
  formDataTo,
  formDataFrom,
  handleChangeTo,
  maxAmount,
  setMaxAmount,
  inputFromFlag,
  setInputFromFlag,
  inputToFlag,
  setInputToFlag,
  walletAmount,
  setModalOpen,
  exchangeRate,
  setExchangeRate,
}) => {
  const { currentPrice } = useContext(CurrentPriceContext);

  const handleFocus = () => {
    setMaxAmount(false);
    setInputToFlag(true);
    setInputFromFlag(false);
    if (inputFromFlag && formDataFrom.amount) {
      formDataTo.amount = "";
      formDataFrom.amount = "";
    }
  };//if user type amount in sell text area, but changed to input in buy text area later(same as reverse), this function will reset the value of two input areas

  let cryptoPair = "";
  let currentExchangeRate;
  if (formDataFrom.cryptoFrom && formDataTo.cryptoTo && currentPrice) {
    cryptoPair = currentPrice.find((crypto) => {
      return (
        (crypto.asset_id_base_exchange === formDataFrom.cryptoFrom &&
          crypto.asset_id_quote_exchange === formDataTo.cryptoTo) ||
        (crypto.asset_id_base_exchange === formDataTo.cryptoTo &&
          crypto.asset_id_quote_exchange === formDataFrom.cryptoFrom)
      );
    });
  }//based on the data got from API, this function will select right data from API data

  if (
    cryptoPair &&
    cryptoPair.asset_id_base_exchange === formDataFrom.cryptoFrom &&
    cryptoPair.asset_id_quote_exchange === formDataTo.cryptoTo
  ) {
    currentExchangeRate = cryptoPair.price;
  }
// calculate exchange rate
  if (
    cryptoPair &&
    cryptoPair.asset_id_base_exchange === formDataTo.cryptoTo &&
    cryptoPair.asset_id_quote_exchange === formDataFrom.cryptoFrom
  ) {
    currentExchangeRate = 1 / cryptoPair.price;
  }
// same as above
  if (currentExchangeRate) {
    setExchangeRate(currentExchangeRate);
  }

  return (
    <WrapperTo>
      <Direction>To:</Direction>
      {formDataFrom.cryptoFrom &&
        formDataTo.cryptoTo &&
        (cryptoPair ? (
          <P>
            <span>Current Exchange Rate: </span>
            <Amount>{currentExchangeRate}</Amount>
          </P>
        ) : (
          <P>
            <span>
              We don't provide this pair currently, Please exchange to USDT
              firstly!
            </span>
          </P> /*this nested code will let exchange rate be showed correctly */ 
        ))}
      <Form>
        {formDataTo.cryptoTo && (
          <Img
            src={
              cryptos.find((crypto) => crypto.name === formDataTo.cryptoTo)
                .imageSrc
            }
          />
        )}
        <Select
          id="cryptoTo"
          onChange={(e) => handleChangeTo(e.target.id, e.target.value)}
        >
          <Option disabled selected>
            Select
          </Option>
          {cryptos.map((item) => {
            return <Option>{item.name}</Option>;
          })}
        </Select>
        <Input
          type={"text"}
          id="amount"
          required
          onChange={(e) => handleChangeTo(e.target.id, e.target.value)}
          value={
            (maxAmount ? walletAmount * exchangeRate : formDataTo.amount) ||
            (inputToFlag
              ? formDataTo.amount
              : formDataFrom.amount * exchangeRate
              ? formDataFrom.amount * exchangeRate
              : "")  /*this part of code will work with exchangeFrom.js's same part, and let the input value be showed correctly whenever user typed in sell text area or buy text area*/ 
          }
          onFocus={handleFocus}
          disabled={!formDataTo.cryptoTo}
        />
        </Form>
        <Reminder>
          
          <span>Based on Your Balance, The Maximum Amount you can get: </span>
          <Amount>{walletAmount * exchangeRate}</Amount>
        </Reminder>
    
      <Convert onClick={() => setModalOpen(true)}>Convert</Convert>
    </WrapperTo>
  );
};

const P = styled.p`
  width: 500px;
  position: relative;
  top: -28px;
  left: 320px;
  font-size:15px;
`;

const Reminder = styled.p`
  width: 500px;
  position: relative;
  top: 65px;
  left: 130px;
  font-size:15px;
  color: white;
`;

const Amount = styled.span`
  color: ${COLORS.blue};
`;

const Direction = styled.h1`
  display: flex;
  color: ${COLORS.blue};
  font-size: 30px;
  position: relative;
  top:10px;
  left: 80px;
`;


const WrapperTo = styled.div`
  background-color: ${COLORS.white}  ;
  position: relative;
  top: 150px;
  width: 800px;
  height: 330px;
  left:400px;
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

const Select = styled.select`
  position: relative;
  margin-left: 15px;
margin-right: 50px;
  width: 150px;
  height: 35px;
  font-size: 20px;
`;

const Form = styled.form`
display: flex;
align-items: center;
justify-content: center;
position: relative;
top: 30px;
`;

const Convert = styled.button`
  background-color: ${COLORS.blue};
  height: 50px;
  border-radius: 15px;
  font-size: 20px;
  color: ${COLORS.white};
  position: relative;
  left: 540px;
  top:80px;
  padding: 5px 30px 5px 30px;
`;

export default ExchangeTo;
