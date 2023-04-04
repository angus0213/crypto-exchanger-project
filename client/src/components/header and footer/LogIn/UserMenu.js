import { HiOutlineUserCircle } from "react-icons/hi";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { COLORS } from "../../Constants";
import { TfiWallet } from "react-icons/tfi";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { GrDocumentUser } from "react-icons/gr";
import { FiSettings } from "react-icons/fi";
import { CurrentUserContext } from "../../CurrentUserContext";
import { useContext } from "react";

const UserMenu = () => {
    const { currentUser, setcurrentUser } = useContext(CurrentUserContext);
  return (
    <>
      <Wrapper>
        <ProfileBtn>
          <MyHiOutlineUserCircle />
        </ProfileBtn>
        <Display>
          <LinkWrapper>
            <MyLink><GrDocumentUser/> Profile</MyLink>
            <MyLink to={`/wallet/${currentUser._id}`}><TfiWallet/> Wallet</MyLink>
            <MyLink><AiOutlineDollarCircle/> Asset</MyLink>
            <MyLink><FiSettings/> Settings</MyLink>
          </LinkWrapper>
        </Display>
      </Wrapper>
    </>
  );
};
const LinkWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  background-color: ${COLORS.white};

`;

const MyHiOutlineUserCircle = styled(HiOutlineUserCircle)`
  font-size: 25px;
`;

const MyLink = styled(Link)`
padding: 10px 60px 10px 10px;
text-align: left;

color: ${COLORS.black};
/* background-color: gray; */
  &:hover{
    color:  ${COLORS.white};
    text-decoration: none;
    background-color: ${COLORS.darkgray};
  }
`;

const Display = styled.div`
  display: none;
`;

const Wrapper = styled.div`
  &:hover ${Display} {
    display: block;
  }
`;

const ProfileBtn = styled.button`
  background-color: transparent;
`;

export default UserMenu;
