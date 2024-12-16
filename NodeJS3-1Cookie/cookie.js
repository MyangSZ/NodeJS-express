const setCookieButton = document.querySelector("#set_cookie");
const deleteCookieButton = document.querySelector("#delete_cookie");

// 엑시오를 통해 쿠키 설정
// 클라이언트에서도 credentials 정보를 주고받을 수 있또록 설정
// 설정 해주지 않으면 쿠키를 주고 받을 수 없다.
axios.defaults.withCredentials = true;

setCookieButton.onclick = () => {
  axios.get("http://localhost:3000").then((res) => console.log(res));
};

deleteCookieButton.onclick = () => {
  axios.delete("http://localhost:3000").then((res) => console.log(res));
};
