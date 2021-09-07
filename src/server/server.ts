import express = require("express");
import cors = require("cors");
import path = require("path");
import cookieParser = require("cookie-parser");
import dotenv = require("dotenv");
dotenv.config();

const mainServerApp = express();
console.log("dir", __dirname);
// console.log("path join", path.join(__dirname, "./../assets"));

mainServerApp.use(express.json());
mainServerApp.use(express.urlencoded({ extended: true }));
mainServerApp.use(cors());
mainServerApp.use(cookieParser());

mainServerApp.use(
  "/assets",
  express.static(path.join(__dirname, "./../assets"))
);
mainServerApp.use(
  "/build",
  express.static(path.join(__dirname, "./../../build"))
);

mainServerApp.get("/", (req, res) => {
  console.log("***** SERVING ROOT OF LANDING PAGE ( / )");
  return res.sendFile(path.resolve(__dirname + "./../index.html"));
});

mainServerApp.get("/test", (req, res) => {
  console.log("***** TEST ENDPOINT HIT *****");
  return res.status(200).json({ test: true });
});

mainServerApp.use("*", (req, res) => {
  return res.status(404).json({
    defaultMessage: "********** GLOBAL BAD REQUEST / 404 ERROR **********",
  });
});

const mainServerPort = process.env.SERVER_PORT;
mainServerApp.listen(mainServerPort, () => {
  console.log("Listening on port:", mainServerPort);
});
