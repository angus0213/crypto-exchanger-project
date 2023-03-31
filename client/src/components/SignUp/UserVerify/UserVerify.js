import { useState } from "react";
import styled from "styled-components";
import { COLORS } from "../../Constants";
import { useNavigate } from "react-router-dom";
import VerifyModal from "./VerifyModal";

const UserVerify = () => {
  const [formData, setFormData] = useState("");
  const navigate = useNavigate();
  const [modalopen, setModalOpen] = useState(false);

  const userId = sessionStorage.getItem("userId");

  const handleChange = (key, value) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`/user/${userId}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, ...formData }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.data.modifiedCount >= 1) {
          setModalOpen(true);
        }
      })
      .catch((err) => console.log(err));
  };
  /*verify page, let user input ID info and store in database */

  const handleModalClose = () => setModalOpen(false);

  return (
    <>
      <Wapper>
        <NoticeWapper>
          <h1>
            <Highlight> Notice:</Highlight> <span>You need to </span>
            <Highlight>Verify Identity </Highlight>
            <span>before Trade </span>
            <span>!</span>
          </h1>
          <h2>You will get $10,000 USDT immediately after KYC</h2>
          <Img src="/webImages/mobileapp.jpg" />
        </NoticeWapper>

        <KYCWapper>
          <CongratulationsWapper>
            Congratulations!{" "}
            <Congratulations src="/webImages/congratulations.png" />
          </CongratulationsWapper>
          <h1>Please Verify Your Information</h1>
          <hr />
          <Form onSubmit={handleSubmit}>
            <InputWapper>
              <Input
                type={"text"}
                id="ID"
                placeholder="ID Number"
                required
                onChange={(e) => handleChange(e.target.id, e.target.value)}
              />

              <Input
                type={"text"}
                id="fullName"
                placeholder="Full Name"
                required
                onChange={(e) => handleChange(e.target.id, e.target.value)}
              />

              <Input
                type={"text"}
                id="age"
                placeholder="Age"
                required
                onChange={(e) => handleChange(e.target.id, e.target.value)}
              />
              <Input
                type={"text"}
                id="address"
                placeholder="Address"
                required
                onChange={(e) => handleChange(e.target.id, e.target.value)}
              />

              <Input
                type={"text"}
                id="country"
                required
                placeholder="Country"
                onChange={(e) => handleChange(e.target.id, e.target.value)}
              />
            </InputWapper>
            <Submit type={"submit"}>Submit</Submit>
          </Form>
          <Cancel onClick={() => navigate("/")}>Skip</Cancel>
        </KYCWapper>
      </Wapper>
      <VerifyModal modalopen={modalopen} handleModalClose={handleModalClose} />
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

const KYCWapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${COLORS.grey};
  justify-content: center;
  width: 500px;
  margin-left: 150px;
  margin-top: 120px;
  padding: 50px;
  border-radius: 15px;
`;

const Img = styled.img`
  width: 600px;
`;

const Congratulations = styled.img`
  width: 50px;
`;

const CongratulationsWapper = styled.h1`
  color: ${COLORS.blue};
  font-size: 30px;
  position: relative;
  left: 50px;
  margin-bottom: 50px;
`;

const NoticeWapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${COLORS.grey};
  align-items: center;
  justify-content: center;
  width: 700px;
  margin-left: 100px;
  margin-top: 120px;
  margin-right: 100px;
  padding: 50px;
  border-radius: 15px;
`;

const Highlight = styled.span`
  color: ${COLORS.blue};
`;

const Submit = styled.button`
  background-color: ${COLORS.blue};
  height: 50px;
  margin-top: 40px;
  border-radius: 15px;
  font-size: 20px;
  color: ${COLORS.white};
`;

const Cancel = styled.button`
  background-color: #96d5d5;
  margin-top: 20px;
  height: 50px;
  border-radius: 15px;
  font-size: 20px;
  color: ${COLORS.white};
`;

export default UserVerify;
