import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";

export const CurrentPriceContext=createContext(null);

export const CurrentPriceProvider=({children})=>{
    const [currentPrice, setCurrentPrice]=useState("");
    const [priceRefetch, setPriceRefetch]=useState(false);

    useEffect(()=>{
        fetch("/quoteprices")
        .then(res=>res.json())
        .then(data=>setCurrentPrice(data.data))
        .catch(err=>console.log(err))
    },[priceRefetch])

    return(
        <CurrentPriceContext.Provider
        value={{currentPrice,priceRefetch, setPriceRefetch}}
        >
            {children}
        </CurrentPriceContext.Provider>
    )
}

