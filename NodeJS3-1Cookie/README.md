## Node.js & Express

---

### Cookie

쿠키 사용 알아보기
쿠키 옵션 설정 해보기

### 알아가기

쿠키 내용을 읽어오기 위한 모듈 설치 : npm i cookie-parser

```
app.delete("/", (req, res) => {
  // 쿠키 인자: 1.쿠키 이름, 2.쿠키 값, 3.쿠키 옵션
  res.cookie("test-cookie", "my cookie", {
    maxAge: 10000, // 지속기간
    httpOnly: true, // true설정, 쿠키정보 노출 막기
    secure: true, // true설정. https프로토콜 사용시에만 쿠키 저장
  });
  res.send("쿠키 생성 완료");
});
```

```
app.delete("/", (req, res) => {
  // clearCookie : 삭제쿠키명, 삭제할 쿠키 설정 옵션(쿠키수명은 없어도 된다.)
  res.clearCookie("test-cookie", {
    httpOnly: true, // true설정, 쿠키정보 노출 막기
    secure: true, // true설정. https프로토콜 사용시에만 쿠키 저장
  });
  res.send("쿠키 삭제 완료");
});
```
