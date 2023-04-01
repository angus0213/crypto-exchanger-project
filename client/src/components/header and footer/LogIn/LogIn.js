import Modal from "react-modal";
import styled from "styled-components";
import { COLORS } from "../../Constants";
import { GrClose } from "react-icons/gr";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../../CurrentUserContext";
import { useContext } from "react";
import EmailLogIn from "./EmailLogIn";
import PhoneLogIn from "./PhoneLogIn";

const LogInModal = ({ modalOpen, setModalOpen }) => {
  const [emailStatus, setEmailStatus] = useState(true); //control the panel to switch login method;
  const [mobileStatus, setMobileStatus] = useState(false); //control the panel to switch login method;
  const [emailFormData, setemailFormData] = useState(""); // collect data from email form
  const [mobileFormData, setMobileFormData] = useState(""); // collect data from phone form
  const [checkEmail, setCheckEmail] = useState(true); // check email input is filled or not
  const [checkPassword, setCheckPassword] = useState(true); //same as above
  const [checkmobileNumber, setCheckmobileNumber] = useState(true); //same as above
  const [checkUser, setCheckUser] = useState(false); //check the whether user and password exist and match
  const { refetch, setRefetch } = useContext(CurrentUserContext); //rerender

  const navigate = useNavigate();

  const handleEmail = () => {
    setEmailStatus(true);
    setMobileStatus(false);
  }; //switch between email login and phone login

  const handleMobile = () => {
    setEmailStatus(false);
    setMobileStatus(true);
  }; //switch between email login and phone login

  const handleCheckPassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/;
    const passwordFormatFlag = regex.test(password);
    if (password && passwordFormatFlag) {
      setCheckPassword(true);
    } else {
      setCheckPassword(false);
    }
  }; //check password meets requirement

  const handleChange = (key, value) => {
    if (emailStatus) {
      setemailFormData({
        ...emailFormData,
        [key]: value,
      });
    }
    if (mobileStatus) {
      setMobileFormData({
        ...mobileFormData,
        [key]: value,
      });
    }
  }; //collect user input data

  const submitEnable =
    (checkEmail && checkPassword) || (checkmobileNumber && checkPassword); //submit button will be disabled unless these requirement fits

  const logInData = {
    email: emailFormData.email,
    countryCode: mobileFormData.countryCode,
    mobileNumber: mobileFormData.mobileNumber,
    password: emailFormData.password
      ? emailFormData.password
      : mobileFormData.password,
  }; //prepare user's data and send to backend

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/userlogin", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "content-Type": "application/json",
      },
      body: JSON.stringify(logInData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status == 200) {
          sessionStorage.setItem("userId", data.data._id);
          setRefetch(!refetch);
          setModalOpen(false);
          navigate("/");
        }
        if (data.status == 403) {
          setCheckUser(true);
        }
      })
      .catch((err) => console.log(err));
  }; //post user's data to the backend. If get 200 code, store userId to the session. If get 403, remind user that user does not exist or password does not match

  return (
    <>
      <MyModal
        isOpen={modalOpen}
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
      >
        <CloseButton onClick={() => setModalOpen(false)}>
          {" "}
          <GrClose />
        </CloseButton>

        <h1>
          Welcome to Crypto<Highlight>Beats</Highlight>
        </h1>
        <hr />
        <ButtonWapper>
          <SelectButton
            onClick={() => {
              handleEmail();
              setMobileFormData("");
            }} /*switch to email login */
            className={emailStatus && "active"}
          >
            Email
          </SelectButton>
          <SelectButton
            onClick={() => {
              handleMobile();
              setemailFormData("");
            }} /*switch to phone login */
            className={mobileStatus && "active"}
          >
            Mobile Number
          </SelectButton>
        </ButtonWapper>
        <Form onSubmit={handleSubmit}>
          {emailStatus && (
            <EmailLogIn
              handleChange={handleChange}
              setCheckEmail={setCheckEmail}
              checkEmail={checkEmail}
              emailFormData={emailFormData}
              handleCheckPassword={handleCheckPassword}
              checkPassword={checkPassword}
              setCheckPassword={setCheckPassword}
              setCheckUser={setCheckUser}
            /> /*link to email component */
          )}
          {mobileStatus && (
            <PhoneLogIn
              handleChange={handleChange}
              checkmobileNumber={checkmobileNumber}
              setCheckmobileNumber={setCheckmobileNumber}
              mobileFormData={mobileFormData}
              handleCheckPassword={handleCheckPassword}
              checkPassword={checkPassword}
              setCheckPassword={setCheckPassword}
              setCheckUser={setCheckUser}
            /> /*link to phone component */
          )}

          <Submit type={"submit"} disabled={!submitEnable}>
            Log In
          </Submit>

          {checkUser && (
            <UserWarning>Please check username and password!</UserWarning>
          )}
        </Form>
      </MyModal>
    </>
  );
};

const MyModal = styled(Modal)`
  background-color: ${COLORS.darkgray};
  width: 500px;
  height: 800px;
  position: fixed;
  left: 720px;
  top: 120px;
  border-radius: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CloseButton = styled.button`
  background-color: transparent;
  position: fixed;
  top: 160px;
  right: 680px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Highlight = styled.span`
  color: ${COLORS.blue};
`;

const Submit = styled.button`
  background-color: ${COLORS.blue};
  height: 50px;
  border-radius: 15px;
  font-size: 20px;
  color: ${COLORS.white};
`;

const ButtonWapper = styled.div`
  display: flex;
  gap: 60px;
  margin-bottom: 10px;
`;

const SelectButton = styled.button`
  background-color: transparent;
  font-size: 20px;
  padding: 8px;
  margin-bottom: 8px;
  &.active {
    border-bottom: 2px solid ${COLORS.blue};
  }
`;

const UserWarning = styled.p`
  font-size: 20px;
  color: red;
  margin-top: 20px;
  margin-left: 10px;
`;

export default LogInModal;
