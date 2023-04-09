import React from "react";
import { COLORS } from "../Constants";
import { useContext } from "react";
import { CurrentPriceContext } from "../CurrentPricesContext";
import styled from "styled-components";
import cryptos from "../../data/cryptos.json";
import { Table, Avatar } from "antd";
import { CurrentUserContext } from "../CurrentUserContext";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const TradeTable = () => {
  //based on the info fetched from API, set the table to display the price and trade volume data in Homepage
  const { currentPrice } = useContext(CurrentPriceContext);
  const { currentUser } = useContext(CurrentUserContext);
  const [modalOpen, setModalOpen] = useState(false); //set confirmation modal open or close
  const navigate = useNavigate();

  const handleClick = () => {
    if (!currentUser) {
      setModalOpen(true);
    } else {
      navigate("/exchange");
    }
  }; //only allow login user

  const data = currentPrice.map((item) => {
    const crypto = cryptos.find(
      (singleCrypto) => item.asset_id_base === singleCrypto.name
    );
    const tradingPairs = `${item.asset_id_base}/${item.asset_id_quote}`;
// use ant design table component
    return {
      cryptoImgSrc: crypto.imageSrc,
      "Trading Pairs": tradingPairs,
      Price: item.price,
      "1H Trade Volume": item.volume_1hrs.toFixed(2),
      "24H Trade Volume": item.volume_1day.toFixed(2),
      "1M Trade Volume": `${(item.volume_1mth / 1000000).toFixed(2)}M`,
      "1H Trade Volume(USD)": item.volume_1hrs_usd.toFixed(2),
      "24H Trade Volume(USD)": item.volume_1day_usd.toFixed(2),
      "1M Trade Volume(USD)": `${(item.volume_1mth_usd / 1000000).toFixed(2)}M`,
    };
  });

  const columns = [
    {
      title: "Avatar",
      dataIndex: "ImageURL",
      render: (text, record) => <Avatar src={record.cryptoImgSrc} />,
    },
    {
      title: "Trading Pairs",
      dataIndex: "Trading Pairs",
      key: "pairs",
      sorter: (a, b) =>
        a["Trading Pairs"].charCodeAt(0) - b["Trading Pairs"].charCodeAt(0),
    },
    {
      title: "Price",
      dataIndex: "Price",
      key: "Price",
      sorter: (a, b) => a.Price - b.Price,
    },
    {
      title: "1H Trade Volume",
      dataIndex: "1H Trade Volume",
      key: "1H Trade Volume",
      sorter: (a, b) => a["1H Trade Volume"] - b["1H Trade Volume"],
    },

    {
      title: "24H Trade Volume",
      dataIndex: "24H Trade Volume",
      key: "24H Trade Volume",
      sorter: (a, b) => a["24H Trade Volume"] - b["24H Trade Volume"],
    },
    {
      title: "1M Trade Volume",
      dataIndex: "1M Trade Volume",
      key: "1M Trade Volume",
      sorter: (a, b) =>
        Number(
          a["1M Trade Volume"].slice(0, a["1M Trade Volume"].indexOf("M"))
        ) -
        Number(
          b["1M Trade Volume"].slice(0, b["1M Trade Volume"].indexOf("M"))
        ),
    },
    {
      title: "1H Trade Volume(USD)",
      dataIndex: "1H Trade Volume(USD)",
      key: "1H Trade Volume(USD)",
      sorter: (a, b) => a["1H Trade Volume(USD)"] - b["1H Trade Volume(USD)"],
    },

    {
      title: "24H Trade Volume(USD)",
      dataIndex: "1H Trade Volume(USD)",
      key: "1H Trade Volume(USD)",
      sorter: (a, b) => a["24H Trade Volume(USD)"] - b["24H Trade Volume(USD)"],
    },

    {
      title: "1M Trade Volume(USD)",
      dataIndex: "1M Trade Volume(USD)",
      key: "1M Trade Volume(USD)",
      sorter: (a, b) =>
        Number(
          a["1M Trade Volume(USD)"].slice(
            0,
            a["1M Trade Volume(USD)"].indexOf("M")
          )
        ) -
        Number(
          b["1M Trade Volume(USD)"].slice(
            0,
            b["1M Trade Volume(USD)"].indexOf("M")
          )
        ),
    },
    {
      dataIndex: "Trade",
      key: "Trade",
      width: "10%",
      render: () => <Button onClick={handleClick}>{"Trade"}</Button>,
    },
  ];

  return (
    <Wrapper>
      <MyTable dataSource={data} columns={columns} rowClassName={"row"} />
      <MyModal isOpen={modalOpen}>
        <h1>
          <Highlight>Please Log in First!</Highlight>
        </h1>
        <ConfirmButton
          onClick={() => {
            setModalOpen(false);
            navigate("/");
          }}
        >
          Confirm
        </ConfirmButton>
      </MyModal>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: ${COLORS.grey};
  width: 80%;
  height: 100%;
  position: relative;
  top: 100px;
  left: 200px;
  border-radius: 15px;
  margin-bottom: 220px;
`;

const MyTable = styled(Table)`
  position: relative;
  top: 20px;
  border-radius: 15px;
  background-color: ${COLORS.grey};
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
  background-color: ${COLORS.black};
  width: 550px;
  height: 400px;
  position: fixed;
  left: 720px;
  top: 120px;
  border-radius: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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

export default TradeTable;
