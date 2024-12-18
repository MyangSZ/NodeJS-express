const express = require("express");
const cors = require("cors");
const axios = require("axios");

const kakaoClientId = "8a7cbf3c202dc79b718e3cf964167cf1";
const redirectURI = "http://127.0.0.1:5500/NodeJS3-4OAuth/index.html";

const app = express();

app.use(
  cors({
    origin: ["http://127.0.0.1:5500", "http://localhose:5500"],
    methods: ["OPTIONS", "POST", "DELETE"],
  })
);

app.use(express.json());

// login에서 보낸 post 요청 처리하기
// 엔드포인트 넣어주기.
app.post("/kakao/login", (req, res) => {
  const authorizationCode = req.body.authorizationCode;
  axios
    .post(
      "https://kauth.kakao.com/oauth/token",
      {
        grant_type: "authorization_code", // 고정값
        client_id: kakaoClientId,
        redirect_uri: redirectURI,
        code: authorizationCode, //authorizationcod를 담아서 보내준다
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      }
    )
    .then((response) => res.send(response.data.access_token));
});

// 두번째 POST 요청 처리하기
// 엔드포인ㅌ느 userinfo 넣기. accessToken 받아오기(사용자 정보)
app.post("/kakao/userinfo", (req, res) => {
  console.log(req.body);
});

app.listen(3000, () => console.log("서버 OPEN"));
