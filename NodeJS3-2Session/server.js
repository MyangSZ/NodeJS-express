const express = require("express");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");

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

// session 모듈 연결
app.use(
  session({
    secret: "session secret", // 암호화를 할때 열쇠 역할을 하는 임의의 문자열
    resave: false, // 내뇽의 변화가 없어도 다시 저장할지 여부
    saveUninitialized: false, // 빈 내용일때 저장할지 여부
    name: "session_id", // 쿠키이름 지정하기
  })
);

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
    // 세션을 이용하여 세선안에 데이터 저장하기
    req.session.userId = userInfo.user_id;
    res.send("세션 생성 완료");
  }
});

// get 요청 처리하는 코드
app.get("/", (req, res) => {
  const userInfo = users.find((el) => el.user_id === req.session.userId);
  return res.json(userInfo); // json 형식으로 내보내기
});

app.delete("/", (req, res) => {
  req.session.destroy(); // 세션 내 정보를 삭제하는 메서드
  res.clearCookie("session_id"); // 로그아웃 시 쿠키도 삭제
  res.send("세션 삭제 완료");
});
app.listen(3000, () => console.log("서버 실행"));
