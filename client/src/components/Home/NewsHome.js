import News from "./News";
import { useContext, useState } from "react";
import { CurrentNewsContext } from "../CurrentNewsContext";
import styled from "styled-components";
import { COLORS } from "../Constants";

const NewsHome = () => {
  const { currentNews } = useContext(CurrentNewsContext);

  const [pageStart, setPageStart] =useState(0);
  const [pageEnd, setPageEnd] =useState(5);

  const handlePaginationPlus=()=>{
    setPageStart(pageEnd)
    setPageEnd(pageEnd+5)
  } 

  const handlePaginationMinus=()=>{
    setPageEnd(pageStart)
    setPageStart(pageStart-5)
  } 
console.log(pageStart);
console.log(pageEnd);
  return (
currentNews && (
<Wrapper>
<Title>Crypto News</Title>
 {currentNews.map((article, index) => {
          if (pageStart<=index && index<pageEnd){
          return <News key={index} article={article} />;}
        })} 
        <ButtonWrapper>
       <Button onClick={handlePaginationMinus} disabled={pageEnd<=5}>Previous</Button>
       <Button onClick={handlePaginationPlus} disabled={pageEnd>currentNews.length-1}>Next</Button>
       </ButtonWrapper>
</Wrapper>
)

  )

};

const Wrapper = styled.div`
  background-color: ${COLORS.grey};
  width: 1480px;
  position: relative;
  left: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  margin-bottom: 250px;
`;

const Title = styled.h1`
position: relative;
left: -620px;
color:${COLORS.blue};
font-size:30px;
margin-bottom: -20px;
`;

const Button = styled.button`
  border-radius: 15px;
  width: 150px;
  height: 40px;
  color: ${COLORS.grey};
  padding: 3px;
  font-size:20px;
  background-color: ${COLORS.blue};
`;

const ButtonWrapper = styled.button`
display: flex;
gap: 200px;
margin-top: 30px;
margin-bottom: 30px;
background-color: ${COLORS.grey};
`;

export default NewsHome;