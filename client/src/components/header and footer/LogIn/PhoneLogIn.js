import styled from "styled-components";

const PhoneLogIn = ({
  handleChange,
  checkmobileNumber,
  setCheckmobileNumber,
  mobileFormData,
  handleCheckPassword,
  checkPassword,
  setCheckPassword,
  setCheckUser,
}) => {
  const handleCheckMobile = (mobileNumber) => {
    const regex = /^\d{8,16}$/;
    const mobileNumberFlag = regex.test(mobileNumber);
    if (mobileNumber && mobileNumberFlag) {
      setCheckmobileNumber(true);
    } else {
      setCheckmobileNumber(false);
    }
  }; /*check password format */

  return (
    <InputWrapper>
      <div>
        <CountryCodeInput
          id="countryCode"
          type={"text"}
          placeholder="+1"
          required
          onChange={(e) => handleChange(e.target.id, e.target.value)}
          onFocus={() => {
            setCheckUser(false);
          }}
        />
        <MobileNumberInput
          id="mobileNumber"
          type={"text"}
          placeholder="Mobile Number"
          required
          onChange={(e) => handleChange(e.target.id, e.target.value)}
          onBlur={() => handleCheckMobile(mobileFormData.mobileNumber)}
          onFocus={() => {
            setCheckUser(false);
            setCheckmobileNumber(true);
          }} /*check phone and prepare for warning span */
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
        onFocus={() => {
          setCheckUser(false);
          setCheckPassword(true);
        }}
      />
      {!checkPassword && mobileFormData.password && (
        <Warning>
          Password should contains 8-16 characters, at least 1 uppercase and 1
          lowercase character!
        </Warning>
      )}
    </InputWrapper>
  );
};

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const CountryCodeInput = styled.input`
  width: 50px;
  height: 45px;
  border-radius: 15px;
  margin-right: 20px;
`;

const MobileNumberInput = styled.input`
  width: 290px;
  height: 45px;
  border-radius: 15px;
`;

const Warning = styled.p`
  font-size: 12px;
  color: red;
  margin-top: -15px;
  margin-left: 10px;
  width: 350px;
`;

const Input = styled.input`
  height: 45px;
  border-radius: 15px;
`;

export default PhoneLogIn;
