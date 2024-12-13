// express 프레임 워크 사용하기
const express = require("express");
const cors = require("cors");

// todo정보 관리
let todo = [
  { id: 1, content: "더미데이터" },
  { id: 2, content: "덤덤덤" },
];

// 서버 생성
const app = express();
// cors모듈 설정 (Header로 작성한 부분을 바꿔준다)
app.use(
  cors({
    // 객체를 만들어서 옵션 작성
    origin: "http://127.0.0.1:5500",
    method: ["OPTION", "GET", "POST", "PUT", "DELETE"],
  })
);
// json형태로 바꿔주어야 하는 번거로움을 해결
app.use(express.json());
app.use(express.text());

app.options("/", (req, res) => {
  return res.send("요청보내기");
});
app.get("/", (req, res) => {
  return res.json(todo);
});

app.post("/", (req, res) => {
  console.log(req.body);
  const newTodo = { id: Number(new Date()), content: req.body };
  todo.push(newTodo); //todo 배열에 새롭게 추가 하기

  return res.send("새로운 Todo가 추가되었습니다.");
});

app.put("/", (req, res) => {
  todo = todo.map((el) => {
    if (el.id === req.body.id) {
      return req.body;
    } else {
      return el;
    }
  });

  return res.send("새로운 Todo가 수정되었습니다.");
});

app.delete("/", (req, res) => {
  const id = Number(req.body);
  todo = todo.filter((el) => el.id != id);

  return res.send("새로운 Todo가 삭제되었습니다.");
});

// 서버 실행 포트 설정하기
app.listen(3000, () => {
  console.log("서버가 열렸어요!");
});
