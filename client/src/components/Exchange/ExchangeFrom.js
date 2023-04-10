import styled from "styled-components";
import cryptos from "../../data/cryptos.json";
import { CurrentUserContext } from "../CurrentUserContext";
import { useContext } from "react";
import { COLORS } from "../Constants";

const ExchangeFrom = ({
  formDataFrom,
  formDataTo,
  handleChangeFrom,
  maxAmount,
  setMaxAmount,
  walletAmount,
  exchangeRate,
  setFormDataFrom,
}) => {
  const { currentUser } = useContext(CurrentUserContext);

  const handleClickMaxAmountFlag = () => {
    //need
    setMaxAmount(true);
    setFormDataFrom({ ...formDataFrom, amount: walletAmount });
  }; // when user click, will let the max amount be showed in the sell text area

  return (
    <WrapperFrom>
      <div>
        <Direction>From</Direction>
        {currentUser && formDataFrom && (
          <WalletInfo>
            <MaxButton onClick={handleClickMaxAmountFlag}>Max Amount</MaxButton>
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
            maxAmount
              ? walletAmount
              : formDataTo.amount
              ? formDataTo.amount / exchangeRate
              : formDataFrom.amount   //if click max amount, set input value=walletAmount; if user doesn't click max button and type in "To" input area, set "From" input area value= "To" input
          }
          onFocus={setMaxAmount(false)}
          disabled={
            !formDataFrom.cryptoFrom ||
            !formDataTo.cryptoTo ||
            formDataTo.amount
          }
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
  top: 10px;
  left: 80px;
`;

const Amount = styled.span`
  color: ${COLORS.blue};
`;

const MaxButton = styled.button`
  display: flex;
  font-size: 15px;
  position: relative;
  left: -30px;
  top: -5px;
  background-color: ${COLORS.blue};
  height: 30px;
  border-radius: 15px;
  color: ${COLORS.white};
  padding: 5px 30px 5px 30px;
`;

const WalletInfo = styled.div`
  display: flex;
  font-size: 15px;
  color: black;
  position: relative;
  left: 300px;
  top: -35px;
`;
const Select = styled.select`
  position: relative;
  margin-left: 15px;
  width: 150px;
  height: 35px;
  font-size: 20px;
`;

const WrapperFrom = styled.div`
  background-color: ${COLORS.white};
  position: relative;
  top: 100px;
  width: 800px;
  height: 300px;
  left: 500px;
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
