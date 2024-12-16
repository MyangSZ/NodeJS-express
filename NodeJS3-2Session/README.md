## Node.js & Express

### Session

- 로그인 실습
- Session 사용하기

- 로그인 페이지를 활용하여 로그인, 로그아웃으로 화면 구성 바꿔보기
- 로그인, 로그아웃으로 유저정보 전달, 저장, 확인 하기

### session 모듈 연결

```
app.use(
  session({
    secret: "session secret", // 암호화를 할때 열쇠 역할을 하는 임의의 문자열
    resave: false, // 내뇽의 변화가 없어도 다시 저장할지 여부
    saveUninitialized: false, // 빈 내용일때 저장할지 여부
    name: "session_id", // 쿠키이름 지정하기
  })
);
```
