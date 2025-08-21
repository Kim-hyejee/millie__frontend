export default function About() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">프로젝트 정보</h1>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">프로젝트 개요</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            이 프로젝트는 Next.js 14를 기반으로 한 현대적인 프론트엔드 애플리케이션입니다.
            App Router와 Tailwind CSS를 활용하여 빠르고 반응성 좋은 웹 애플리케이션을 구축했습니다.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-4">기술 스택</h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li>• <strong>프레임워크:</strong> Next.js 14</li>
              <li>• <strong>언어:</strong> JavaScript</li>
              <li>• <strong>스타일링:</strong> Tailwind CSS</li>
              <li>• <strong>HTTP 클라이언트:</strong> Axios</li>
              <li>• <strong>라우팅:</strong> App Router</li>
              <li>• <strong>번들러:</strong> TurboPack</li>
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-4">주요 기능</h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li>• 서버 사이드 렌더링 (SSR)</li>
              <li>• 정적 사이트 생성 (SSG)</li>
              <li>• API 라우트</li>
              <li>• 반응형 디자인</li>
              <li>• 다크 모드 지원</li>
              <li>• 최적화된 이미지 처리</li>
            </ul>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mt-8">
          <h3 className="text-lg font-semibold mb-4">개발 환경</h3>
          <div className="grid md:grid-cols-2 gap-4 text-gray-600 dark:text-gray-300">
            <div>
              <p><strong>OS:</strong> Windows 11</p>
              <p><strong>패키지 매니저:</strong> npm</p>
              <p><strong>개발 서버:</strong> next dev --turbo</p>
            </div>
            <div>
              <p><strong>빌드:</strong> next build</p>
              <p><strong>프로덕션:</strong> next start</p>
              <p><strong>린팅:</strong> next lint</p>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mt-8">
          <h3 className="text-lg font-semibold mb-4 text-blue-800 dark:text-blue-200">시작하기</h3>
          <div className="space-y-2 text-blue-700 dark:text-blue-300">
            <p><strong>1.</strong> 의존성 설치: <code className="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded">npm install</code></p>
            <p><strong>2.</strong> 개발 서버 실행: <code className="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded">npm run dev</code></p>
            <p><strong>3.</strong> 브라우저에서 <code className="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded">http://localhost:3000</code> 접속</p>
          </div>
        </div>
      </div>
    </div>
  )
}
