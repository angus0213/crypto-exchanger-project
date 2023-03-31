import styled from "styled-components";
import { COLORS } from "../Constants";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../CurrentUserContext";
import { useContext } from "react";
import { useEffect } from "react";

const SignUp = () => {
  const [emailStatus, setEmailStatus] = useState(true);
  const [mobileStatus, setMobileStatus] = useState(false);
  const [emailFormData, setemailFormData] = useState("");
  const [mobileFormData, setMobileFormData] = useState("");
  const [checkEmail, setCheckEmail] = useState(true);
  const [checkPassword, setCheckPassword] = useState(true);
  const [checkPasswordConfirmation, setCheckPasswordConfirmation] =
    useState(true);
  const [checkmobileNumber, setCheckmobileNumber] = useState(true);
  const [checkUserExist, setCheckUserExist]=useState("");
  const {currentUser}=useContext(CurrentUserContext);

  const location = useLocation();
  const userId = location.pathname.slice(8);
  const UserReferralCode = location.pathname.slice(8, 16);
  const navigate=useNavigate();
  
  const handleEmail = () => {
    setEmailStatus(true);
    setMobileStatus(false);
  };

  const handleMobile = () => {
    setEmailStatus(false);
    setMobileStatus(true);
  };

  const handleCheckEmail = () => {
    if (emailFormData.email && emailFormData.email.indexOf("@") > -1) {
      setCheckEmail(true);
    } else {
      setCheckEmail(false);
    }
  };

  const handleCheckPassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/;
    const passwordFormatFlag = regex.test(password);
    if (password && passwordFormatFlag) {
      setCheckPassword(true);
    } else {
      setCheckPassword(false);
    }
  };

  const handleConfirmPassword = (password, passwordConfirmation) => {
    if (password && passwordConfirmation && password === passwordConfirmation) {
      setCheckPasswordConfirmation(true);
    } else {
      setCheckPasswordConfirmation(false);
    }
  };

  const handleCheckMobile = (mobileNumber) => {
    const regex = /^\d{8,16}$/;
    const mobileNumberFlag = regex.test(mobileNumber);
    if (mobileNumber && mobileNumberFlag) {
      setCheckmobileNumber(true);
    } else {
      setCheckmobileNumber(false);
    }
  };

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
  };

  const submitEnable =
    (checkEmail &&
      checkPassword &&
      checkPasswordConfirmation &&
      emailFormData.agreeTerms) ||
    (checkmobileNumber &&
      checkPassword &&
      checkPasswordConfirmation &&
      mobileFormData.agreeTerms);

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
  };

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
        if (data.status==200) {
        sessionStorage.setItem("userId",data.data.insertedId);
        navigate(`/userverify/${data.data.insertedId}`)}
        if (data.status==403) {
          setCheckUserExist(data.status)
        }
       })
      .catch((err) => console.log(err));
  };

  useEffect(()=>{
    if (currentUser){
    navigate(`/`)}
  })

  
  

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
              }}
              className={emailStatus && "active"}
            >
              Email
            </SelectButton>
            <SelectButton
              onClick={() => {
                handleMobile();
                setemailFormData("");
              }}
              className={mobileStatus && "active"}
            >
              Mobile Number
            </SelectButton>
          </ButtonWapper>
          <Form onSubmit={handleSubmit}>
            {emailStatus && (
              <InputWapper>
                <Input
                  type={"text"}
                  id="email"
                  placeholder="Email"
                  required
                  onChange={(e) => handleChange(e.target.id, e.target.value)}
                  onBlur={handleCheckEmail}
                  onFocus={()=>setCheckEmail(true)}
                />
                {!checkEmail && emailFormData.email && (
                  <Warning>Please check your email format</Warning>
                )}
                <Input
                  type={"password"}
                  id="password"
                  placeholder="Password"
                  required
                  onChange={(e) => handleChange(e.target.id, e.target.value)}
                  onBlur={() => handleCheckPassword(emailFormData.password)}
                  onFocus={()=>setCheckPassword(true)}
                />
                {!checkPassword && emailFormData.password && (
                  <Warning>
                    Password should contains 8-16 characters, at least 1
                    uppercase and 1 lowercase character!
                  </Warning>
                )}
                <Input
                  type={"password"}
                  id="passwordConfirmation"
                  placeholder="Confirm Password"
                  required
                  onChange={(e) => handleChange(e.target.id, e.target.value)}
                  onBlur={() =>
                    handleConfirmPassword(
                      emailFormData.password,
                      emailFormData.passwordConfirmation
                    )
                  }
                  onFocus={()=>setCheckPasswordConfirmation(true)}
                />
                {!checkPasswordConfirmation &&
                  emailFormData.passwordConfirmation && (
                    <Warning>
                      Two passwords do not match, please re-enter!
                    </Warning>
                  )}
                <Input
                  type={"text"}
                  id="referralCodeUsed"
                  placeholder="Referral Code (Optional)"
                  onChange={(e) => handleChange(e.target.id, e.target.value)}
                />
              </InputWapper>
            )}
            {mobileStatus && (
              <InputWapper>
                <div>
                  <CountryCodeInput
                    id="countryCode"
                    type={"text"}
                    placeholder="+1"
                    required
                    onChange={(e) => handleChange(e.target.id, e.target.value)}
                  />
                  <MobileNumberInput
                    id="mobileNumber"
                    type={"text"}
                    placeholder="Mobile Number"
                    required
                    onChange={(e) => handleChange(e.target.id, e.target.value)}
                    onBlur={() =>
                      handleCheckMobile(mobileFormData.mobileNumber)
                    }
                    onFocus={()=>setCheckmobileNumber(true)}
                  />
                </div>
                {!checkmobileNumber && mobileFormData.mobileNumber && (
                  <Warning>Mobile number should contains 8-16 numbers!</Warning>
                )}
                <Input
                  type={"password"}
                  id="password"
                  placeholder="Password"
                  required
                  onChange={(e) => handleChange(e.target.id, e.target.value)}
                  onBlur={() => handleCheckPassword(mobileFormData.password)}
                  onFocus={()=>setCheckPassword(true)}
                />
                {!checkPassword && mobileFormData.password && (
                  <Warning>
                    Password should contains 8-16 characters, at least 1
                    uppercase and 1 lowercase character!
                  </Warning>
                )}
                <Input
                  type={"password"}
                  id="passwordConfirmation"
                  placeholder="Confirm Password"
                  required
                  onChange={(e) => handleChange(e.target.id, e.target.value)}
                  onBlur={() =>
                    handleConfirmPassword(
                      mobileFormData.password,
                      mobileFormData.passwordConfirmation
                    )
                  }
                  onFocus={()=>setCheckPasswordConfirmation(true)}
                />
                {!checkPasswordConfirmation &&
                  mobileFormData.passwordConfirmation && (
                    <Warning>
                      Two passwords do not match, please re-enter!
                    </Warning>
                  )}
                <Input
                  type={"text"}
                  id="referralCodeUsed"
                  placeholder="Referral Code (Optional)"
                  onChange={(e) => handleChange(e.target.id, e.target.value)}
                />
              </InputWapper>
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
          {checkUserExist==403 && <UserWarning>
                      User already exist!
                    </UserWarning>}
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

const Input = styled.input`
  height: 45px;
  border-radius: 15px;
`;

const Wapper = styled.div`
  display: flex;
`;

const InputWapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
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

const CountryCodeInput = styled.input`
  width: 60px;
  height: 45px;
  border-radius: 15px;
  margin-right: 20px;
`;

const MobileNumberInput = styled.input`
  width: 317px;
  height: 45px;
  border-radius: 15px;
`;

const Warning = styled.p`
  font-size: 12px;
  color: red;
  margin-top: -15px;
  margin-left: 10px;
`;

const UserWarning = styled.p`
  font-size: 20px;
  color: red;
  margin-top: 20px;
  margin-left: 10px;
`;



export default SignUp;
