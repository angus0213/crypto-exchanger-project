import styled from "styled-components";
import cryptos from "../../data/cryptos.json";
import { useContext } from "react";
import { CurrentPriceContext } from "../CurrentPricesContext";
import { COLORS } from "../Constants";

const ExchangeTo = ({
  formDataTo,
  formDataFrom,
  handleChangeTo,
  walletAmount,
  setModalOpen,
  exchangeRate,
  setExchangeRate,
  setFormDataTo,
  setFormDataFrom,
}) => {
  const { currentPrice } = useContext(CurrentPriceContext);

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
  } //based on the data got from API, this function will select right data from API data

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

  const handleClick = () => {
    setModalOpen(true);
    if (!formDataTo.amount) {
      setFormDataTo({
        ...formDataTo,
        amount: formDataFrom.amount * exchangeRate,
      }); //prepare from details (if user type in "From" input area, calculate "To" amount, and set in "To"'s formdata)
    }
    if (!formDataFrom.amount) {
      setFormDataFrom({
        ...formDataFrom,
        amount: formDataTo.amount / exchangeRate,
      }); //prepare To details (if user type in "To" input area, calculate "From" amount, and set in "From"'s formdata)
    }
  };

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
            formDataFrom.amount && exchangeRate && !formDataTo.amount
              ? formDataFrom.amount * exchangeRate
              : formDataTo.amount//set "To" input value based on whether "From" input value exist or not 
          }
          disabled={
            !formDataFrom.cryptoFrom ||
            !formDataTo.cryptoTo ||
            formDataFrom.amount
          }
        />
      </Form>
      <Reminder>
        <span>Based on Your Balance, The Maximum Amount you can get: </span>
        <Amount>{walletAmount * exchangeRate}</Amount>
      </Reminder>

      <Convert onClick={handleClick}>Convert</Convert>
    </WrapperTo>
  );
};

const P = styled.p`
  width: 500px;
  position: relative;
  top: -28px;
  left: 320px;
  font-size: 15px;
`;

const Reminder = styled.p`
  width: 500px;
  position: relative;
  top: 65px;
  left: 130px;
  font-size: 15px;
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
  top: 10px;
  left: 80px;
`;

const WrapperTo = styled.div`
  background-color: ${COLORS.white};
  position: relative;
  top: 150px;
  width: 800px;
  height: 330px;
  left: 400px;
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
  top: 80px;
  padding: 5px 30px 5px 30px;
`;

export default ExchangeTo;
