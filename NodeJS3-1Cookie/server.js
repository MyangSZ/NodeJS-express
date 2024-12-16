const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

app.use(
  cors({
    origin: ["http://127.0.0.1:5500", "http://localhost:5500"],
    methods: ["GET", "DELETE", "OPTIONS"],
    // credentials - 쿠기를 주고 받기위해 인증벙보가 담겨 있을 때가 많다.
    // 인증정보를 저장할 수 있도록 옵션에 true를 해주어야 클라이언트에 제대로 쿠키 저장 가능
    // 잊지말고 옵션 설정 해주어야 한다.
    credentials: true,
  })
);

app.use(cookieParser());

app.get("/", (req, res) => {
  // 쿠키 인자: 1.쿠키 이름, 2.쿠키 값, 3.쿠키 옵션
  res.cookie("test-cookie", "my cookie", {
    maxAge: 10000, // 지속기간
    httpOnly: true, // true설정, 쿠키정보 노출 막기
    secure: true, // true설정. https프로토콜 사용시에만 쿠키 저장
  });
  res.send("쿠키 생성 완료");
});

app.delete("/", (req, res) => {
  // clearCookie : 삭제쿠키명, 삭제할 쿠키 설정 옵션(쿠키수명은 없어도 된다.)
  res.clearCookie("test-cookie", {
    httpOnly: true, // true설정, 쿠키정보 노출 막기
    secure: true, // true설정. https프로토콜 사용시에만 쿠키 저장
  });
  res.send("쿠키 삭제 완료");
});

app.listen(3000, () => console.log("서버 실행"));
