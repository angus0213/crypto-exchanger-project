import SpotWallet from "./SpotWallet"
import NFTWallet from "./NFTWallet";
import TermDepositWallet from "./TermDepositWallet";
import { useState } from "react";
import styled from "styled-components";
import { COLORS } from "../Constants";
import { CurrentUserContext } from "../CurrentUserContext";
import { useContext } from "react";
import { CurrentPriceContext } from "../CurrentPricesContext";





const Wallet=()=>{
    const { currentUser } = useContext(CurrentUserContext);
    const [walletSpot, setWalletSpot]= useState(true)
   const [walletNFT, setwalletNFT]= useState(false)
   const [walletTermDeposit, setwalletTermDeposit]= useState(false)
   const { currentPrice} = useContext(CurrentPriceContext);
   

    /*switch from spot page, NFT page and termDeposit page */

    const handleClickSpot=()=>{
        setWalletSpot(true)
        setwalletNFT(false)
        setwalletTermDeposit(false)
    }

    const handleClickNFT=()=>{
        setWalletSpot(false)
        setwalletNFT(true)
        setwalletTermDeposit(false)
        
    }

    const handleClickTermDeposit=()=>{
        setWalletSpot(false)
        setwalletNFT(false)
        setwalletTermDeposit(true)
    }

    return (       
        currentUser&& currentPrice&&
    <Wapper>
        <TitleWapper>
        <Img src="../webImages/web3.jpg"/>
        <BtnWapper>
         <Selection onClick={handleClickSpot} className={walletSpot && "active"}>SPOT Wallet</Selection>
         <Selection onClick={handleClickNFT} className={walletNFT && "active"}>NFT</Selection>
         <Selection onClick={handleClickTermDeposit} className={walletTermDeposit && "active"}>Deposit to Earn</Selection>
        </BtnWapper>
        <Hr/>
        </TitleWapper>
     
        {walletSpot && <SpotWallet/>}
        {walletNFT && <NFTWallet/>}
        {walletTermDeposit && <TermDepositWallet/>}
   
        </Wapper>)
}

const ContentWrapper=styled.div`


`;

const Wapper=styled.div`
display: flex;
flex-direction: column;
align-items: center;
`;

const Img=styled.img`
width: 100.8%;
`;

const BtnWapper=styled.div`
display: flex;
justify-content: center;
width: 100%;
font-size: 20px;
gap: 150px;
color: ${COLORS.white};
margin-top: 20px;
`;

const Selection=styled.button`
background-color: transparent;
z-index: 0;
padding-bottom: 15px;
&.active{
    border-bottom: 2px solid;
    color: ${COLORS.blue};
}
`;

const TitleWapper=styled.div`
display: flex;
flex-direction: column;
align-items: center;
`;

const Hr=styled.hr`
width: 80%;
margin-top: -1px;
`;

export default Wallet;