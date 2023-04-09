import { CurrentUserContext } from "../CurrentUserContext";
import { useContext } from "react";
import React from "react";
import { COLORS } from "../Constants";
import styled from "styled-components";
import { Table, Avatar } from "antd";

const TermDepositWalletHistory = () => {

  const { currentUser } = useContext(CurrentUserContext);

  const data = currentUser.depositWalletHistory.map((history) => {//prepare data for term deposit wallet history table
    return {
      ImageURL: history.imageSrc,
      CryptoName: history.crypto,
      Type: history.type,
      Amount: history.amount,
      Date: new Date(history.timestamp).toLocaleString("en-US"),
    };
  });
  const columns = [
    {
      dataIndex: "ImageURL",
      width: "1%",
      render: (text, record) => <Avatar src={record.ImageURL} />,
    },

    {
      title: "Crypto Name",
      dataIndex: "CryptoName",
      key: "CryptoName",
      sorter: (a, b) =>
        a["CryptoName"].charCodeAt(0) - b["CryptoName"].charCodeAt(0),
    },
    {
      title: "Type",
      dataIndex: "Type",
      key: "Type",
      sorter: (a, b) => a["Type"].charCodeAt(0) - b["Type"].charCodeAt(0),
    },
    {
      title: "Amount",
      dataIndex: "Amount",
      key: "Amount",
      sorter: (a, b) => a["Amount"] - b["Amount"],
    },

    {
      title: "Date",
      dataIndex: "Date",
      key: "Date",
      sorter: (a, b) => Date.parse(a["Date"]) - Date.parse(b["Date"]),
    },
  ];

  return (
    <Wrapper>
      <History>History</History>
      <MyTable
        dataSource={data}
        columns={columns}
        rowClassName={"row"}
        pagination={{ pageSize: 15 }}
      />
      </Wrapper>
  );
}; // setup wallet table

const Wrapper=styled.div`
height: 595px;
`;

const History = styled.h1`
  color: ${COLORS.white};
  position: relative;
  top: 120px;
  left: 220px;
  width: 260px;
`;

const MyTable = styled(Table)`
  width: 80%;
  position: relative;
  top: 130px;
  left: 200px;
  background-color: ${COLORS.grey};
  .row {
    color: ${COLORS.black};
    background-color: ${COLORS.grey};
  }
`;

export default TermDepositWalletHistory;
