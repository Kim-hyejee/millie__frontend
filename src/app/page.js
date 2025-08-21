'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Home() {
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showSignupModal, setShowSignupModal] = useState(false)
  const [isLoginMode, setIsLoginMode] = useState(true)

  const openLoginModal = () => {
    setIsLoginMode(true)
    setShowLoginModal(true)
  }

  const openSignupModal = () => {
    setIsLoginMode(false)
    setShowSignupModal(true)
  }

  const closeModal = () => {
    setShowLoginModal(false)
    setShowSignupModal(false)
  }

  const switchToSignup = () => {
    setIsLoginMode(false)
  }

  const switchToLogin = () => {
    setIsLoginMode(true)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-yellow-100 via-yellow-200 via-purple-200 to-purple-600">
      {/* 헤더 */}
      <header className="bg-white bg-opacity-90 backdrop-blur-sm shadow-sm">
        <div className="pl-16 sm:pl-24 lg:pl-32 pr-16 sm:pr-24 lg:pr-32">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">밀리의 서재</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={openLoginModal}
                className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium"
              >
                로그인
              </button>
              <button
                onClick={openSignupModal}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
              >
                회원가입
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 - 텍스트와 이미지를 좌우로 배치 */}
      <div className="flex items-center justify-between min-h-[calc(100vh-4rem)] pl-32 sm:pl-40 lg:pl-48 pr-90 sm:pr-48 lg:pr-56">
        {/* 왼쪽: 메인 텍스트 */}
        <div className="flex-1 pr-4 sm:pr-6 lg:pr-8">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold drop-shadow-lg" style={{ lineHeight: '1.7' }}>
            <span className="text-black">독서와<br />
            무제한 친해지리,</span><br />
            <span className="text-orange-500">밀리의 서재</span>
          </h2>
        </div>
        
        {/* 오른쪽: 이미지들 */}
        <div className="flex-1 flex justify-end pl-4 sm:pl-6 lg:pl-8">
          {/* 두 권의 책을 겹치게 배치 */}
          <div className="relative">
            {/* 뒤쪽 책 (새로운 책) */}
            <img
              src="https://contents.kyobobook.co.kr/sih/fit-in/400x0/pdt/9781408855652.jpg"
              alt="새로운 책 이미지"
              className="max-w-md w-full h-auto rounded-lg shadow-lg transform rotate-3 translate-x-2"
            />
            {/* <img
              src="https://image.yes24.com/goods/115156480/XL"
              alt="새로운 책 이미지"
              className="max-w-md w-full h-auto rounded-lg shadow-lg transform rotate-3 translate-x-2"
            /> */}
            {/* 앞쪽 책 (어린왕자) */}
            <img
              src="https://contents.kyobobook.co.kr/sih/fit-in/400x0/pdt/9791187192596.jpg"
              alt="밀리의 서재 이미지"
              className="max-w-md w-full h-auto rounded-lg shadow-lg absolute top-0 left-0 transform -rotate-2 -translate-x-2"
            />
          </div>
        </div>
      </div>

      {/* 로그인/회원가입 모달 */}
      {(showLoginModal || showSignupModal) && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" onClick={closeModal}>
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">
                    {isLoginMode ? '로그인' : '회원가입'}
                  </h3>
                  <button
                    onClick={closeModal}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {isLoginMode ? (
                  // 로그인 폼
                  <form className="space-y-4">
                    <div>
                      <label htmlFor="login-email" className="block text-sm font-medium text-gray-700 mb-1">
                        이메일
                      </label>
                      <input
                        type="email"
                        id="login-email"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="이메일을 입력하세요"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="login-password" className="block text-sm font-medium text-gray-700 mb-1">
                        비밀번호
                      </label>
                      <input
                        type="password"
                        id="login-password"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="비밀번호를 입력하세요"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 font-medium"
                    >
                      로그인
                    </button>
                    <div className="text-center">
                      <button
                        type="button"
                        onClick={switchToSignup}
                        className="text-sm text-blue-600 hover:text-blue-800"
                      >
                        계정이 없으신가요? 회원가입
                      </button>
                    </div>
                  </form>
                ) : (
                  // 회원가입 폼
                  <form className="space-y-4">
                    <div>
                      <label htmlFor="signup-username" className="block text-sm font-medium text-gray-700 mb-1">
                        사용자 이름 *
                      </label>
                      <input
                        type="text"
                        id="signup-username"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="사용자 이름을 입력하세요"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="signup-email" className="block text-sm font-medium text-gray-700 mb-1">
                        이메일 *
                      </label>
                      <input
                        type="email"
                        id="signup-email"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="이메일을 입력하세요"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="signup-password" className="block text-sm font-medium text-gray-700 mb-1">
                        비밀번호 *
                      </label>
                      <input
                        type="password"
                        id="signup-password"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="비밀번호를 입력하세요"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 font-medium"
                    >
                      회원가입
                    </button>
                    <div className="text-center">
                      <button
                        type="button"
                        onClick={switchToLogin}
                        className="text-sm text-blue-600 hover:text-blue-800"
                      >
                        이미 계정이 있으신가요? 로그인
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
      </div>
      )}
    </main>
  )
}
