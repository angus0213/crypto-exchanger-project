import { Button, Drawer, Space } from "antd";
import { useState } from "react";
import styled from "styled-components";
import Chatbot from 'react-chatbot-kit'
import config from './config';
import ActionProvider from './ActionProvider';
import MessageParser from './MessageParser';
import "./bot.css" // this part is a third party component, the easy way is to modify it's original css file to change the style

const CustomerService=()=>{
    const [draweropen, setDrawerOpen] = useState(false);

    return (
        <>
        <DrawerButton onClick={() => setDrawerOpen(true)}><CustomerServiceMain src="../webImages/customerservice.png"/></DrawerButton>
          <Drawer
            title="Welcome to Customer Service Center"
            width={500}
            onClose={() => setDrawerOpen(false)}
            open={draweropen}
            extra={
              <Space>
                <CustomerServiceIcon src="../webImages/customerservice.png"/>
                <Button onClick={() => setDrawerOpen(false)}>Cancel</Button>
              </Space>
            }
          >
            <MyChatbot config={config} actionProvider={ActionProvider} messageParser={MessageParser} headerText="CrptoBeats Bot: Bella"/>
          </Drawer>
        </>
    )
}


const CustomerServiceMain = styled.img`
  width: 60px;
`;

const CustomerServiceIcon = styled.img`
  width: 40px;
`;

const MyChatbot=styled(Chatbot)`

&.react-chatbot-kit-chat-btn-send {
  background-color: red;
  color: yellow;
}
`;

const DrawerButton = styled.button`
  position: fixed;
  left:-110px;
  top: 650px;
  width: 300px;
  background-color: transparent;
`;

export default CustomerService;