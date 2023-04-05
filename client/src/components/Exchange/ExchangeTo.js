import styled from "styled-components";
import cryptos from "../../data/cryptos.json";
import { useContext} from "react";
import { CurrentPriceContext } from "../CurrentPricesContext";

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
    <WrapperFrom>
      <p>To</p>
      {formDataFrom.cryptoFrom &&
        formDataTo.cryptoTo &&
        (cryptoPair ? (
          <P>
            <span>Current Exchange Rate: </span>
            <span>{currentExchangeRate}</span>
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
        <p>
          <span>Based on Your Balance, The Maximum Amount you can get:</span>
          <span>{walletAmount * exchangeRate}</span>
        </p>
      </Form>
      <button onClick={() => setModalOpen(true)}>Convert</button>
    </WrapperFrom>
  );
};

const P = styled.p`
  color: black;
  position: relative;
  top: 0px;
  left: 500px;
`;

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

export default ExchangeTo;
