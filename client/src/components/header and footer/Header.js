import styled from "styled-components";
import { COLORS } from "../Constants";
import Searchbar from "./Searchbar";
import 'rsuite/styles/index.less'; 
import { Navbar, Nav } from 'rsuite';
import HomeIcon from '@rsuite/icons/legacy/Home';
import "rsuite/dist/rsuite.css";
import {FiDownload} from "react-icons/fi";
import {TfiWorld} from "react-icons/tfi";
import {AiFillGift} from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const Header=()=>{
  const navigate=useNavigate();
  const [SignupStatus, setSignupStatus]=useState(false)
  const location=useLocation();
  const handleSignup=()=>{
    navigate("/signup");
  }
  const path=["/termsandconditions", "/signup"]
  
  const pathFlag=path.some((item)=>{
    return item===location.pathname
  })
 
    return (
<>
<HeaderWapper>
    <NavbarLeftWapper>
    <Navbar.Brand href="/"><Logo src=".\favicon\favicon.png"/></Navbar.Brand>
    {!pathFlag&&
    <Nav>
      <Nav.Item onClick={()=>navigate("/")} icon={<HomeIcon />}>Home</Nav.Item>
      <Nav.Item>Buy Crypto</Nav.Item>
      <Nav.Menu title="Markets">
        <Nav.Item>Market Overview</Nav.Item>
        <Nav.Item>Market Data</Nav.Item>
      </Nav.Menu>
      <Nav.Menu title="Trade">
        <Nav.Item>CryptoBeats Convert</Nav.Item>
        <Nav.Item>CryptoBeats Spot</Nav.Item>
        <Nav.Item>CryptoBeats P2P</Nav.Item>
        <Nav.Item>CryptoBeats OTC</Nav.Item>
      </Nav.Menu>
      <Nav.Menu title="Finance">
        <Nav.Item>CryptoBeats Loan</Nav.Item>
        <Nav.Item>CryptoBeats Earn</Nav.Item>
      </Nav.Menu>
      <Nav.Menu title="About">
        <Nav.Item>Company</Nav.Item>
        <Nav.Item>Team</Nav.Item>
        <Nav.Menu title="Contact">
          <Nav.Item>Via email</Nav.Item>
          <Nav.Item>Via telephone</Nav.Item>
        </Nav.Menu>
      </Nav.Menu>
      <Nav.Item>News</Nav.Item>
      <Nav.Item>NFT</Nav.Item>
      <Nav.Item>Feed</Nav.Item>
    </Nav>}
    </NavbarLeftWapper>
   
    <HeaderRightWapper>
    {!pathFlag &&
      <SearchWapper>
      <Searchbar/>
    <button>LogIn</button>
    <SignupBtn onClick={handleSignup}><AiFillGift/> SignUp</SignupBtn>
    <DownloadBtn><FiDownload/></DownloadBtn>
    </SearchWapper>}
    <LanguageBtn><TfiWorld/></LanguageBtn>
    </HeaderRightWapper>
   
  </HeaderWapper>
</>
    )
}

const NavbarLeftWapper=styled.div`
position: fixed;
left:30px
`;

const SearchWapper=styled.div`
display: flex;
gap: 20px;
`;

const Logo=styled.img`
width: 80px;
position: relative;
top: -28px;
`;

const HeaderWapper=styled(Navbar)`
height: 80px;
font-size: 15px;
display: flex;
align-items: center;
`;

const HeaderRightWapper=styled.div`
display: flex;
gap:25px;
position: fixed;
right: 50px;
`;

const SignupBtn=styled.button`
  text-decoration: none!important;
  background-color:${COLORS.green};;
  color: #575858;
  font-size: 15px;
  font-weight: bold;
  padding: 8px 20px;
  border-radius: 15px;
  &:hover{
    color: #393A3A;
  }
`;

const DownloadBtn=styled.button`
font-size: 20px;
background-color: transparent;
`;

const LanguageBtn=styled.button`
font-size: 20px;
background-color: transparent;
`;


export default Header;