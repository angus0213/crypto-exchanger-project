import { useState } from "react";
import styled from "styled-components";
import { COLORS } from "../../Constants";
import Terms from "./Terms";
import Policy from "./Policy";
import Disclosure from "./Disclosure";

const TermsandConditions=()=>{
   const [terms, setTerms]= useState(true)
   const [policy, setPolicy]= useState(false)
   const [disclosure, setDisclosure]= useState(false)
    /*switch from terms page, policy page and disclosure page */

    const handleClickTerms=()=>{
        setTerms(true)
        setPolicy(false)
        setDisclosure(false)
    }

    const handleClickPolicy=()=>{
        setTerms(false)
        setPolicy(true)
        setDisclosure(false)
        
    }

    const handleClickDisclosure=()=>{
        setTerms(false)
        setPolicy(false)
        setDisclosure(true)
    }

    return (
       <Wapper>
       <TitleWapper>
       <Img src="../webImages/legal.jpg"/>
       <BtnWapper>
        <Selection onClick={handleClickTerms} className={terms && "active"}>Terms and Conditions</Selection>
        <Selection onClick={handleClickPolicy} className={policy && "active"}>Privacy Policy</Selection>
        <Selection onClick={handleClickDisclosure} className={disclosure && "active"}>Risk Disclosure Statement</Selection>
       </BtnWapper>
       <Hr/>
       </TitleWapper>
      
       {terms && <Terms/>}
       {policy && <Policy/>}
       {disclosure && <Disclosure/>}
      
       </Wapper>
    )
}

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
z-index: 1;
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

export default TermsandConditions;