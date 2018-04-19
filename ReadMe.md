# Node.js 기반의 REST API 서버 구성

### 기본 개념
	NodeJS의 기초
    - 브라우저 밖에서 JS코드 실행 가능
    - 크롬에서 사용하는 V8 엔진 (내부 C++)
    - 이벤트 기반의 비동기 I/O Framework
    	>> EventLoop ~~ Non-blocking Worker 
    	>> DB조회 / Network / IO 등 기다려야 하는 Job이 무거운 것
    - CommonJS를 구현한 모듈 시스템 (Java의 API 같은 것)
    	>> 기본 모듈 (ex> HTTP,util, ...)
    	>> 써드파티 모듈 (ex> ExpressJS, ...)
    	>> 사용자 정의 모듈 (module.exports='~')

#### ==동기 VS 비동기==
NodeJS는 기본적으로 ++비동기++로 동작함
ex> 
	- readFileSync()
    - readFile()

#### ==ExpressJS==
	- 어플리케이션
		1. 익스프레스 인스턴스
		2. 서버에 필요한 기능은 미들웨어를 어플리케이션에 추가
		3. 라우팅 설정 가능
		4. 서버를 요청 대기 상태로 만들 수 있음 
	- 미들웨어
		1. 함수의 연속
		2. 써드파티 미들웨어
		3. 일반 미들웨어 VS 에러 미들웨어
	- 라우팅
		1. 요청 URL에 대해 적절한 핸들러 함수로 연결해주는 기능
		2. get(), post() 함수로 구현 가능
		3. 라우팅을 위한 전용 Router 클래스 사용 가능
	- 요청/응답 객체
		1. 클라이언트 요청/응답 정보를 담은 객체(Request)(Response)
		2. http모듈의 requrest/response 객체를 Wrapping 한 것
		3. req.params(), req.query(), req.body() 메서드를 주로 사용
		4. res.send(), res.status(), res.json() 메서드를 주로 사용

#### ==REST API==
	- HTTP Requrest
		1. 모든 자원은 명사로 식별
		2. HTTP 경로로 자원을 요청
	- HTTP Method
		GET : 조회
        POST : 생성
        PUT : 갱신
        DELETE : 삭제
	- HTTP Status Code
		1XX : ing...
        2XX : response
        	200 -> Success (GET,PUT)
            201 -> Created (POST)
            204 -> No Content (DELETE)
        3XX : 리다이렉트 관련 ( 보내버리기 )
        4XX : Client Error
        	400 -> Bad Request 잘못된 요청
            401 -> Unauthorized 권한 없음
            404 -> Not Found 찾을 수 없음
            409 -> Conflict 충돌
        5XX : Server Error
        	500 -> Internal Server Error

#### ==방법론 : TDD==
    - 사용 라이브러리
    	mocha, should, superTest

    