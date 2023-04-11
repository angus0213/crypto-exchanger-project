import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";

export const CurrentPriceContext = createContext(null); //set price context

export const CurrentPriceProvider = ({ children }) => {
  const [currentPrice, setCurrentPrice] = useState("");
  const [priceRefetch, setPriceRefetch] = useState(false);
  const [priceStatus, setPriceStatus] = useState("loading");

  useEffect(() => {
    fetch("/quoteprices")
      .then((res) => res.json())
      .then((data) => {
        setCurrentPrice(data.data);
        setPriceStatus("idle");
      })
      .catch((err) => console.log(err));
  }, [priceRefetch]);

  return (
    <CurrentPriceContext.Provider
      value={{ currentPrice, priceRefetch, setPriceRefetch, priceStatus }}
    >
      {children}
    </CurrentPriceContext.Provider>
  );
};
