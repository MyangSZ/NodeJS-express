## Express.js 서버 만들기

NodeJS를 위한 웹프레임 워크
웹서버 및 API 구축 할 수 있다.

** 2-1 Todo List 변경해보기 **
기존 http모듈로 만든 서버를 express 서버로 변경하기
AXIOS 라이브러리 사용

- axios : HTTP 요청과 응답을 쉽게 처리할 수 있도록 도와주는 JS 라이브러리
  then 두번 붙여 사용하는 방법을 보완
  사용시 요청을 보내고 응답 받는 방법을 더 쉽게 처리할 수 있다.
  클라이언트에서 서버로 요청을 보낼 떄 사용 할 수 있지만,
  서버를 만들어 또 다른 서버에 요청을 보낼 경우에도 편하게 사용할 수 있다.

** 설치 및 사용방법 **

- express 설치
- cors모듈 설치 (cors 설정 쉽게 하기 위해서)
- axios 클라이언트에서 서버로 요청 보내는 부분 사용
  html, js, css 구성 사용시 CDN 사용
  ⭐️ html 파일에 script 형태로 넣기
  ⭐️⭐️ javaScript코드 위에서 불러와야 된다.

** 적용사항 **

- server.js -> express, cors모듈 적용
- todo.js -> axios 사용하기
