const form = document.querySelector("form");
const idInput = document.querySelector("#user_id");
const passwordInput = document.querySelector("#user_password");
const loginButton = document.querySelector("#login_button");

const main = document.querySelector("main");
const userName = document.querySelector("#user_name");
const userInfo = document.querySelector("#user_info");
// 로그아웃 버튼
const logoutButton = document.querySelector("#logout_button");

// 쿠키 저장하고 쓰기 위해 필요한 설정
axios.defaults.withCredentials = true;
let accessToken = "";

// form의 기본적 이벤트 submit이벤트 막기
form.addEventListener("submit", (e) => e.preventDefault());

// 로그인 요청을 하여 쿠키까지 생성
function login() {
  const userId = idInput.value;
  const userPassword = passwordInput.value;

  return axios
    .post("http://localhost:3000", { userId, userPassword })
    .then((res) => (accessToken = res.data));
}

function logout() {
  accessToken = "";
}

// user 정보 받아오기
// header을 통해서 토큰 전달. 정해진 사용방식!
function getUserInfo() {
  return axios.get("http://localhost:3000", {
    headers: { Authorisation: `Bearer ${accessToken}` },
  });
}

// 로그인시 유저정보 화면에 보여주기
function renderUserInfo(user) {
  main.style.display = "block";
  form.style.display = "none";
  userName.textContent = user.user_name;
  userInfo.textContent = user.user_info;
}

// 로그아웃 시 로그인 폼으로 변경하기
function renderloginForm(user) {
  main.style.display = "none";
  form.style.display = "grid";
  userName.textContent = "";
  userInfo.textContent = "";
}

// 로그인 시 유저정보 화면으로 실행
loginButton.onclick = () => {
  login()
    .then(() => getUserInfo())
    .then((res) => renderUserInfo(res.data)); // 유저정보 표시
};

// 로그아웃 시 로그인 폼으로 실행
logoutButton.onclick = () => {
  logout();
  renderloginForm();
};
