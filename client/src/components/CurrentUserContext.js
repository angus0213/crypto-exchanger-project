import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";

export const CurrentUserContext = createContext(null);

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setcurrentUser] = useState("");
  const currentUserId = sessionStorage.getItem("userId");
  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    if (currentUserId) {
      fetch(`/user/${currentUserId}`)
        .then((res) => res.json())
        .then((data) => setcurrentUser(data.data))
        .catch((err) => console.log(err));
    }
  }, [refetch]);
  /*fetch current user from backend */
  if(currentUser){
    console.log(currentUser);}
  return (
    <CurrentUserContext.Provider
      value={{ currentUser, setcurrentUser, refetch, setRefetch }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};
