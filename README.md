# 🏆 INTRAMURAL LEAGUE

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-F7DF1E?logo=javascript)

> **한림대학교 교내 스포츠 리그를 한 곳에서 확인하고 즐길 수 있는 웹 서비스**

경기 일정, 팀 정보, 순위, 승부 예측, 응원 게시판 등을 제공하여 학생들이 교내 스포츠 리그를 더욱 쉽고 재미있게 즐길 수 있도록 제작한 **React 기반 SPA**입니다.

---

# 📌 프로젝트 개요

| 항목 | 내용 |
|------|------|
| **프로젝트명** | INTRAMURAL LEAGUE |
| **진행 형태** | 팀 프로젝트 |
| **개발 기간** | 2025.06.30 ~ 2025.07.31 |
| **담당 역할** | 메인 페이지, 경기 일정, 공지사항, 응원톡 기능 및 UI 구현 |
| **목표** | 교내 스포츠 리그 정보를 한 곳에서 제공하는 웹 서비스 개발 |

---

# 🎯 서비스 목표

학교에서 매년 개최되는 스포츠 리그는 공식 홈페이지가 장기간 업데이트되지 않아 경기 일정, 순위, 공지사항 등 주요 정보를 확인하기 어려웠습니다.

이를 해결하기 위해 학생들이 리그 정보를 한눈에 확인하고 보다 편리하게 참여할 수 있는 웹 서비스를 구현했습니다.

---

# ✨ 주요 기능

## 🏠 메인 페이지

- 오늘의 경기 조회
- 종목별 순위 조회
- 공지사항 미리보기
- 승부 예측

---

## 👥 팀 소개

- 종목별 팀 조회
- 팀 상세 정보
- 경기 결과 확인

---

## 📅 경기 일정

- 월별 경기 일정
- 종목별 일정 조회

---

## 📢 응원톡

- 응원 게시글 조회
- 응원글 작성

---

## 📄 공지사항

- 공지사항 조회
- 더보기 기능

---

## 🔐 회원

- 로그인
- 회원가입

---

# 🛠 Tech Stack

### Front-End

- React
- Vite
- React Router

### Language

- JavaScript

### Styling

- CSS3

### Library

- ColorThief

---

# 📂 프로젝트 구조

```text
src
├── assets
├── components
├── data
├── pages
├── styles
├── App.jsx
└── main.jsx
```

---

# 💡 주요 구현 내용

## 1️⃣ React Router 기반 SPA 구현

페이지 전환 시 새로고침 없이

- 메인
- 팀 소개
- 경기 일정
- 공지사항
- 응원톡
- 로그인

을 자연스럽게 이동할 수 있도록 구성했습니다.

---

## 2️⃣ ColorThief를 활용한 팀별 동적 UI

각 팀의 로고 이미지에서 대표 색상을 추출하여

- Team Card
- Prediction Bar

등의 UI 색상에 자동으로 적용했습니다.

이를 통해 팀마다 고유한 아이덴티티를 시각적으로 표현했습니다.

---

## 3️⃣ 종목별 데이터 관리

종목별로

- 팀
- 경기 일정
- 순위
- 경기 결과

데이터를 분리하여 관리하였으며,

사용자가 종목을 변경하면 해당 데이터만 동적으로 렌더링되도록 구현했습니다.

---

## 4️⃣ 사용자 경험(UI/UX) 개선

다음 기능을 구현하여 사용자 편의성을 높였습니다.

- 공지사항 더보기
- 응원글 더보기
- 월 이동 캘린더
- 비밀번호 표시/숨기기

---

# 🚀 실행 방법

```bash
cd first
npm install
npm run dev
```

---

# 🚀 향후 개선 사항

- Backend 및 Database 연동을 통한 데이터 관리
- 관리자 페이지를 통한 경기 일정 및 공지 관리
- 사용자 로그인 및 권한 관리
- 모바일 반응형 UI 개선
- 실제 학교 스포츠 리그 데이터 연동

---

# 📄 License

본 프로젝트는 학습 및 팀 프로젝트를 목적으로 제작되었습니다.
