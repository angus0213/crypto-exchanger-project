import styled from "styled-components";
import { COLORS } from "../Constants";
import Modal from "react-modal";
import { useState } from "react";
import { GrClose } from "react-icons/gr";
import { CurrentUserContext } from "../CurrentUserContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const NFTWalletDetails = ({ nftItem }) => {
  const [modalOpen, setModalOpen]=useState(false)
  const {currentUser,refetch, setRefetch } = useContext(CurrentUserContext);
  const [inputForm, setInputForm]=useState("")

const handleChange=(key, value)=>{
    setInputForm({
        ...inputForm,
        [key]:value
    })
}

 const handleClick=()=>{
  setModalOpen(true)
 }


 
const handleConfirm=()=>{
    fetch(`/patchnftwallet/${currentUser._id}`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "content-Type": "application/json",
        },
        body: JSON.stringify({userId:currentUser._id, listingPrice:inputForm.listingPrice, Nft:nftItem}),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
            setRefetch(!refetch);
            setModalOpen(false);
            
        })
        .catch((err) => console.log(err));
};

const handleCancel=()=>{
    fetch(`/cancelnftlisting/${currentUser._id}`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "content-Type": "application/json",
        },
        body: JSON.stringify({userId:currentUser._id, Nft:nftItem}),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
            setRefetch(!refetch);            
        })
        .catch((err) => console.log(err));
}

  return (
    <Wrapper>
  <ClassnameDiv
        className={nftItem.quantity >= 1 ? "inWallet" : "listed"}
      >
        <NFTImg src={nftItem.imageSrc} />
        <InnerWrapper>
          <p>
            <span>NFT ID: </span>
            <Content>{nftItem._id}</Content>
          </p>
          <p>
            <span>Name: </span>
            <Content>{nftItem.name}</Content>
          </p>
          <p>
            <span>Purchased Price: </span>
            <Content>{nftItem.Price} </Content>
            <Content>{nftItem.PriceUnit} </Content>
            <ETHImg src={nftItem.PriceUnitImg} />
          </p>
        </InnerWrapper>
       
          <Button onClick={handleClick} disabled={nftItem.quantity <1}>List for Sell</Button>
          </ClassnameDiv>
          <Button onClick={handleCancel} disabled={nftItem.quantity >= 1} className={nftItem.quantity <1 ? "inWallet" : "outOfStock"}>
            Cancel Listing
          </Button>
        
    
     
      <MyModal isOpen={modalOpen}
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}>
                  <CloseButton onClick={() => setModalOpen(false)}>
          {" "}
          <GrClose />
        </CloseButton>
        <h1>Price you want to list </h1>
          <input id="listingPrice" onChange={(e)=>handleChange(e.target.id, e.target.value)} required/>
          <h2>{nftItem.PriceUnit}
            <UnitImg src={nftItem.PriceUnitImg} /></h2>
          <ConfirmButton onClick={handleConfirm}>Confirm</ConfirmButton>
        </MyModal>
      
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: ${COLORS.vanilla};
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 15px;
`;
const InnerWrapper = styled.div`
  margin-left: 10px;
`;

const Content = styled.span`
  color: #b180e6;
`;


const Button = styled.button`
  background-color: ${COLORS.blue};
  text-align: center;
  height: 30px;
  width: 100%;
  color: ${COLORS.white};
  margin-top: 5px;
  font-weight: 600;
  &.outOfStock {
    filter: grayscale(100%);
  }
`;

const ClassnameDiv = styled.div`
  &.listed {
    filter: grayscale(100%);
  }
`;

const NFTImg = styled.img`
  width: 200px;
`;

const ETHImg = styled.img`
  width: 10px;
`;

const CloseButton = styled.button`
  background-color: transparent;
  position: fixed;
  top: 160px;
  right: 630px;
`;

const MyModal = styled(Modal)`
  background-color: ${COLORS.darkgray};
  width: 550px;
  height: 500px;
  position: fixed;
  left: 720px;
  top: 120px;
  border-radius: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;


const ConfirmButton=styled.button`
width: 300px;
height:50px;
color: ${COLORS.white};
background-color: ${COLORS.blue};
font-weight:600px;
font-size:20px;
border-radius:15px;
margin-top:60px;
`;

const UnitImg = styled.img`
  width: 18px;
  margin-left:5px;
`;

export default NFTWalletDetails;
