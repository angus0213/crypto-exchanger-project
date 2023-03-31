import styled from "styled-components";
import { COLORS } from "../Constants";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../CurrentUserContext";
import { useContext } from "react";
import { useEffect } from "react";
import EmailSignUp from "./EmailSignUp";
import PhoneSignUp from "./PhoneSignUp";

const SignUp = () => {
  const [emailStatus, setEmailStatus] = useState(true);//control the panel to switch signup method;
  const [mobileStatus, setMobileStatus] = useState(false);//control the panel to switch signup method;
  const [emailFormData, setemailFormData] = useState("");// collect data from email form
  const [mobileFormData, setMobileFormData] = useState("");// collect data from phone form
  const [checkEmail, setCheckEmail] = useState(true);// check email input is filled or not
  const [checkPassword, setCheckPassword] = useState(true);//same as above
  const [checkPasswordConfirmation, setCheckPasswordConfirmation] =
    useState(true);//same as above
  const [checkmobileNumber, setCheckmobileNumber] = useState(true);//same as above
  const [checkUserExist, setCheckUserExist] = useState("");//check the whether user is already in database
  const { currentUser } = useContext(CurrentUserContext); //get user info

  const location = useLocation();
  const userId = location.pathname.slice(8);//set userId that generate from uuid in Header page
  const UserReferralCode = location.pathname.slice(8, 16);//set refferal code of the user
  const navigate = useNavigate();

  const handleEmail = () => {
    setEmailStatus(true);
    setMobileStatus(false);
  };//switch between email signup and phone signup

  const handleMobile = () => {
    setEmailStatus(false);
    setMobileStatus(true);
  };//switch between email signup and phone signup

  const handleCheckPassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/;
    const passwordFormatFlag = regex.test(password);
    if (password && passwordFormatFlag) {
      setCheckPassword(true);
    } else {
      setCheckPassword(false);
    }
  };//check password meets requirement

  const handleConfirmPassword = (password, passwordConfirmation) => {
    if (password && passwordConfirmation && password === passwordConfirmation) {
      setCheckPasswordConfirmation(true);
    } else {
      setCheckPasswordConfirmation(false);
    }
  };//confirm two password inputs are the same

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
  };//collect user input data

  const submitEnable =
    (checkEmail &&
      checkPassword &&
      checkPasswordConfirmation &&
      emailFormData.agreeTerms) ||
    (checkmobileNumber &&
      checkPassword &&
      checkPasswordConfirmation &&
      mobileFormData.agreeTerms);//submit button will disabled unless these requirement fits

  const userData = {
    _id: userId,
    email: emailFormData.email,
    countryCode: mobileFormData.countryCode,
    mobileNumber: mobileFormData.mobileNumber,
    password: emailFormData.password
      ? emailFormData.password
      : mobileFormData.password,
    referralCodeUsed: emailFormData.referralCodeUsed
      ? emailFormData.referralCodeUsed
      : mobileFormData.referralCodeUsed,
  };//prepare user's data and send to backend

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/users", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status == 200) {
          sessionStorage.setItem("userId", data.data.insertedId);
          navigate(`/userverify/${data.data.insertedId}`);
        }
        if (data.status == 403) {
          setCheckUserExist(data.status);
        }
      })
      .catch((err) => console.log(err));
  };//post user's data to the backend. If get 200 code, store userId to the session and navigate to verify page. If get 403, remind user that this user already exist

  useEffect(() => {
    if (currentUser) {
      navigate(`/`);
    }
  });// if get 200 code, let this new signup user login, and this signup page won't show again(navigate to home page)

  return (
    <>
      <Wapper>
        <div>
          <WelcomeWapper>
            <ImgLogo src="/favicon/favicon.png" />
            <WelcomeDiv>
              <h1>
                <span>Welcome to Crypto</span>
                <Highlight>Beats</Highlight>
                <span>!</span>
              </h1>
              <P>Your Referral Code: {UserReferralCode}</P>
            </WelcomeDiv>
          </WelcomeWapper>
          <BounsWapper>
            <h1>
              <span>SignUp </span>
              <Highlight>Today </Highlight>
              <span>get $10,000 USDT </span>
              <Highlight>FREE</Highlight>
              <span>!</span>
            </h1>
            <h2>Another $30,000 Deposite Rewards</h2>
            <ImgBouns src="/webImages/signinBouns.png" />
          </BounsWapper>
        </div>
        <CreateAccuntWapper>
          <h1>Create Account</h1>
          <hr />
          <ButtonWapper>
            <SelectButton
              onClick={() => {
                handleEmail();
                setMobileFormData("");
              }} /*switch to email signup */
              className={emailStatus && "active"}
            >
              Email
            </SelectButton>
            <SelectButton
              onClick={() => {
                handleMobile();
                setemailFormData("");
              }}/*switch to phone signup */
              className={mobileStatus && "active"}
            >
              Mobile Number
            </SelectButton>
          </ButtonWapper>
          <Form onSubmit={handleSubmit}>
            {emailStatus && (
              <EmailSignUp
                handleChange={handleChange}
                setCheckEmail={setCheckEmail}
                checkEmail={checkEmail}
                emailFormData={emailFormData}
                handleCheckPassword={handleCheckPassword}
                checkPassword={checkPassword}
                setCheckPassword={setCheckPassword}
                handleConfirmPassword={handleConfirmPassword}
                checkPasswordConfirmation={checkPasswordConfirmation}
                setCheckPasswordConfirmation={setCheckPasswordConfirmation}
              />/*link to email component */
            )}
            {mobileStatus && (
              <PhoneSignUp
                handleChange={handleChange}
                checkmobileNumber={checkmobileNumber}
                setCheckmobileNumber={setCheckmobileNumber}
                mobileFormData={mobileFormData}
                handleCheckPassword={handleCheckPassword}
                checkPassword={checkPassword}
                setCheckPassword={setCheckPassword}
                handleConfirmPassword={handleConfirmPassword}
                checkPasswordConfirmation={checkPasswordConfirmation}
                setCheckPasswordConfirmation={setCheckPasswordConfirmation}
              />/*link to phone component */
            )}
            <AgreeDiv>
              <input
                id="agreeTerms"
                type={"checkbox"}
                onClick={(e) => handleChange(e.target.id, e.target.checked)}
              />
              <AgreeTerm>
                By clicking “Create Account”, you agree to
                <Link to={"/termsandconditions"}>Terms of Service</Link> and
                <Link to={"/termsandconditions"}>Privacy Policy</Link>
              </AgreeTerm>
            </AgreeDiv>
            <Submit type={"submit"} disabled={!submitEnable}>
              Create Account
            </Submit>
          </Form>
          {checkUserExist == 403 && (
            <UserWarning>User already exist!</UserWarning>
          )}
        </CreateAccuntWapper>
      </Wapper>
    </>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Wapper = styled.div`
  display: flex;
`;

const WelcomeWapper = styled.div`
  display: flex;
  background-color: ${COLORS.grey};
  align-items: center;
  justify-content: center;
  width: 700px;
  margin-left: 200px;
  margin-top: 150px;
  padding: 50px;
  border-radius: 15px;
`;

const CreateAccuntWapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${COLORS.grey};
  /* align-items: center; */
  justify-content: center;
  width: 500px;
  margin-left: 150px;
  margin-top: 150px;
  padding: 50px;
  border-radius: 15px;
`;

const P = styled.p`
  font-size: 15px;
`;

const ImgLogo = styled.img`
  width: 100px;
`;

const ImgBouns = styled.img`
  width: 600px;
`;

const BounsWapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${COLORS.grey};
  align-items: center;
  justify-content: center;
  width: 700px;
  margin-left: 200px;
  margin-top: 40px;
  padding: 50px;
  border-radius: 15px;
`;

const WelcomeDiv = styled.div`
  margin-left: 30px;
`;

const Highlight = styled.span`
  color: ${COLORS.blue};
`;

const AgreeDiv = styled.div`
  display: flex;
  gap: 10px;
`;

const AgreeTerm = styled.p`
  margin-top: 18px;
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
  gap: 20px;
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

export default SignUp;
