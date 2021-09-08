import express from "express";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";
import constants from "../../constants/constants";

const mainServerApp = express();

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
  return res.sendFile(path.resolve(__dirname + "./../../index.html"));
});

mainServerApp.get("/test", (req, res) => {
  // console.log("***** TEST ENDPOINT HIT *****");
  return res.status(200).json({ test: true });
});

mainServerApp.use("*", (req, res) => {
  return res.status(404).json({
    defaultMessage: "********** GLOBAL BAD REQUEST / 404 ERROR **********",
  });
});

// export default mainServerApp;
const mainServerPort = constants.SERVER_PORT;
if (process.env.NODE_ENV !== "test") {
  console.log("APP LISTEN");
  mainServerApp.listen(mainServerPort, () => {
    console.log("Listening on port:", mainServerPort);
  });
}
export default mainServerApp;
