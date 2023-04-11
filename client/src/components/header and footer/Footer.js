import { COLORS } from "../Constants";
import styled from "styled-components";
import {
  SiFacebook,
  SiInstagram,
  SiTwitter,
  SiPinterest,
  SiTiktok,
  SiSnapchat,
} from "react-icons/si";
import { NavLink } from "react-router-dom";
import { handleScrollToTop } from "../../helper/handleScrollToTop";

const Footer = () => {
  return (
    <>
      <Wrapper>
        {/* Fake Address */}
        <AddressDiv>
          <h2>CryptoBeats</h2>
          <p>355 Montée Sanche</p>
          <p>Boisbriand, QC</p>
          <p>J7G 2E7</p>
          <p>Canada</p>
        </AddressDiv>
        {/* Fake Social Media Channels */}
        <SocialDiv>
          <SocialRow>
            <SiFacebook />
            <SiInstagram />
            <SiTwitter />
            <SiPinterest />
            <SiTiktok />
            <SiSnapchat />
          </SocialRow>
          <p>© 2023 CryptoBeats, Inc. All Rights Reserved</p>
        </SocialDiv>

        {/* Links */}
        <MenuDiv>
          <h2>Navigate</h2>
          <CatLink to="/exchange" onClick={handleScrollToTop}>
            <PLink>Trade</PLink>
          </CatLink>
          <CatLink to="/nft" onClick={handleScrollToTop}>
            <PLink>NFT Market</PLink>
          </CatLink>
          <CatLink to="/news" onClick={handleScrollToTop}>
            <PLink>News</PLink>
          </CatLink>
          <CatLink to="/exchange" onClick={handleScrollToTop}>
            <PLink>Exchange</PLink>
          </CatLink>
        </MenuDiv>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  background-color: darkgray;
  position: relative;
  bottom: 0px;
  border-bottom: 100% ${COLORS.green} solid;
  margin-top: 150px;
  background-color: ${COLORS.grey};
  padding-bottom: 20px;
  width: 100%;
`;

const AddressDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const SocialDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SocialRow = styled.div`
  display: flex;
  justify-content: space-between;

  gap: 50px;
  margin-top: 50px;
  margin-bottom: 50px;
  font-size: 2em;
  & > *:hover {
    color: ${COLORS.blue};
  }
`;

const MenuDiv = styled.div`
  display: flex;
  flex-direction: column;
  text-align: right;
`;

const CatLink = styled(NavLink)`
  text-decoration: none;
  margin-bottom: 5px;
`;

const PLink = styled.p`
  &:hover {
    color: ${COLORS.blue};
  }
`;

export default Footer;
