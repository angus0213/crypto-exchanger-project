import styled from "styled-components";
import { CurrentUserContext } from "../CurrentUserContext";
import { useContext } from "react";
import { COLORS } from "../Constants";
import { AiTwotoneSound } from 'react-icons/ai'




const UserPanel=({currentPrice})=>{
    const { currentUser} = useContext(CurrentUserContext);
    let sumValueWithoutUSDT=0;
    let sumValue=0;
    if (currentUser){
    currentUser.wallet.forEach((crypto)=>{
        currentPrice.forEach((tradingPair)=>{
            if (crypto._id===tradingPair.asset_id_base_exchange && tradingPair.asset_id_quote_exchange==="USDT") {
                sumValueWithoutUSDT=sumValueWithoutUSDT+crypto.amount*tradingPair.price
            }
        })
        if(crypto._id==="USDT"){
    sumValue=  sumValueWithoutUSDT+crypto.amount}
    })

    }
return(
    currentUser&&
    <Panel>
   
   <MyAiTwotoneSound/> <Announce>Dear <Highlight>{currentUser._id.slice(0,5).concat("***")}</Highlight> customer: You have <Highlight>{sumValue.toFixed(4)} USDT</Highlight> equivalent  Asset at {new Date().toLocaleString()}</Announce>
    </Panel>
)
}

const Panel= styled.div`
position: relative;
top:80px;
left:200px;
height: 40px;
background-color: ${COLORS.white};
width: 1490px;
display: flex;
align-items: center;
`
const Announce= styled.p`
position: relative;
left:50px;
font-size: 15px;
`;

const MyAiTwotoneSound= styled(AiTwotoneSound)`
position: relative;
left:30px;
font-size: 20px;
color: ${COLORS.black}
`;

const Highlight = styled.span`
  color: ${COLORS.blue};
`;

export default UserPanel;