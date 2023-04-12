import { createChatBotMessage } from "react-chatbot-kit";
const botName = "CryptoBeats";
const config = {
  initialMessages: [
    createChatBotMessage(
      `Welcome to CryptoBeats, how can I help you today? Try to input "BTC" or "BTC price" to get real time price!`
    ),
  ],
  botName: botName,
};

export default config;
