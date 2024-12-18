const express = require("express");
const cors = require("cors");
const axios = require("axios");

const kakaoClientId = "8a7cbf3c202dc79b718e3cf964167cf1";
const redirectURI = "http://127.0.0.1:5500/NodeJS3-4OAuth/index.html";

const app = express();

app.use(
  cors({
    origin: ["http://127.0.0.1:5500", "http://localhost:5500"],
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
    .then((response) => res.send(response.data.access_token)) // then: 성광에 대한 반환
    .catch((error) => console.log(error)); // 서버꺼짐 방지 (에러 발생 시 코드 실행)
  // catch: 에러 객체. 오류 코드로 인해 서버실행이 멈추지 않는다.
});

// 두번째 POST 요청 처리하기
// 엔드포인트 userinfo 넣기. accessToken 받아오기(사용자 정보)
app.post("/kakao/userinfo", (req, res) => {
  // 받아온 accessToken 담아두기
  const { kakaoAccessToken } = req.body;
  //   console.log(accessToken);
  // 사용자 정보 가져오기
  axios
    .get("https://kapi.kakao.com/v2/user/me", {
      headers: {
        Authorization: `Bearer ${kakaoAccessToken}`,
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    })
    .then((response) => res.json(response.data.properties));
});

// logout(delete요청)
app.delete("/kakao/logout", (req, res) => {
  const { kakaoAccessToken } = req.body;
  axios
    .post(
      "https://kapi.kakao.com/v1/user/logout",
      {},
      {
        headers: { Authorization: `Bearer ${kakaoAccessToken}` },
      }
    )
    // 로그아웃 확인(콘솔확인)
    // .then((response) => console.log(response));
    // 로그아웃. 클라이언트로 응답보내기
    .then((response) => res.send("로그아웃 성공"));
});

app.listen(3000, () => console.log("서버 OPEN"));
