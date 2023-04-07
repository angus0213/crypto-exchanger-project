import News from "./News";
import { useContext } from "react";
import { CurrentNewsContext } from "../CurrentNewsContext";
import styled from "styled-components";
import { COLORS } from "../Constants";

const NewsHome = () => {
  const { currentNews } = useContext(CurrentNewsContext);
  return (
    currentNews && (
      <Wrapper>
        <Title>Crypto News</Title>
        {currentNews.map((article, index) => {
          return <News key={index} article={article} index={index} />;
        })}
      </Wrapper>
    )
  );
};

const Wrapper = styled.div`
  background-color: ${COLORS.grey};
  width: 1480px;
  position: relative;
  left: 200px;
  top: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
`;

const Title = styled.h1`
position: relative;
left: -620px;
color:${COLORS.blue};
font-size:30px;
margin-bottom: -20px;
`;

export default NewsHome;
