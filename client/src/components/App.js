import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "./header and footer/Header";
import GlobalStyles from "./GlobalStyles";
import Home from "./Home/Home";
import SignUp from "./SignUp/SignUp";
import TermsandConditions from "./SignUp/TermsandConditions";
import styled from "styled-components";
const App=()=> {
  return (
   <>
   <BrowserRouter>
   <GlobalStyles/>
   <MyHeader/>
   <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/signup" element={<SignUp/>}/>
    <Route path="/termsandconditions" element={<TermsandConditions/>}/>
   </Routes>
   </BrowserRouter>
   </>
  );
}

const MyHeader=styled(Header)`
position: fixed;
`;
export default App;
