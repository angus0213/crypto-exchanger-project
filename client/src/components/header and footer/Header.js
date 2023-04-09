import styled from "styled-components";
import { COLORS } from "../Constants";
import Searchbar from "./Searchbar";
import "rsuite/styles/index.less";
import { Navbar, Nav } from "rsuite";
import HomeIcon from "@rsuite/icons/legacy/Home";
import "rsuite/dist/rsuite.css";
import { FiDownload } from "react-icons/fi";
import { TfiWorld } from "react-icons/tfi";
import { AiFillGift } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useContext } from "react";
import { CurrentUserContext } from "../CurrentUserContext";
import LogInModal from "./LogIn/LogIn";
import { useState } from "react";
import UserMenu from "./LogIn/UserMenu";
import LanguagePanel from "./LanguagePanel";
import { TfiWallet } from "react-icons/tfi";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [modalOpen, setModalOpen] = useState(false);

  const handleSignup = () => {
    navigate(`/signup/${uuidv4()}`);
  }; /*navigate to signup page when user click signup button, generate userId at this stage and set in database finally (will use fist 8 character as referral code) */

  const { currentUser, setcurrentUser } = useContext(CurrentUserContext);

  const path = ["/termsandconditions", "/signup", "/userverify"];

  const pathFlag = path.some((item) => {
    return location.pathname.indexOf(item) > -1;
  });
  /*if path contains the string in the path array, the header won't show the navigation bar */

  const handleLogOut = () => {
    setcurrentUser("");
    sessionStorage.clear();
  };
  /* used for logout button */

  return (
    <>
      <HeaderWrapper>
        <NavbarLeftWrapper>
          <Navbar.Brand>
            <Link to={"/"}>
              <Logo src="/favicon/favicon.png" />
            </Link>
          </Navbar.Brand>
          {!pathFlag && (
            <Nav>
              <Nav.Item onClick={() => navigate("/")} icon={<HomeIcon />}>
                Home
              </Nav.Item>
              <Nav.Item href="/exchange">Buy Crypto</Nav.Item>
              <Nav.Item href="/trade" title="Markets">
                Markets
              </Nav.Item>
              <Nav.Menu title="Finance">
                <Nav.Item>CryptoBeats Loan (N/A)</Nav.Item>
                <Nav.Item>CryptoBeats Earn (N/A)</Nav.Item>
              </Nav.Menu>
              <Nav.Menu title="About">
                <Nav.Item>Company (N/A)</Nav.Item>
                <Nav.Item>Team (N/A)</Nav.Item>
                <Nav.Menu title="Contact">
                  <Nav.Item>Via email (N/A)</Nav.Item>
                  <Nav.Item>Via telephone (N/A)</Nav.Item>
                </Nav.Menu>
              </Nav.Menu>
              <Nav.Item href="/news">News</Nav.Item>
              <Nav.Item href="/nft">NFT</Nav.Item>
            </Nav>
          )}
        </NavbarLeftWrapper>

        <HeaderRightWrapper>
          {!pathFlag && (
            <SearchWrapper>
              <Searchbar />
              {currentUser ? (
                <>
                  <LogBtn onClick={handleLogOut}>LogOut</LogBtn>
                  <MyLink to={`/wallet/${currentUser._id}`}>
                    <TfiWallet /> Wallet
                  </MyLink>
                  <UserMenu />
                </>
              ) : (
                <>
                  <LogBtn onClick={() => setModalOpen(true)}>LogIn</LogBtn>
                  <SignupBtn onClick={handleSignup}>
                    <AiFillGift /> SignUp
                  </SignupBtn>
                </>
              )}
              <DownloadBtn>
                <FiDownload />
                <BarCode src="../webImages/barcode.jpg" />
              </DownloadBtn>
            </SearchWrapper>
          )}
          <LanguageBtn>
            <TfiWorld />
            <Display>
              <LanguagePanel />
            </Display>
          </LanguageBtn>
        </HeaderRightWrapper>
      </HeaderWrapper>
      <LogInModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </>
  );
};

const NavbarLeftWrapper = styled.div`
  position: fixed;
  left: 30px;
`;

const BarCode = styled.img`
  display: none;
  width: 7%;
  position: fixed;
  top: 60px;
  right: 120px;
`;

const SearchWrapper = styled.div`
  display: flex;
  gap: 20px;
`;

const Logo = styled.img`
  width: 80px;
  position: relative;
  top: -28px;
`;

const HeaderWrapper = styled(Navbar)`
  height: 80px;
  font-size: 15px;
  display: flex;
  align-items: center;
  position: fixed;
  width: 100%;
  z-index: 99;
`;

const HeaderRightWrapper = styled.div`
  display: flex;
  gap: 25px;
  position: fixed;
  right: 100px;
`;

const SignupBtn = styled.button`
  text-decoration: none !important;
  background-color: ${COLORS.green};
  color: #575858;
  font-size: 15px;
  font-weight: bold;
  padding: 8px 20px;
  border-radius: 15px;
  &:hover {
    color: #393a3a;
  }
`;

const LogBtn = styled.button`
  background-color: transparent;
  font-size: 17px;
`;

const DownloadBtn = styled.button`
  font-size: 20px;
  background-color: transparent;
  &:hover ${BarCode} {
    display: block;
  }
`;

const Display = styled.div`
  display: none;
  position: fixed;
  background-color: ${COLORS.grey};
  top: 60px;
  left: 1330px;
`;

const LanguageBtn = styled.button`
  font-size: 20px;
  background-color: transparent;
  &:hover ${Display} {
    display: block;
  }
`;

const MyLink = styled(Link)`
  text-decoration: none !important;
  background-color: ${COLORS.green};
  color: #575858;
  font-size: 15px;
  font-weight: bold;
  padding: 8px 20px;
  border-radius: 15px;
  &:hover {
    color: #393a3a;
  }
`;

export default Header;
