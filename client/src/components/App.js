import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "./header and footer/Header";
import GlobalStyles from "./GlobalStyles";
import Home from "./Home/Home";
import SignUp from "./SignUp/SignUp";
import TermsandConditions from "./SignUp/TermsandConditions";
import styled from "styled-components";
import UserVerify from "./SignUp/UserVerify/UserVerify";


const App=()=> {
  return (
   <>
   <BrowserRouter>
   <GlobalStyles/>
   <MyHeader/>
   <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/signup/:userId" element={<SignUp/>}/>
    <Route path="/termsandconditions" element={<TermsandConditions/>}/>
    <Route path="/userverify/:userId" element={<UserVerify/>}/>
   </Routes>
   </BrowserRouter>
   </>
  );
}

const MyHeader=styled(Header)`
position: fixed;
`;
export default App;
