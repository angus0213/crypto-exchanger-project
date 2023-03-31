import styled from "styled-components";
import Modal from "react-modal";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { COLORS } from "../../Constants";
import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { CurrentUserContext } from "../../CurrentUserContext";
import { useContext } from "react";

const VerifyModal = ({ modalopen, handleModalClose }) => {
const navigate = useNavigate();
const {refetch, setRefetch}=useContext(CurrentUserContext)
  useEffect(() => {
    setTimeout(() => {
      handleModalClose();
      navigate("/");
      setRefetch(!refetch)
    }, 15000);
  }, []);/*set modal exist 15 seconds, refetch will let header change from signup to logout status (the user is login now) */

  const handleClick = () => {
    handleModalClose();
    navigate("/");
    setRefetch(!refetch);
  };/*close modal manually */

  return (
    <MyModal isOpen={modalopen} shouldCloseOnOverlayClick={false}>
      <Congratulations src="/webImages/congratulations.png" />
      <h1>Your ID is Verified!</h1>
      <h1>Please check your wallet!</h1>
      <p>Redirecting to Home Page</p>
      <p>Please click button below if longer than 10 seconds</p>
      <MyCircularProgress color="secondary" />
      <RedirectBtn onClick={handleClick}>Click Here</RedirectBtn>
    </MyModal>
  );
};

const MyModal = styled(Modal)`
  background-color: ${COLORS.darkgray};
  width: 700px;
  height: 400px;
  position: fixed;
  left: 580px;
  top: 220px;
  border-radius: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MyCircularProgress = styled(CircularProgress)`
  margin-top: 20px;
`;

const RedirectBtn = styled.button`
  background-color: ${COLORS.vanilla};
  color: #575858;
  font-size: 15px;
  font-weight: bold;
  padding: 8px 20px;
  border-radius: 15px;
  margin-top: 20px;
  &:hover {
    color: #393a3a;
  }
`;
const Congratulations = styled.img`
  width: 60px;
`;
export default VerifyModal;
