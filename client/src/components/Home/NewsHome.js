import News from "./News";
import { useContext, useState } from "react";
import { CurrentNewsContext } from "../CurrentNewsContext";
import styled from "styled-components";
import { COLORS } from "../Constants";

const NewsHome = () => {
  const { currentNews } = useContext(CurrentNewsContext);
  const [pageStart, setPageStart] = useState(0); //set news pagination start
  const [pageEnd, setPageEnd] = useState(5); //set news pagination end

  const handlePaginationPlus = () => {
    setPageStart(pageEnd);
    setPageEnd(pageEnd + 5);
  }; //click, the start and end will plus 5 (next page)

  const handlePaginationMinus = () => {
    setPageEnd(pageStart);
    setPageStart(pageStart - 5);
  }; //click, the start and end will minus 5 (last page)

  return (
    currentNews && (
      <Wrapper>
        <Title>Crypto News</Title>
        {currentNews.map((article, index) => {
          if (pageStart <= index && index < pageEnd) {
            return <News key={index} article={article} />;
          } /*conditional rendering*/
        })}
        <ButtonWrapper>
          <Button onClick={handlePaginationMinus} disabled={pageEnd <= 5}>
            Previous
          </Button>
          <Button
            onClick={handlePaginationPlus}
            disabled={pageEnd > currentNews.length - 1} //disable the next button
          >
            Next
          </Button>
        </ButtonWrapper>
      </Wrapper>
    )
  );
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
  color: ${COLORS.blue};
  font-size: 30px;
  margin-bottom: -20px;
`;

const Button = styled.button`
  border-radius: 15px;
  width: 150px;
  height: 40px;
  color: ${COLORS.grey};
  padding: 3px;
  font-size: 20px;
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
