// html  요소 가져오기
const kakaoLoginButton = document.querySelector("#kakao");
const naverLoginButton = document.querySelector("#naver");
const userImage = document.querySelector("img");
const userName = document.querySelector("#user_name");
const logoutButton = document.querySelector("#logout_button");

// userImage, userName 값을 바꿔주는 함수 만들기
function renderUserInfo(imgUrl, name) {
  (userImage.src = imgUrl), (userName.textContent = name);
}

// kakao button login

// kakao appKey(ClientID)
const kakaoClientId = "8a7cbf3c202dc79b718e3cf964167cf1";
const redirectURI = "http://127.0.0.1:5500/NodeJS3-4OAuth/index.html";

// 이중 사용을 줄이기 위해(로그아웃에 재사용 위해) accessToken 변수로 만들어서 사용하기
let kakaoAccessToken = "";

kakaoLoginButton.onclick = () => {
  // 인가코드 받기
  // Client_id: 받아온 카카오 클라이언트 아이디
  // redirect_uri: redirectURI(소셜 로그인 등록 서버주소)
  // response_type: code 고정
  // 카카오 동의 후 OAuth 코드 받아오기
  location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoClientId}&redirect_uri=${redirectURI}&response_type=code`;
};

// 페이지에 처음 접근 했을 때 붙은 코드를 받아와서 보내기
window.onload = () => {
  // 코드 받아오기
  const url = new URL(location.href);
  const urlParams = url.searchParams;
  // 코드를 가져오기
  const authorizationCode = urlParams.get("code");

  // 받아온 코드를 서버로 보내주기 (POST로 보내주기)
  // 열어둔 서버에 엔드 포인트를 작성, 데이터 객체형태로 넣어주기
  axios
    .post("http://localhost:3000/kakao/login", { authorizationCode })
    .then((res) => {
      // 받아온 토큰을 담아서 서버에 요청을 보내서 서버에서 토큰을 받아서 ResourceServer로 요청 보내기
      // access_token변수에 담아준다.
      kakaoAccessToken = res.data;
      //   const accessToken = res.data;
      // 서버에 요청 보내기(토큰을 보내 사용자 정보 받아오기)
      return axios.post("http://localhost:3000/kakao/userinfo", {
        kakaoAccessToken,
      });
    })
    // 데이터 정보 잘 들어오는지 확인
    // .then((res) => console.log(res.data));
    .then((res) => renderUserInfo(res.data.profile_image, res.data.nickname));
};

// .then() - .(dot)이전 실행문 성공(완료) 시 괄호 안의 값을 실행 = .then(실행문:함수)
// .then((매개변수)=> {실행문}) - .(dot)이전 실행문에 대한 반환값(매개변수) =>
// 실행문 성공 시 다음으로 진행

// logout
logoutButton.onclick = () => {
  axios
    .delete("http://localhost:3000/kakao/logout", {
      data: { kakaoAccessToken },
    })
    .then((res) => console.log(res.data)); // 로그아웃 성공시 콘솔 내용보여주기
  renderUserInfo("", ""); // 유저정보 없애주기
};
