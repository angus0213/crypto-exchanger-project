import News from "./News"
import { useEffect } from "react"
import { useState } from "react";

const NewsHome=()=>{
    const [news, SetNews]=useState("");
    useEffect(()=>{
        fetch("/news")
        .then(res=>res.json())
        .then(data=>SetNews(data.data.articles))
        .catch(err=>console.log(err))
      },[])
    return (
        news &&
        <>
            {news.map((article)=>{
        return <News article={article}/>
      })}
        </>
    )
}

export default NewsHome;