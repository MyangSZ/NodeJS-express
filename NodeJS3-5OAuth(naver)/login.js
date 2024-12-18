// html  요소 가져오기
const kakaoLoginButton = document.querySelector("#kakao");
const naverLoginButton = document.querySelector("#naver");
const userImage = document.querySelector("img");
const userName = document.querySelector("#user_name");
const logoutButton = document.querySelector("#logout_button");

// 로그아웃 구분을 위해
// 로그인 구분 변수
let currentOAuthService = "";

// userImage, userName 값을 바꿔주는 함수 만들기
function renderUserInfo(imgUrl, name) {
  (userImage.src = imgUrl), (userName.textContent = name);
}

// kakao appKey(ClientID)
const kakaoClientId = "4e14555de87ba17f596dc7e49ced6a42";
const redirectURI = "http://127.0.0.1:5500/NodeJS3-5OAuth(naver)/index.html";

// 이중 사용을 줄이기 위해(로그아웃에 재사용 위해) accessToken 변수로 만들어서 사용하기
let kakaoAccessToken = "";

// namver clientID
const naverClientId = "TDtK5xCdEn6CUhxsV1NH";
const naverClientSecret = "vDHMB_hvIu"; // 고유번호이기때문에 안보이도록 사용한다!
const naverSecret = "it_is_me";
let naverAccessToken = "";

// kakao button login
// 카카오로그인 버튼 클릭 시
kakaoLoginButton.onclick = () => {
  // 인가코드 받기
  // Client_id: 받아온 카카오 클라이언트 아이디
  // redirect_uri: redirectURI(소셜 로그인 등록 서버주소)
  // response_type: code 고정
  // 카카오 동의 후 OAuth 코드 받아오기
  location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoClientId}&redirect_uri=${redirectURI}&response_type=code`;
};

// nvaer 로그인 버튼 클릭 시
naverLoginButton.onclick = () => {
  location.href = `https://nid.naver.com/oauth2.0/authorize?client_id=${naverClientId}&response_type=code&redirect_uri=${redirectURI}&state=${naverSecret}`;
  // state: 네이버에서 요청하는 값. 클라이언트와의 소통을 확인하는 임의의 값
};

// 페이지에 처음 접근 했을 때 붙은 코드를 받아와서 보내기
window.onload = () => {
  // 코드 받아오기
  const url = new URL(location.href);
  const urlParams = url.searchParams;
  // 코드를 가져오기
  const authorizationCode = urlParams.get("code");
  // 네이버 코드를 받아올 때 state도 받아와야 한다.
  const naverState = urlParams.get("state");

  // authorizationCode값이 들어왔는지 확인 후,
  if (authorizationCode) {
    // 만약 네이버 state값이 있으면 네이버 로그인으로
    if (naverState) {
      axios
        .post("http://localhost:3000/naver/login", { authorizationCode })
        .then((res) => {
          naverAccessToken = res.data;
          return axios
            .post("http://localhost:3000/naver/userinfo", {
              naverAccessToken,
            })
            .then((res) => {
              renderUserInfo(res.data.profile_image, res.data.name);
              currentOAuthService = "naver";
            });
        });
    } else {
      // 값이 없다면 카카오 로그인 프로세스 시작
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
        .then((res) => {
          renderUserInfo(res.data.profile_image, res.data.nickname);
          currentOAuthService = "kakao";
        });
    }
  }
};

// .then() - .(dot)이전 실행문 성공(완료) 시 괄호 안의 값을 실행 = .then(실행문:함수)
// .then((매개변수)=> {실행문}) - .(dot)이전 실행문에 대한 반환값(매개변수) =>
// 실행문 성공 시 다음으로 진행

// logout
logoutButton.onclick = () => {
  if (currentOAuthService === "kakao") {
    axios
      .delete("http://localhost:3000/kakao/logout", {
        data: { kakaoAccessToken },
      })
      .then((res) => console.log(res.data)); // 로그아웃 성공시 콘솔 내용보여주기
    renderUserInfo("", ""); // 유저정보 없애주기
  } else if (currentOAuthService === "naver") {
    axios
      .delete("http://localhost:3000/naver/logout", {
        data: { naverAccessToken },
      })
      .then((res) => console.log(res.data)); // 로그아웃 성공시 콘솔 내용보여주기
    renderUserInfo("", ""); // 유저정보 없애주기
  }
};
