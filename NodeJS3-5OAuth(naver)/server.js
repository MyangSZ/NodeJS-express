const express = require("express");
const cors = require("cors");
const axios = require("axios");

const kakaoClientId = "4e14555de87ba17f596dc7e49ced6a42";
const redirectURI = "http://127.0.0.1:5500/NodeJS3-5OAuth(naver)/index.html";

// namver clientID
const naverClientId = "TDtK5xCdEn6CUhxsV1NH";
const naverClientSecret = "vDHMB_hvIu"; // 고유번호이기때문에 안보이도록 사용한다!
const naverSecret = "it_is_me";
let naverAccessToken = "";

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

// naver login
app.post("/naver/login", (req, res) => {
  const authorizationCode = req.body.authorizationCode;
  axios
    .post(
      `https://nid.naver.com/oauth2.0/token?client_id=${naverClientId}&client_secret=${naverClientSecret}&grant_type=authorization_code&state=${naverSecret}&code=${authorizationCode}
`
    )
    .then((response) => res.send(response.data.access_token));
});

// 두번째 POST 요청 처리하기
// kakao
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

// nvaer userInfo
app.post("/naver/userinfo", (req, res) => {
  // 받아온 accessToken 담아두기
  const { naverAccessToken } = req.body;
  //   console.log(accessToken);
  // 사용자 정보 가져오기
  axios
    .get("https://openapi.naver.com/v1/nid/me", {
      headers: {
        Authorization: `Bearer ${naverAccessToken}`,
      },
    })
    .then((response) => res.json(response.data.response));
});

// logout(delete요청) kakao
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
    .then((response) => res.send("카카오 로그아웃 성공"));
});

// naver logout
app.delete("/naver/logout", (req, res) => {
  const { naverAccessToken } = req.body;
  axios
    .post(
      `https://nid.naver.com/oauth2.0/token?grant_type=delete&client_id=${naverClientId}&client_secret=${naverClientSecret}&access_token=${naverAccessToken}&service_provider=NAVER`
    )
    // 로그아웃 확인(콘솔확인)
    // .then((response) => console.log(response));
    // 로그아웃. 클라이언트로 응답보내기
    .then((response) => res.send("네이버 로그아웃 성공"));
});

app.listen(3000, () => console.log("서버 OPEN"));
