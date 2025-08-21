# Frontend App

Next.js 14 기반의 현대적인 프론트엔드 애플리케이션입니다.

## 🚀 기술 스택

- **프레임워크**: Next.js 14
- **언어**: JavaScript
- **스타일링**: Tailwind CSS
- **HTTP 클라이언트**: Axios
- **라우팅**: App Router
- **번들러**: TurboPack
- **패키지 매니저**: npm

## ✨ 주요 기능

- 🎨 반응형 디자인
- 🌙 다크 모드 지원
- 📱 모바일 최적화
- ⚡ 빠른 개발 환경 (TurboPack)
- 🔄 API 통신 예제
- 🧩 재사용 가능한 컴포넌트
- 📚 상세한 문서화

## 🏗️ 프로젝트 구조

```
frontend-app/
├── src/
│   ├── app/                    # App Router 페이지들
│   │   ├── layout.js          # 루트 레이아웃
│   │   ├── page.js            # 홈페이지
│   │   ├── globals.css        # 글로벌 스타일
│   │   ├── about/             # About 페이지
│   │   ├── api-example/       # API 예제 페이지
│   │   ├── components/        # 컴포넌트 라이브러리
│   │   └── docs/              # 문서 페이지
│   └── components/             # 공통 컴포넌트
├── public/                     # 정적 파일
├── package.json                # 프로젝트 설정
├── next.config.js             # Next.js 설정
├── tailwind.config.js         # Tailwind CSS 설정
└── postcss.config.js          # PostCSS 설정
```

## 🚀 시작하기

### 필수 요구사항

- Node.js 18.17.0 이상
- npm 9.0.0 이상

### 설치 및 실행

1. **의존성 설치**
   ```bash
   npm install
   ```

2. **개발 서버 실행**
   ```bash
   npm run dev
   ```

3. **브라우저에서 확인**
   ```
   http://localhost:3000
   ```

### 사용 가능한 스크립트

```bash
# 개발 서버 실행 (TurboPack 사용)
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm run start

# 코드 린팅
npm run lint
```

## 📱 페이지 구성

- **홈페이지** (`/`): 메인 페이지 및 네비게이션
- **About** (`/about`): 프로젝트 정보 및 기술 스택
- **API Example** (`/api-example`): Axios를 사용한 API 통신 예제
- **Books** (`/books`): 도서관 책 목록 (REST API 연동)
- **Book Detail** (`/books/[id]`): 개별 책 상세 정보 (동적 라우팅)
- **Components** (`/components`): 재사용 가능한 컴포넌트 라이브러리
- **Docs** (`/docs`): 프로젝트 문서 및 가이드라인

## 🎨 컴포넌트 라이브러리

프로젝트에는 다음과 같은 재사용 가능한 컴포넌트들이 포함되어 있습니다:

- **Button**: 다양한 variant와 size를 지원하는 버튼 컴포넌트
- **Card**: 제목과 내용을 포함한 카드 레이아웃
- **Input**: 라벨과 에러 메시지를 지원하는 입력 필드
- **Modal**: 모달 다이얼로그 컴포넌트

## 🔌 API 통신

Axios를 사용한 API 통신 예제가 포함되어 있습니다:

- GET 요청을 통한 데이터 조회
- POST 요청을 통한 데이터 생성
- 에러 처리 및 로딩 상태 관리

## 🎯 개발 가이드라인

### 코드 스타일
- JavaScript ES6+ 문법 사용
- 함수형 컴포넌트와 React Hooks 사용
- Tailwind CSS 클래스명은 의미있게 구성
- 한국어 주석과 변수명 사용

### 컴포넌트 설계
- 단일 책임 원칙 준수
- Props를 통한 데이터 전달
- 재사용 가능한 컴포넌트 설계

## 🚀 배포

### 빌드
```bash
npm run build
```

### 정적 내보내기 (SSG)
```bash
npm run build
npm run export
```

### 환경 변수
`.env.local` 파일을 생성하여 환경 변수를 설정할 수 있습니다:

```env
NEXT_PUBLIC_API_URL=https://api.example.com
NEXT_PUBLIC_APP_NAME=Frontend App
```

## 🔧 설정 파일

### Next.js 설정 (`next.config.js`)
- TurboPack 활성화
- SVG 파일 처리 설정

### Tailwind CSS 설정 (`tailwind.config.js`)
- 소스 파일 경로 설정
- 커스텀 색상 변수
- 다크 모드 지원

### PostCSS 설정 (`postcss.config.js`)
- Tailwind CSS 플러그인
- Autoprefixer 플러그인

## 📚 추가 리소스

- [Next.js 공식 문서](https://nextjs.org/docs)
- [Tailwind CSS 공식 문서](https://tailwindcss.com/docs)
- [Axios 공식 문서](https://axios-http.com/)
- [React 공식 문서](https://react.dev/)

## 🤝 기여하기

1. 이 저장소를 포크합니다
2. 새로운 기능 브랜치를 생성합니다 (`git checkout -b feature/amazing-feature`)
3. 변경사항을 커밋합니다 (`git commit -m 'Add some amazing feature'`)
4. 브랜치에 푸시합니다 (`git push origin feature/amazing-feature`)
5. Pull Request를 생성합니다

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 📞 문의

프로젝트에 대한 문의사항이 있으시면 이슈를 생성해 주세요.

---

**Happy Coding! 🎉**
