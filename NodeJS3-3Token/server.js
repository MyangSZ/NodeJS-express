const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const users = [
  {
    user_id: "test",
    user_password: "1234",
    user_name: "테스트 유저",
    user_info: "테스트 유저라오",
  },
];

const app = express();

app.use(
  cors({
    origin: ["http://127.0.0.1:5500", "http://localhost:5500"],
    methods: ["OPTIONS", "POST", "GET", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

// 토큰 사용 시 만들고 검증할 떄 필요한 시크릿 키 (열쇠역할)
const secretKey = "ozcodingschool";

app.post("/", (req, res) => {
  //   console.log(req.body);
  // user 아이디 정보 일치할 경우 로그인 시켜주기 위해  user데이터 검사
  const { userId, userPassword } = req.body;
  const userInfo = users.find(
    (el) => el.user_id === userId && el.user_password === userPassword
  );

  if (!userInfo) {
    // 일치하지 않을 경우 로그인 실패 알려주기
    res.status(401).send("로그인 실패");
  } else {
    // 토큰을 이용해 토큰을 생성해서 데이터 보내주기
    // 토큰을 만들때 sign
    // 전달인자 : payload, secretkey, option(expiresIn: 토큰 유효기간 설정)
    // jwt는 json 형태로 만들어놓고 쓴다. 객체로 전달
    const accessToken = jwt.sign({ userId: userInfo.user_id }, secretKey, {
      expiresIn: 1000 * 60 * 10,
    });
    console.log(accessToken);
    // 클라이언트로 보내주기 (쿠키로 전달)
    res.cookie("accessToken", accessToken);
    res.send("토큰 생성 완료");
  }
});

// get 요청을 받아와서 검증하기
app.get("/", (req, res) => {
  const { accessToken } = req.cookies;
  const payload = jwt.verify(accessToken, secretKey);
  const userInfo = users.find((el) => el.user_id === payload.userId);
  return res.json(userInfo); // json 형식으로 내보내기
});

// 로그아웃 시 토큰정보를 담고 있는 쿠키 삭제
app.delete("/", (req, res) => {
  res.clearCookie("accessToken"); // 로그아웃 시 쿠키도 삭제
  res.send("토큰 삭제 완료");
});
app.listen(3000, () => console.log("서버 실행"));
