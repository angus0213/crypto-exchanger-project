import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";

export const CurrentNewsContext = createContext(null); //set News context

export const CurrentNewsProvider = ({ children }) => {
  const [currentNews, setCurrentNews] = useState("");
  const [newsStatus, setNewsStatus] = useState("loading");

  useEffect(() => {
    fetch("/news")
      .then((res) => res.json())
      .then((data) => {
        setCurrentNews(data.data.articles);
        setNewsStatus("idle");
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <CurrentNewsContext.Provider value={{ currentNews, newsStatus }}>
      {children}
    </CurrentNewsContext.Provider>
  );
};
