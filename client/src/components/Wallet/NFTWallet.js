
import NFTWalletDetails from "./NFTWalletDetails";
import styled from "styled-components";
import {COLORS} from "../Constants";
import { CurrentUserContext } from "../CurrentUserContext";
import { useContext } from "react";

const NFTWallet = () => {
    const {currentUser} = useContext(CurrentUserContext);
    
  return (
   
    currentUser && (
      <Wrapper>
          <Title>NFT Collections</Title>
          {currentUser.NFT.length===0 && 
          <ReminderWrapper>
          <Reminder>You do not have any NFT colletction</Reminder>
          <Reminder>Please get your first NFT from the NFT market place</Reminder>
          </ReminderWrapper>
          }
        <InnerWrapper>
        {currentUser.NFT.map((nftItem) => {
          return <NFTWalletDetails nftItem={nftItem} />;
        })}
        </InnerWrapper>
      </Wrapper>
    )
  );
};

const Wrapper= styled.div`
background-color:${COLORS.grey};
position:relative;
top:30px;
width: 1400px;
height: 600px;
margin-bottom:50px;
`;

const InnerWrapper= styled.div`
display:flex;
flex-flow: row wrap;
flex: 0 1 calc(20% - 8px);
width: 1300px;
gap:50px;
justify-content:center;
padding-bottom:50px;
padding-top:50px;
margin-left:50px;
`;

const Title = styled.h1`
  color: ${COLORS.black};
  position: relative;
  left: 20px;
  width: 200px;
`;

const Reminder = styled.h2`
  color: ${COLORS.blue};
`;

const ReminderWrapper = styled.div`
display:flex;
flex-direction:column;
align-items:center;
position: relative;
top:100px;
`;

export default NFTWallet;
