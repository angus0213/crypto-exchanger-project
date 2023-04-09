import { CurrentUserContext } from "../CurrentUserContext";
import { useContext } from "react";
import React, { useState } from "react";
import { COLORS } from "../Constants";
import styled from "styled-components";
import { Table, Avatar } from "antd";
import { useNavigate } from "react-router-dom";
import { GrClose } from "react-icons/gr";
import Modal from "react-modal";

const TermDepositWallet = () => {
  const { currentUser, refetch, setRefetch } = useContext(CurrentUserContext);
  const [modalOpen, setModalOpen] = useState(false); //set confirmation modal open or close
  const [redeemCoin, setRedeemCoin] = useState(""); //prepare for modal display info
  const [redeemAmount, setRedeemAmount] = useState(""); //prepare for modal display info
  const [redeemInterest, setRedeemInterest] = useState(""); //prepare for modal display info

  const navigate = useNavigate();

  const handleRedeem = () => {
    fetch(`/redeem/${currentUser._id}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "content-Type": "application/json",
      },
      body: JSON.stringify({ redeemCoin: redeemCoin, _id: currentUser._id }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setModalOpen(false);
        setRefetch(!refetch);
      })
      .catch((err) => console.log(err));
  };//send redeem info and user info to backend

  let principal;
  let valueDate;
  const data = currentUser.depositWallet.map((item) => {
    currentUser.depositPrincipalData.forEach((crypto) => {
      if (item._id === crypto._id) {
        principal = crypto.amount;
      }
    });

    currentUser.depositWalletHistory.forEach((history) => {
      if (item._id === history.crypto) {
        valueDate = history.timestamp;
      }
    });
    if (principal > 0) {
      return {
        cryptoImgSrc: item.imageSrc,
        Coin: item.name,
        Principal: Number(principal).toFixed(5),
        DepositAccountValue: Number(item.amount).toFixed(5),
        "InterestRate(Year)": "5%",
        InterestAmount: (Number(item.amount) - Number(principal)).toFixed(5),
        ValueDate: new Date(valueDate).toLocaleString("en-US"),
      };
    } else {
      return {
        cryptoImgSrc: item.imageSrc,
        Coin: item.name,
        Principal: 0,
        DepositAccountValue: Number(item.amount).toFixed(5),
        "InterestRate(Year)": "5%",
        InterestAmount: (Number(item.amount) - Number(principal)).toFixed(5),
        ValueDate: 0,
      };
    }
  }); // get the right data that need to input in the wallet table

  const columns = [
    {
      dataIndex: "ImageURL",
      width: "1%",
      render: (text, record) => <Avatar src={record.cryptoImgSrc} />,
    },
    {
      title: "Coin",
      dataIndex: "Coin",
      key: "Coin",
      sorter: (a, b) => a["Coin"].charCodeAt(0) - b["Coin"].charCodeAt(0),
    },
    {
      title: "Principal",
      dataIndex: "Principal",
      key: "Principal",
      sorter: (a, b) => a["Principal"] - b["Principal"],
    },
    {
      title: "Deposit Account Value",
      dataIndex: "DepositAccountValue",
      key: "DepositAccountValue",
      width: "20%",
      sorter: (a, b) => a["DepositAccountValue"] - b["DepositAccountValue"],
    },
    {
      title: "Interest Rate(Year)",
      dataIndex: "InterestRate(Year)",
      key: "InterestRate(Year)",
      width: "20%",
      sorter: (a, b) => a["InterestRate(Year)"] - b["InterestRate(Year)"],
    },

    {
      title: "Interest Amount",
      dataIndex: "InterestAmount",
      key: "InterestAmount",
      width: "20%",
      sorter: (a, b) => a["InterestAmount"] - b["InterestAmount"],
    },
    {
      title: "Value Date",
      dataIndex: "ValueDate",
      key: "ValueDate",
      width: "20%",
      sorter: (a, b) => Date.parse(a["ValueDate"]) - Date.parse(b["ValueDate"]),
    },

    {
      dataIndex: "Redeem",
      key: "Redeem",
      width: "10%",
      render: (text, record) => (
        <Button
          onClick={() => {
            setRedeemAmount(record.DepositAccountValue);
            setRedeemCoin(record.Coin);
            setRedeemInterest(record.InterestAmount);
            setModalOpen(true);
          }}
        >
          {"Redeem"}
        </Button>
      ),
    },
  ];

  return (
    <>
      <History
        onClick={() => navigate(`/termdepositwallethistory/${currentUser._id}`)}
      >
        History
      </History>
      <MyTable
        dataSource={data}
        columns={columns}
        rowClassName={"row"}
        pagination={{ pageSize: 15 }}
      />
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
          <span>Thanks for using Crypto</span>
          <Highlight>Beats!</Highlight>
        </h1>
        <h1>
          <span>You Will Redeem </span>
          <Highlight>
            {redeemAmount} {redeemCoin}
          </Highlight>
        </h1>
        <h1>
          <span>Your Total Interest Earned: </span>
          <Highlight>
            {redeemInterest} {redeemCoin}
          </Highlight>
        </h1>
        <ConfirmButton onClick={handleRedeem}>Redeem</ConfirmButton>
      </MyModal>
    </>
  );
}; // setup depositwallet table

const MyTable = styled(Table)`
  width: 80%;
  position: relative;
  top: 30px;
  background-color: ${COLORS.grey};
  z-index:0;
  .row {
    color: ${COLORS.black};
    background-color: ${COLORS.grey};
  }
`;

const Button = styled.button`
  border-radius: 15px;
  width: 100px;
  color: ${COLORS.grey};
  padding: 3px;
  background-color: ${COLORS.blue};
`;

const MyModal = styled(Modal)`
  background-color: ${COLORS.darkgray};
  width: 650px;
  height: 500px;
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
  right: 530px;
`;

const Highlight = styled.span`
  color: ${COLORS.blue};
`;

const ConfirmButton = styled.button`
  width: 300px;
  height: 50px;
  color: ${COLORS.white};
  background-color: ${COLORS.blue};
  font-weight: 600px;
  font-size: 20px;
  border-radius: 15px;
  margin-top: 60px;
`;

const History = styled.button`
  width: 150px;
  height: 35px;
  color: ${COLORS.white};
  background-color: ${COLORS.blue};
  font-weight: 600px;
  font-size: 18px;
  border-radius: 15px;
  margin-top: 20px;
  position: relative;
  left: 600px;
`;

export default TermDepositWallet;
