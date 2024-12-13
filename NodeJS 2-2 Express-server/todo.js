// dom 사용해서 ul과 input에 넣어주기
const todoInput = document.querySelector("input");
const ul = document.querySelector("#todo-list");

// 추가하기 버튼 클릭 에빈트를 넣어 요청 보내기
const createButton = document.querySelector("button");

// 아래 패치를 받아와서 넣어주는 방법을 함수로 나누어서 넣는 방법

// Todo List -> CRUD 기능으로

// Create - 서버에 Todo 추가할 떄
const createTodo = () => {
  const newTodo = todoInput.value;

  // 서버에 포스트로 데이터 전달
  // 첫번쨰 인자: 어디로 요청 보낼지 url, 두번쨰인자 : 보내고 싶은 데이터
  return axios
    .post("http://localhost:3000", newTodo, {
      headers: { "Content-Type": "text/plain" },
    })
    .then((res) => console.log(res.data));
};

// Read - 서버에서 Todo 정보를 가져올 떄
const readTodo = async () => {
  const res = await axios.get("http://localhost:3000");
  return res.data;
};

// Updata - 서버의 Todo 정보를 수정할 떄
const updataTodo = (newTodo) => {
  return axios
    .put("http://localhost:3000", newTodo)
    .then((res) => console.log(res.data));
};

// Delete - 서버의 Todo 정보를 삭제할 때
const deleteTodo = (id) => {
  return axios
    .delete("http://localhost:3000", { data: id })
    .then((res) => console.log(res.data));
};

// 화면에 그리는것
const renderDisplay = (data) => {
  for (let el of data) {
    const list = document.createElement("li");
    list.textContent = el.content;

    // 리스트 수정 및 삭제를 위한
    const updateInput = document.createElement("input");
    const updateButton = document.createElement("button");
    updateButton.textContent = "수정";
    updateButton.onclick = () => {
      // 수정버튼 클릭시
      updataTodo({
        id: el.id,
        content: updateInput.value,
      })
        .then(() => readTodo())
        .then((res) => {
          removeDisplay();
          renderDisplay(res);
        });
    };
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "삭제";
    deleteButton.onclick = () => {
      // 삭제버튼 클릭시
      deleteTodo(el.id)
        .then(() => readTodo())
        .then((res) => {
          removeDisplay();
          renderDisplay(res);
        });
    };

    list.append(updateInput, updateButton, deleteButton);
    ul.append(list);
  }
};

// 화면에 지우는것
const removeDisplay = () => {
  // ul에 자식이 있다면 removeCHild 메서드를 사용해 없애준다.
  while (ul.children.length) {
    ul.removeChild(ul.children[0]);
  }
};

// 화면에 처음 표시 될떄 데이터를 받아와서 ul안에 리스트를 만들어서 넣어준다
// fetch("http://localhost:3000")
//   .then((res) => res.json())
//   .then((res) => {
//     const list = document.createElement("li");
//     list.textContent = res[0].content; // 받아온 데이터를 0번쨰 인덱스에 넣어준다
//     ul.append(list); // ul에 append 시키기
//   });

createButton.addEventListener("click", () => {
  createTodo()
    .then(() => readTodo()) // 프로미스를 받아 추가 후 다시 데이터 받아오기
    .then((res) => {
      removeDisplay(); // 화면에 지우기 한 후
      renderDisplay(res); // 화면에 다시 렌더링
    });
  // 클릭시 fetch메서드를 사용해 서버로 요청 보내고 then으로 콘솔에 결과 확인
  //   fetch("http://localhost:3000")
  //     .then((res) => res.json()) // json 형태를 받아오도록 한다.
  //     .then((res) => console.log(res))
});

readTodo().then((res) => renderDisplay(res));
