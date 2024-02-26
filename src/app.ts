import bodyParser from "body-parser";
import express from "express";
import router from "./contexts/index.context";
import authMiddleware from "./middlewares/auth.middleware";

const app = express();
const PORT = 5050;

app.use(bodyParser.json());
app.use(authMiddleware);
app.use(router);

app.get("/health-check", (_, res) => {
  res.json("OK");
});

app.listen(PORT, () => {
  console.log("서버가 잘 시작됨..");
});
