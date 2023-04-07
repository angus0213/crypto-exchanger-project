import styled from "styled-components";


const News=({article})=>{
    return(
        <Wrapper>
        <NewsImg src={article.urlToImage}/>
        <div>
        <h1><span>Title: </span><span>{article.title}</span></h1>
        <p><span>Description: </span><span>{article.description}</span></p>
        <p><span>Author: </span><span>{article.author}</span></p>
        <p><span>Published At: </span><span>{article.publishedAt}</span></p>
        </div>
        </Wrapper>
    )
}

const Wrapper=styled.div`
    color: white;
    background-color: white;
    display: flex;
    width: 1480px;
    position: relative;
    left: 200px;
    top:200px;
    /* margin-top: 30px; */
    box-shadow: 2px 2px;
    border: 2px solid black;
    /* word-wrap: break-word; */
`;

const NewsImg=styled.img`
    width: 15%;
`;

export default News;