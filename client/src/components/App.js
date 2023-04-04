import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "./header and footer/Header";
import GlobalStyles from "./GlobalStyles";
import Home from "./Home/Home";
import SignUp from "./SignUp/SignUp";
import TermsandConditions from "./SignUp/TermsandConditions/TermsandConditions";
import UserVerify from "./SignUp/UserVerify/UserVerify";
import Wallet from "./Wallet/Wallet";
import Exchange from "./Exchange/Exchange";


const App=()=> {
  return (
   <>
   <BrowserRouter>
   <GlobalStyles/>
   <Header/>
   <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/signup/:userId" element={<SignUp/>}/>
    <Route path="/termsandconditions" element={<TermsandConditions/>}/>
    <Route path="/userverify/:userId" element={<UserVerify/>}/>
    <Route path="/wallet/:userId" element={<Wallet/>}/>
    <Route path="/exchange/:userId" element={<Exchange/>}/>
   </Routes>
   </BrowserRouter>
   </>
  );
}


export default App;
