### OAuth 실습하기

- 흐름 알기!

#### 카카오 로그인 만들기 (카카오 OAuth 사용) [캡터 3-4]

- 카카오 디벨로퍼스를 통해 설정
- 로그인 후, 내 에플리케이션 -> 소셜로그인 서버 등록
- 소셜 로그인 서버와 로컬 서버 동일하게 지정을 해야 된다 (오류 발생 할 수 있음)

**필수항목 작성하기**

- 인가코드 받기
  Client_id: 받아온 카카오 클라이언트 아이디
  redirect_uri: redirectURI(소셜로그인 등록서버)
  response_type: code 고정
- 토큰 받기(인가코드로 토큰 발급 요청)
  헤더: Content-Type
  본문: grant_type, client_id, redirect_rui, code
- 사용자 정보받기
  헤더: Authorisation, Content-Type

### .then 알아두기

```
.then() - .(dot)이전 실행문 성공(완료) 시 괄호 안의 값을 실행 = .then(실행문:함수)
.then((매개변수)=> {실행문}) - .(dot)이전 실행문에 대한 반환값(매개변수) =>
 실행문 성공 시 다음으로 진행
```
