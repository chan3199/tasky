# 📝 Tasky - 간단한 할 일 관리 웹 서비스

## 📌 프로젝트 개요

**Tasky**는 간단한 로그인 기능과 할 일 관리 기능을 제공하는 웹 서비스입니다.  
풀스택 웹 개발 과정을 실습하며, Docker, Jenkins, CI/CD, 배포 등 실무에 가까운 인프라 경험을 목표로 합니다.

---

## 🎯 목표 및 목적

- 웹 개발 전반 프로세스를 이해하고 직접 구현해보기
- 로그인 + CRUD 기능을 포함한 기본 풀스택 구조 체험
- Docker + Jenkins 기반의 CI/CD 흐름 실습
- 프론트/백엔드 분리, 자동화 배포 경험

---

## ⚙️ 핵심 기능 (MVP)

- 회원가입 / 로그인 (JWT 인증)
- 할 일 목록 조회 / 추가 / 수정 / 삭제
- 로그아웃 기능

---

## 📄 기능 상세

| 기능        | 설명                                      |
|-------------|-------------------------------------------|
| 회원가입     | 이메일, 비밀번호 입력, 중복 확인 처리         |
| 로그인       | JWT 토큰 발급, 클라이언트 로컬 스토리지 저장    |
| 할 일 추가    | 텍스트 입력 후 저장                          |
| 할 일 수정    | 체크 상태 및 내용 수정 가능                    |
| 할 일 삭제    | 선택 항목 삭제                                |
| 로그아웃     | JWT 제거, 로그인 페이지로 리디렉션             |

---

## 🧩 페이지 구성

- `/signup` – 회원가입 페이지  
- `/login` – 로그인 페이지  
- `/todos` – 할 일 목록 메인 페이지 (로그인 필요)

---

## 👤 사용자 플로우

[회원가입] → [로그인] → [할 일 목록] → [할 일 추가/수정/삭제] → [로그아웃]

---

## 🛠️ 기술 스택

| 구분         | 기술                                      |
|--------------|-------------------------------------------|
| 프론트엔드     | React + TypeScript + Vite                |
| 백엔드        | Node.js + Express                         |
| DB           | SQLite (개발용) → MySQL or RDS (확장 시)   |
| 인증         | JWT                                       |
| 배포 (FE)     | Netlify (GitHub 연동 자동 배포)            |
| 배포 (BE)     | AWS EC2 + Docker + Jenkins                |
| 컨테이너화     | Docker / Docker Compose                   |
| 자동화        | Jenkins + GitHub Webhook                  |

---

## ☁️ 인프라 구성

```plaintext
[개발자]
   ↓ Push
[GitHub]
   ↓ Webhook
[Jenkins on EC2]
   ↓ Docker Build & Run
[Express 백엔드 + SQLite]
[React 프론트엔드 on Netlify]

📁 프로젝트 폴더 구조
📦 tasky
├── client/                # 프론트엔드 (React + Vite + TypeScript)
│   ├── public/
│   ├── src/
│   │   ├── components/    # UI 컴포넌트 모음
│   │   ├── pages/         # 페이지 단위 컴포넌트 (Login, Signup, Todo 등)
│   │   ├── api/           # 백엔드 API 호출 모듈
│   │   ├── hooks/         # 커스텀 훅
│   │   └── main.tsx       # 엔트리 포인트
│   ├── index.html
│   └── vite.config.ts
│
├── server/                # 백엔드 (Node.js + Express)
│   ├── src/
│   │   ├── routes/        # API 라우터
│   │   ├── controllers/   # 요청 처리 로직
│   │   ├── middleware/    # 인증 등 미들웨어
│   │   ├── models/        # DB 모델
│   │   ├── utils/         # 유틸 함수
│   │   └── index.js       # 앱 시작점
│   └── package.json
│
├── docker/
│   ├── client.Dockerfile  # 프론트 Dockerfile
│   ├── server.Dockerfile  # 백엔드 Dockerfile
│   └── nginx.conf         # Nginx 설정 파일 (선택 시)
│
├── docker-compose.yml     # 프론트 + 백엔드 동시에 실행
├── Jenkinsfile            # CI/CD 자동화 스크립트
├── README.md              # 프로젝트 설명서
└── .gitignore
