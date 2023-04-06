import styled from "styled-components";
import { COLORS } from "../Constants";
import Modal from "react-modal";
import { useEffect, useState } from "react";
import { GrClose } from "react-icons/gr";
import { CurrentUserContext } from "../CurrentUserContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const SingleNFT = ({ nftItem }) => {
  const [modalOpen, setModalOpen]=useState(false)
  const {currentUser, refetch, setRefetch } = useContext(CurrentUserContext);
  const [ethBalanceFlag, setEthBalanceFlag] =useState(false)
  const navigate=useNavigate();

 const handleClick=()=>{
  checkEthBalance();
  setModalOpen(true)
 }

 const checkEthBalance=()=>{
  if(currentUser){
 const ethInfo= currentUser.wallet.find((crypto)=>{
   return crypto.name==="ETH";
  })
  setEthBalanceFlag( ethInfo.amount>=nftItem.Price);
 }}
 
const handleConfirm=()=>{
  fetch(`/patchnft/${currentUser._id}`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "content-Type": "application/json",
    },
    body: JSON.stringify({userId:currentUser._id, Nft:{...nftItem, owner:currentUser._id}}),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
        setRefetch(!refetch);
        setModalOpen(false);
        
    })
    .catch((err) => console.log(err));
};


  return (
    <Wrapper>
      <ClassnameDiv
        className={nftItem.quantity >= 1 ? "inStock" : "outOfStock"}
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
            <span>Owner: </span>
            <Content>{nftItem.owner}</Content>
          </p>
          <p>
            <span>Price: </span>
            <Content>{nftItem.Price} </Content>
            <Content>{nftItem.PriceUnit} </Content>
            <ETHImg src={nftItem.PriceUnitImg} />
          </p>
        </InnerWrapper>
        {nftItem.quantity >= 1 ? (
          <BuyButton onClick={handleClick}>BUY NOW</BuyButton>
        ) : (
          <BuyButton className={"outOfStock"} disabled>
            OUT OF STOCK
          </BuyButton>
        )}
      </ClassnameDiv>
      {ethBalanceFlag?
      <MyModal isOpen={modalOpen}
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}>
                  <CloseButton onClick={() => setModalOpen(false)}>
          {" "}
          <GrClose />
        </CloseButton>
        <h1><span>Thanks for shopping with Crypto</span><Highlight>Beats</Highlight></h1>
          <h1>You will get <Highlight>{nftItem.name}</Highlight> NFT</h1>
          <h2>The cost is <span>{nftItem.Price} </span>
            <span>{nftItem.PriceUnit} </span>
            <UnitImg src={nftItem.PriceUnitImg} /></h2>
          <ConfirmButton onClick={handleConfirm}>Confirm</ConfirmButton>
        </MyModal>
      :  
      <MyModal isOpen={modalOpen}
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}>
                  <CloseButton onClick={() => setModalOpen(false)}>
          {" "}
          <GrClose />
        </CloseButton>
        <h1><span>Your ETH </span><Highlight>Balance </Highlight><span>is Not Enough!</span></h1>
          <h1>Please check your wallet</h1>
          <ConfirmButton onClick={() => setModalOpen(false)}>Confirm</ConfirmButton>
        </MyModal>
      }
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

const ClassnameDiv = styled.div`
  &.outOfStock {
    filter: grayscale(100%);
  }
`;

const BuyButton = styled.button`
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

const Highlight = styled.span`
  color: ${COLORS.blue};

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

export default SingleNFT;
