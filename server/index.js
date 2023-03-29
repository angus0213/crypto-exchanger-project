"use strict";

const express = require("express");
const morgan = require("morgan");

const PORT = 8000;
const app = express();

app.use(morgan("tiny"));
app.use(express.json());
app.use(express.static("./server/assets"));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/"));

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

app.get("*", (req, res) => {
  res.status(404).json({
    status: 404,
    message: "no such info",
  });
});

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
