import styled from "styled-components";

const EmailLogIn = ({
  handleChange,
  setCheckEmail,
  checkEmail,
  emailFormData,
  handleCheckPassword,
  checkPassword,
  setCheckPassword,
  setCheckUser,
}) => {
  const handleCheckEmail = () => {
    if (emailFormData.email && emailFormData.email.indexOf("@") > -1) {
      setCheckEmail(true);
    } else {
      setCheckEmail(false);
    }
  }; /*check email whether contain "@" */

  return (
    <InputWrapper>
      <Input
        type={"text"}
        id="email"
        placeholder="Email"
        required
        onChange={(e) => handleChange(e.target.id, e.target.value)}
        onBlur={handleCheckEmail} /* prepare for warning span*/
        onFocus={() => {
          setCheckUser(false);
          setCheckEmail(true);
        }} /* same as above*/
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
        onFocus={() => {
          setCheckUser(false);
          setCheckPassword(true);
        }} /* check password*/
      />
      {!checkPassword && emailFormData.password && (
        <Warning>
          Password should contains 8-16 characters, at least 1 uppercase and 1
          lowercase character!
        </Warning>
      )}
    </InputWrapper>
  );
};

const Input = styled.input`
  height: 45px;
  border-radius: 15px;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 360px;
`;

const Warning = styled.p`
  font-size: 12px;
  color: red;
  margin-top: -15px;
  margin-left: 10px;
`;

export default EmailLogIn;
