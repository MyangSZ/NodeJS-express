## Node.js & Express

### Token

- Token 사용방법
- Token을 header을 사용하는 방법

- 로그인 페이지를 활용하여 로그인, 로그아웃으로 화면 구성 바꿔보기
- 로그인, 로그아웃으로 유저정보 전달, 저장, 확인 하기

### Token 사용 알아두기

- 토큰 자체로 인증 상태 증명 가능(클라이언트에 인증 정보저장)
- 인증 정보를 클라이언트에 저장해 서버 부하를 줄여준다.
- 토큰 탈취 당하면 무효화가 어렵다.

- 토큰 사용 시 만들고 검증할 떄 필요한 시크릿 키 필요(열쇠역할)
- 토큰 sign 전달인자 : payload, secretkey, option
- option (expiresIn: 토큰 유효기간 설정)

### header을 통해 토큰 전달시 정해진 사용방식 이용하기

```
 {headers: { Authorisation: `Bearer ${accessToken}` }}
```
