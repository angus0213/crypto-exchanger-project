"use strict";

const express = require("express");
const morgan = require("morgan");
const { connectMongoDB } = require("./configs/MongoDB");

const PORT = 8000;
const app = express();

app.use(morgan("tiny"));
app.use(express.json());
app.use(express.static("./server/assets"));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/"));

const {postUsers}=require("./controllers/postUsers");
const {getUser}=require("./controllers/getUser");
const {patchUsers}=require("./controllers/patchUsers");
const {postLogin}=require("./controllers/postLogin");
const { getPrices } = require("./controllers/getPrices");
const {patchWallet}=require("./controllers/patchWallet");
const {getNFTcollections}=require("./controllers/getNFTcollections")
const {patchNFT}=require("./controllers/patchNFT")
const {patchNFTWallet}=require("./controllers/patchNFTWallet")
const {patchCancelListing}=require("./controllers/patchCancelListing")
const {getNews}=require("./controllers/getNews")
const {patchDepositWallet}=require("./controllers/patchDepositWallet")

app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Methods",
    "OPTIONS, HEAD, GET, PUT, POST, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
connectMongoDB();
/* POST */
app.post("/users", postUsers);
app.post("/userlogin", postLogin);

/* GET */
app.get("/user/:userId", getUser);
app.get("/quoteprices", getPrices);
app.get("/nftcollections", getNFTcollections);
app.get("/news", getNews)

/* PATCH */
app.patch("/user/:userId", patchUsers);
app.patch("/wallet/:userId", patchWallet);
app.patch("/patchnft/:userId", patchNFT);
app.patch("/patchnftwallet/:userId", patchNFTWallet);
app.patch("/cancelnftlisting/:userId", patchCancelListing)
app.patch("/depositwallet/:userId", patchDepositWallet)

app.get("*", (req, res) => {
  res.status(404).json({
    status: 404,
    message: "no such info",
  });
});

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
