export default function Docs() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">프로젝트 문서</h1>
        
        <div className="grid gap-8">
          {/* 프로젝트 구조 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">프로젝트 구조</h2>
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 font-mono text-sm">
              <pre className="whitespace-pre-wrap">
{`frontend-app/
├── src/
│   ├── app/
│   │   ├── layout.js          # 루트 레이아웃
│   │   ├── page.js            # 홈페이지
│   │   ├── globals.css        # 글로벌 스타일
│   │   ├── about/
│   │   │   └── page.js        # About 페이지
│   │   ├── api-example/
│   │   │   └── page.js        # API 예제 페이지
│   │   ├── books/
│   │   │   ├── page.js        # 책 목록 페이지
│   │   │   └── [id]/
│   │   │       └── page.js    # 책 상세 페이지 (동적 라우팅)
│   │   ├── components/
│   │   │   └── page.js        # 컴포넌트 라이브러리
│   │   └── docs/
│   │       └── page.js        # 문서 페이지
│   └── components/             # 공통 컴포넌트 (향후 추가)
├── public/                     # 정적 파일
├── package.json                # 프로젝트 설정
├── next.config.js             # Next.js 설정
├── tailwind.config.js         # Tailwind CSS 설정
├── postcss.config.js          # PostCSS 설정
└── .gitignore                 # Git 무시 파일`}
              </pre>
            </div>
          </div>

          {/* 개발 가이드라인 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">개발 가이드라인</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">코드 스타일</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300">
                  <li>JavaScript ES6+ 문법 사용</li>
                  <li>함수형 컴포넌트와 React Hooks 사용</li>
                  <li>Tailwind CSS 클래스명은 의미있게 구성</li>
                  <li>한국어 주석과 변수명 사용</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">컴포넌트 설계</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300">
                  <li>단일 책임 원칙 준수</li>
                  <li>Props를 통한 데이터 전달</li>
                  <li>재사용 가능한 컴포넌트 설계</li>
                  <li>TypeScript 도입 고려 (향후)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">상태 관리</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300">
                  <li>로컬 상태는 useState 사용</li>
                  <li>복잡한 상태는 useReducer 고려</li>
                  <li>전역 상태는 Context API 또는 Zustand 고려</li>
                </ul>
              </div>
            </div>
          </div>

          {/* API 통신 가이드 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">API 통신 가이드</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">Axios 설정</h3>
                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 font-mono text-sm">
                  <pre className="whitespace-pre-wrap">
{`// src/lib/axios.js
import axios from 'axios'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 요청 인터셉터
api.interceptors.request.use(
  (config) => {
    // 토큰 추가 등
    return config
  },
  (error) => Promise.reject(error)
)

// 응답 인터셉터
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // 에러 처리
    return Promise.reject(error)
  }
)

export default api`}
                  </pre>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">API 호출 예제</h3>
                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 font-mono text-sm">
                  <pre className="whitespace-pre-wrap">
{`// GET 요청
const getData = async () => {
  try {
    const response = await api.get('/endpoint')
    return response.data
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}

// POST 요청
const createData = async (data) => {
  try {
    const response = await api.post('/endpoint', data)
    return response.data
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}`}
                  </pre>
                </div>
              </div>
            </div>
          </div>

          {/* 배포 가이드 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">배포 가이드</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">빌드 명령어</h3>
                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 font-mono text-sm">
                  <pre className="whitespace-pre-wrap">
{`# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm run start

# 정적 내보내기 (SSG)
next export`}
                  </pre>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">환경 변수</h3>
                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 font-mono text-sm">
                  <pre className="whitespace-pre-wrap">
{`# .env.local
NEXT_PUBLIC_API_URL=https://api.example.com
NEXT_PUBLIC_APP_NAME=Frontend App

# .env.production
NEXT_PUBLIC_API_URL=https://api.production.com`}
                  </pre>
                </div>
              </div>
            </div>
          </div>

          {/* 성능 최적화 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">성능 최적화</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">이미지 최적화</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300">
                  <li>Next.js Image 컴포넌트 사용</li>
                  <li>적절한 이미지 포맷 선택 (WebP, AVIF)</li>
                  <li>지연 로딩 (lazy loading) 적용</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">코드 분할</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300">
                  <li>동적 import 사용</li>
                  <li>React.lazy와 Suspense 활용</li>
                  <li>페이지별 코드 분할</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">캐싱 전략</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300">
                  <li>정적 자산 캐싱</li>
                  <li>API 응답 캐싱</li>
                  <li>Service Worker 활용</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
