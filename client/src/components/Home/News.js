import styled from "styled-components";
import { Link } from "react-router-dom";
import { COLORS } from "../Constants";

const News = ({ article }) => {
  return (
    <>
      <Wrapper>
        <NewsImg src={article.urlToImage} />
        <ContentWrapper>
          <MyLink to={article.url}>
            <span>Title: </span>
            <span>{article.title}</span>
          </MyLink>
          <Content>
            <span>Description: </span>
            <span>{article.description}</span>
          </Content>
          <Content>
            <span>Author: </span>
            <span>{article.author}</span>
          </Content>
          <Content>
            <span>Published At: </span>
            <span>
              {article.publishedAt.slice(0, 10)}{" "}
              {article.publishedAt.slice(11, 19)}
            </span>
          </Content>
        </ContentWrapper>
      </Wrapper>
      <Line />
    </>
  );
};

const MyLink = styled(Link)`
font-size:20px;
font-weight: bold;
`;

const Wrapper = styled.div`
  display: flex;
  width: 1450px;
  background-color: ${COLORS.grey};
  margin-top: 30px;
`;

const Content = styled.p`
  width: 1200px;
`;

const ContentWrapper = styled.div`
  position: relative;
  left: 20px;
  top:10px;
`;

const NewsImg = styled.img`
  width: 15%;
  border-radius: 15px;
`;

const Line = styled.hr`
  border: none;
  height: 2px;
  width: 1450px;
  margin-top: 30px;
  margin-bottom: 10px;
  background-color: ${COLORS.darkgray};
`;

export default News;
