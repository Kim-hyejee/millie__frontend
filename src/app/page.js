'use client'

import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* 헤더 */}
      <header className="bg-white bg-opacity-90 backdrop-blur-sm shadow-sm">
        <div className="pl-16 sm:pl-24 lg:pl-32 pr-16 sm:pr-24 lg:pr-32 h-20">
          <div className="flex items-center justify-between h-full">
            <h1 className="text-2xl font-bold text-gray-900">밀리의 서재</h1>
            <div className="flex items-center space-x-4">
              <Link href="/search" className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium">
                🔍 검색
              </Link>
              <Link href="/library" className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium">
                📚 내 서재
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 - 카드 형식으로 변경 */}
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] px-8">
        <div className="bg-gradient-to-r from-orange-200 to-orange-100 rounded-3xl shadow-xl border border-orange-200 p-8 max-w-4xl w-full">
          <div className="flex items-center justify-between">
            {/* 왼쪽: 메인 텍스트 */}
            <div className="flex-1 pr-6">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800" style={{ lineHeight: '1.6' }}>
                <span className="text-gray-800">독서와<br />
                무제한 친해지리,</span><br />
                <span className="text-orange-600">밀리의 서재</span>
              </h2>
            </div>
            
            {/* 오른쪽: 이미지들 */}
            <div className="flex-1 flex justify-end pl-6">
              {/* 두 권의 책을 겹치게 배치 */}
              <div className="relative">
                {/* 뒤쪽 책 (새로운 책) */}
                <img
                  src="https://contents.kyobobook.co.kr/sih/fit-in/400x0/pdt/9781408855652.jpg"
                  alt="새로운 책 이미지"
                  className="max-w-xs w-full h-auto rounded-lg shadow-lg transform rotate-3 translate-x-2"
                />
                {/* 앞쪽 책 (어린왕자) */}
                <img
                  src="https://contents.kyobobook.co.kr/sih/fit-in/400x0/pdt/9791187192596.jpg"
                  alt="밀리의 서재 이미지"
                  className="max-w-xs w-full h-auto rounded-lg shadow-lg absolute top-0 left-0 transform -rotate-2 -translate-x-2"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
