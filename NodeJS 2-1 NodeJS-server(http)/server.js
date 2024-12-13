// nodejs가 http모듈 내장하고 있다.
// 내장되어 있는 http 모듈 가져오기
const http = require("http");

// todo정보 관리
let todo = [
  { id: 1, content: "더미데이터" },
  { id: 2, content: "덤덤덤" },
];

// 서버 생성
// createServer : 함수를 인자로 받아서 서버생성
// 전달인자 : req(요청 들어온 값 확인하는 인자), res(요청 처리해서 응답을 보내줄지) 받는다
const server = http.createServer((req, res) => {
  console.log(req.method + "요청이 들어왔음요");

  // 서버 Cors 설정하기
  // 클라이언트와 서버가 소통이 되도록 서버 맞춰주기
  res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTION, GET, POST, PUT, DELETE"
  );

  // Cors는 기본적으로 preflight 요청을 보낸다
  // preflight 요청 처리하기 (정해진 사용방법)
  if (req.method === "OPTIONS") {
    return res.end("요청 보내기");
  }

  // get 요청이 들어 왔을 때 정보 보내주기
  // 문자열 형태로 보내기 (JSON.stringify)메서드 사용 제이슨 형태의 문자열로 바꿔서 보내기
  if (req.method === "GET") {
    return res.end(JSON.stringify(todo));
  }

  if (req.method === "POST") {
    let data; // 데이터 담을 공간 만들기
    req.on("data", (chunk) => {
      // 데이터가 들어오면 chunk(부분부분 받아오기)
      data = chunk.toString(); // 데이터를 스트링으로 바꾸것을 넣어준다.
    });
    req.on("end", () => {
      const newTodo = { id: Number(new Date()), content: data };
      todo.push(newTodo); //todo 배열에 새롭게 추가 하기
    });
    return res.end("새로운 Todo가 추가되었습니다.");
  }

  if (req.method === "PUT") {
    let data;
    req.on("data", (chunk) => {
      data = chunk.toString();
    });
    req.on("end", () => {
      const newTodo = JSON.parse(data);
      todo = todo.map((el) => {
        if (el.id === newTodo.id) {
          return newTodo;
        } else {
          return el;
        }
      });
    });
    return res.end("새로운 Todo가 수정되었습니다.");
  }

  if (req.method === "DELETE") {
    let data;
    req.on("data", (chunk) => {
      data = chunk.toString();
    });
    req.on("end", () => {
      const id = Number(data);
      todo = todo.filter((el) => el.id != id);
    });
    return res.end("새로운 Todo가 삭제되었습니다.");
  }

  // end를 여러번 만나면 안된다.
  // 응답은 한번만 보내야 된다. 응답은 한번만 받도록 앞에 return을 붙여준다.
  return res.end("end");

  //   // 한국어를 표시할 수 있도록 인코딩하기
  //   res.setHeader("Content-Type", "text/plain; charset=utf-8");
  //   res.end("하이하이하이"); // end 응답 내보낼때 쓰는 메서드
});

// 서버 실행 포트 설정하기
server.listen(3000, () => {
  console.log("서버가 열렸어요!");
});
