import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";

export const CurrentUserContext = createContext(null); //set user context

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setcurrentUser] = useState("");
  const currentUserId = sessionStorage.getItem("userId");
  const [refetch, setRefetch] = useState(false);
  const [userStatus, setUserStatus] = useState("loading");

  useEffect(() => {
    if (currentUserId) {
      fetch(`/user/${currentUserId}`)
        .then((res) => res.json())
        .then((data) => {
          setcurrentUser(data.data);
          setUserStatus("idle");
        })
        .catch((err) => console.log(err));
    }
  }, [refetch]);
  /*fetch current user from backend */

  return (
    <CurrentUserContext.Provider
      value={{ currentUser, setcurrentUser, refetch, setRefetch, userStatus }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};
