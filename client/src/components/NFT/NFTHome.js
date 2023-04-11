import { useEffect, useState } from "react";
import SingleNFT from "./SingleNFT";
import styled from "styled-components";
import { COLORS } from "../Constants";
import { CircularProgress } from "@mui/material";

const NFTHome = () => {
  const [nftStock, setNftStock] = useState("");
  const [reFetchNft, setReFetchNft] = useState(false);
  const [nftStatus, setNftStatus] = useState("loading");

  useEffect(() => {
    fetch("/nftcollections")
      .then((res) => res.json())
      .then((data) => {
        setNftStock(data.data);
        setNftStatus("idle");
      })
      .catch((err) => console.log(err));
  }, [reFetchNft]); //fetch the NFT stock from database and render

  return nftStatus === "loading" ? (
    <MyCircularProgress size="60px" />
  ) : (
    <>
      {nftStock && (
        <div>
          <Wrapper>
            <InnerWrapper>
              {nftStock.map((nftItem, index) => {
                return (
                  <SingleNFT key={index}
                    nftItem={nftItem}
                    reFetchNft={reFetchNft}
                    setReFetchNft={setReFetchNft}
                  />
                );
              })}
            </InnerWrapper>
          </Wrapper>
        </div>
      )}
    </>
  );
};

const Wrapper = styled.div`
  background-color: ${COLORS.grey};
  position: relative;
  top: 100px;
  left: 250px;
  width: 1400px;
`;

const MyCircularProgress = styled(CircularProgress)`
  position: fixed;
  left: 900px;
  top: 400px;
  width: 300px;
  z-index: 99;
`;

const InnerWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  flex: 0 1 calc(20% - 8px);
  width: 1300px;
  gap: 50px;
  justify-content: center;
  padding-bottom: 50px;
  padding-top: 50px;
  margin-left: 50px;
`;

export default NFTHome;
