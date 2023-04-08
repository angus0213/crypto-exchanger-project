import Modal from "react-modal";
import styled from "styled-components";
import { COLORS } from "../Constants";
import { GrClose } from "react-icons/gr";
import { useState } from "react";
import { CurrentUserContext } from "../CurrentUserContext";
import { useContext } from "react";
import cryptos from "../../data/cryptos.json"


const DepositModal = ({ modalOpen, setModalOpen }) => {
  const {currentUser,refetch, setRefetch}=useContext(CurrentUserContext)
  const [formData, setFormData] = useState(""); //control the panel to switch login method;


  const handleChange = (key, value) => {
      setFormData({
        ...formData,
        [key]: value,
      });
  }; //collect user input data


  const currentCrypto= currentUser.wallet.find((item)=>{
     return item._id===formData.crypto
  })//find selected crypto info

let compareMaxAmountFlag=true;
  if (currentCrypto && formData.amount>currentCrypto.amount)
  {
    compareMaxAmountFlag=false
  }//check selected crypto wallet amount
  const submitEnable =
    formData.crypto && formData.amount &&formData.amount>0 &&compareMaxAmountFlag //enable submit button

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`/depositwallet/${currentUser._id}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "content-Type": "application/json",
      },
      body: JSON.stringify({...formData, id:currentUser._id, imageSrc:currentCrypto.imageSrc, type:"deposit"}),
    })
      .then((res) => res.json())
      .then((data) => {
          console.log(data);
          setModalOpen(false);
          setRefetch(!refetch);
        }
    
      )
      .catch((err) => console.log(err));
      setModalOpen(false)
  }; 
  

  return (
    <>
      <MyModal
        isOpen={modalOpen}
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
      >
        <CloseButton onClick={() => setModalOpen(false)}>
          {" "}
          <GrClose />
        </CloseButton>
       <Form>
        <div> 
        <Select
          id="crypto"
          onChange={(e) => handleChange(e.target.id, e.target.value)}
        >
          <Option disabled selected>
            Select
          </Option>
          ;
          {cryptos.map((item, index) => {
            return <Option id={index}>{item.name}</Option>;
          })}
        </Select>
        {formData.crypto && (
          <Img
            src={
              cryptos.find((crypto) => crypto.name === formData.crypto)
                .imageSrc
            }
          />
        )}
        </div>
        <Input
          type={"text"}
          id="amount"
          required
          onChange={(e) => handleChange(e.target.id, e.target.value)}
        />
       
      </Form>
      <Deposit onClick={handleSubmit} disabled={!submitEnable}>Deposit</Deposit>
      </MyModal>
    </>
  );
};


const MyModal = styled(Modal)`
  background-color: ${COLORS.black};
  width: 500px;
  height: 800px;
  position: fixed;
  left: 720px;
  top: 120px;
  border-radius: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Img = styled.img`
  width: 4%;
`;
const Input = styled.input`
  width: 300px;
  height: 35px;
  background-color: ${COLORS.white};
  margin-right: 50px;
  position: relative;
  top:20px
`;

const Option = styled.option`
color: ${COLORS.charcoal};
background-color: ${COLORS.white};
`;

const Select = styled.select`
  position: relative;
  margin-left: 15px;
  width: 150px;
  height: 35px;
  font-size: 20px;
`;

const Form = styled.form`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
position: relative;
top: 30px;
`;

const Deposit = styled.button`
  background-color: ${COLORS.blue};
  height: 50px;
  border-radius: 15px;
  font-size: 20px;
  color: ${COLORS.white};
  position: relative;
  left: 0px;
  top:50px;
  padding: 5px 30px 5px 30px;
`;


const CloseButton = styled.button`
  background-color: transparent;
  position: fixed;
  top: 160px;
  right: 680px;
`;


export default DepositModal;
