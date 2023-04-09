import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";

export const CurrentNewsContext = createContext(null); //set News context

export const CurrentNewsProvider = ({ children }) => {
  const [currentNews, setCurrentNews] = useState("");

  // useEffect(()=>{
  //     fetch("/news")
  //     .then(res=>res.json())
  //     .then(data=>setCurrentNews(data.data.articles))
  //     .catch(err=>console.log(err))
  //   },[])

  return (
    <CurrentNewsContext.Provider value={{ currentNews }}>
      {children}
    </CurrentNewsContext.Provider>
  );
};
