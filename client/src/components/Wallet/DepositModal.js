import Modal from "react-modal";
import styled from "styled-components";
import { COLORS } from "../Constants";
import { GrClose } from "react-icons/gr";
import { useState } from "react";
import { CurrentUserContext } from "../CurrentUserContext";
import { useContext } from "react";

const DepositModal = ({
  modalOpen,
  setModalOpen,
  selectedCoin,
  selectedCoinSrc,
  maxAmount,
  setMaxAmount,
}) => {
  const { currentUser, refetch, setRefetch } = useContext(CurrentUserContext);
  const [formData, setFormData] = useState(""); //control the panel to switch login method;

  const handleChange = (key, value) => {
    setFormData({
      crypto: selectedCoin,
      [key]: value,
    });
  }; //collect user input data
  console.log(maxAmount);
  const currentCrypto = currentUser.wallet.find((item) => {
    return item._id === selectedCoin;
  }); //find selected crypto info

  let compareMaxAmountFlag = true;
  if (currentCrypto && formData.amount > currentCrypto.amount) {
    compareMaxAmountFlag = false;
  } //check selected crypto wallet amount
  const submitEnable =
    formData.amount && formData.amount > 0 && compareMaxAmountFlag; //enable submit button

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`/depositwallet/${currentUser._id}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
        id: currentUser._id,
        imageSrc: currentCrypto.imageSrc,
        type: "deposit",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setFormData(""); //clear form data after submit
        setModalOpen(false);
        setRefetch(!refetch);
      })
      .catch((err) => console.log(err));
  }; //send deposit info to the backend
  return (
    <>
      <MyModal
        isOpen={modalOpen}
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
      >
        <CloseButton
          onClick={() => {
            setModalOpen(false);
            setFormData("");
          }}
        >
          {" "}
          <GrClose />
        </CloseButton>
        {currentCrypto && (
          <div>
            <MaxButton
              onClick={() => {
                setMaxAmount(true);
                setFormData({
                  crypto: selectedCoin,
                  amount: currentCrypto.amount,
                });
              }}
            >
              Max
            </MaxButton>
            <HeadWrapper>
              <p>{selectedCoin}</p>
              <CryptoImg src={selectedCoinSrc} />
            </HeadWrapper>
            <Input
              type={"text"}
              id="amount"
              required
              placeholder="Deposit Amount"
              value={maxAmount ? currentCrypto.amount : formData.amount}
              onFocus={() => {
                setMaxAmount(false);
              }}
              onChange={(e) => handleChange(e.target.id, e.target.value)}
            />
          </div>
        )}
        <Deposit onClick={handleSubmit} disabled={!submitEnable}>
          Deposit
        </Deposit>
      </MyModal>
    </>
  );
};

const MyModal = styled(Modal)`
  background-color: ${COLORS.darkgray};
  width: 650px;
  height: 500px;
  position: fixed;
  left: 720px;
  top: 120px;
  border-radius: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 50px;
`;

const HeadWrapper = styled.div`
  display: flex;
  font-size: 30px;
  gap: 10px;
`;

const CryptoImg = styled.img`
  width: 10%;
`;

const MaxButton = styled.button`
  display: flex;
  font-size: 15px;
  position: relative;
  left: -80px;
  top: -100px;
  background-color: ${COLORS.blue};
  height: 30px;
  border-radius: 15px;
  color: ${COLORS.white};
  padding: 5px 30px 5px 30px;
`;

const Input = styled.input`
  width: 300px;
  height: 40px;
  font-size: 18px;
  background-color: ${COLORS.white};
  position: relative;
  top: 20px;
  left: 50px;
`;

const Deposit = styled.button`
  background-color: ${COLORS.blue};
  height: 50px;
  border-radius: 15px;
  font-size: 20px;
  color: ${COLORS.white};
  position: relative;
  left: 20px;
  top: 50px;
  padding: 5px 30px 5px 30px;
`;

const CloseButton = styled.button`
  background-color: transparent;
  position: fixed;
  top: 165px;
  right: 580px;
`;

export default DepositModal;
