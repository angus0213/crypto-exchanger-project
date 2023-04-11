import { useState } from "react";
import styled from "styled-components";
import { COLORS } from "../../Constants";
import { useNavigate } from "react-router-dom";
import { DatePicker } from "antd";
import { useContext } from "react";
import { CurrentUserContext } from "../../CurrentUserContext";

const UpdateUserInfo = () => {
  const [formData, setFormData] = useState("");
  const navigate = useNavigate();
  const { refetch, setRefetch } = useContext(CurrentUserContext);

  const userId = sessionStorage.getItem("userId");

  const handleChange = (key, value) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  }; //get verify data

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.DOB) {
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
          console.log(data);
          navigate("/");
          setRefetch(!refetch);
        })
        .catch((err) => console.log(err));
    }
  };
  /*verify page, let user input ID info and store in database */

  const DobLimit = new Date(
    new Date().setFullYear(new Date().getFullYear() - 18)
  ); //set user age must > 18
  return (
        <KYCWrapper>
          <Form onSubmit={handleSubmit}>
            <InputWrapper>
              <DatePicker
                disabledDate={(current) => current > DobLimit}
                placeholder="Date of Birth"
                onChange={(dates, dateStrings) =>
                  handleChange("DOB", dateStrings)
                }
              />
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
            </InputWrapper>
            <Submit type={"submit"}>Submit</Submit>
          </Form>
        </KYCWrapper>
  )
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

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const KYCWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${COLORS.grey};
  justify-content: center;
  width: 500px;
  margin-left: 150px;
  margin-top: 120px;
  padding: 50px;
  border-radius: 15px;
  position: relative;
  left:550px;
`;

const Submit = styled.button`
  background-color: ${COLORS.blue};
  height: 50px;
  margin-top: 40px;
  border-radius: 15px;
  font-size: 20px;
  color: ${COLORS.white};
`;

export default UpdateUserInfo;
