import { useEffect, useState } from "react";
import SingleNFT from "./SingleNFT";
import styled from "styled-components";
import {COLORS} from "../Constants"
import Sidebar from "./Sidebar";

const NFTHome = () => {
  const [nftStock, setNftStock] = useState("");

  useEffect(() => {
    fetch("/nftcollections")
      .then((res) => res.json())
      .then((data) => setNftStock(data.data))
      .catch((err) => console.log(err));
  }, []);
  return (
   
    nftStock && (
      <>
      <Sidebar/>
      <Wrapper>
        <InnerWrapper>
        {nftStock.map((nftItem) => {
          return <SingleNFT nftItem={nftItem} />;
        })}
        </InnerWrapper>
      </Wrapper>
      </>
    )
  );
};

const Wrapper= styled.div`
background-color:${COLORS.grey};
position:relative;
top:100px;
left:380px;
width: 1400px;
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

export default NFTHome;
