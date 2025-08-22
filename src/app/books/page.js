'use client'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Link from 'next/link'

export default function Books() {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchBooks()
  }, [])

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/books')
      console.log('Books data:', response.data)
      setBooks(response.data || [])
    } catch (error) {
      console.error('Error fetching books:', error)
      setError('도서 목록을 불러오는 중 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return '날짜 없음'
    const date = new Date(dateString)
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-yellow-100 via-yellow-200 via-purple-200 to-purple-600">
        {/* 헤더 */}
        <header className="bg-white bg-opacity-90 backdrop-blur-sm shadow-sm">
          <div className="pl-16 sm:pl-24 lg:pl-32 pr-16 sm:pr-24 lg:pr-32 h-20">
            <div className="flex items-center justify-between h-full">
              <h1 className="text-2xl font-bold text-gray-900">밀리의 서재</h1>
              <div className="flex items-center space-x-4">
                <Link href="/search" className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium">
                  🔍 검색
                </Link>
                <button className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium">
                  📚 내 서재
                </button>
              </div>
            </div>
          </div>
        </header>

        <div className="flex items-center justify-center min-h-[calc(100vh-5rem)]">
          <div className="text-center">
            <div className="text-2xl text-gray-700 mb-4">📚</div>
            <div className="text-xl text-gray-600">도서 목록을 불러오는 중...</div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-yellow-100 via-yellow-200 via-purple-200 to-purple-600">
        {/* 헤더 */}
        <header className="bg-white bg-opacity-90 backdrop-blur-sm shadow-sm">
          <div className="pl-16 sm:pl-24 lg:pl-32 pr-16 sm:pr-24 lg:pr-32 h-20">
            <div className="flex items-center justify-between h-full">
              <h1 className="text-2xl font-bold text-gray-900">밀리의 서재</h1>
              <div className="flex items-center space-x-4">
                <Link href="/search" className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium">
                  🔍 검색
                </Link>
                <button className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium">
                  📚 내 서재
                </button>
              </div>
            </div>
          </div>
        </header>

        <div className="flex items-center justify-center min-h-[calc(100vh-5rem)]">
          <div className="text-center">
            <div className="text-2xl text-red-600 mb-4">⚠️</div>
            <div className="text-xl text-gray-600">{error}</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-yellow-100 via-yellow-200 via-purple-200 to-purple-600">
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

      {/* 상단 메인 콘텐츠 - 메인 페이지와 동일한 배경 */}
      <div className="flex items-center justify-between min-h-[calc(100vh-5rem)] pl-32 sm:pl-40 lg:pl-48 pr-40 sm:pr-48 lg:pr-56">
        {/* 왼쪽: 메인 텍스트 */}
        <div className="flex-1 pr-4 sm:pr-6 lg:pr-8">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight drop-shadow-lg" style={{ lineHeight: '1.7' }}>
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
            {/* 앞쪽 책 (어린왕자) */}
            <img
              src="https://contents.kyobobook.co.kr/sih/fit-in/400x0/pdt/9791187192596.jpg"
              alt="밀리의 서재 이미지"
              className="max-w-md w-full h-auto rounded-lg shadow-lg absolute top-0 left-0 transform -rotate-2 -translate-x-2"
            />
          </div>
        </div>
      </div>

      {/* 하단 도서 목록 섹션 - 다른 배경색 */}
      <div className="bg-gray-50 py-16">
        <div className="pl-16 sm:pl-24 lg:pl-32 pr-16 sm:pr-24 lg:pr-32">
          <h3 className="text-3xl font-bold text-gray-900 mb-8">📚 전체 도서 목록</h3>
          
          {/* 도서 가로 스크롤 */}
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-6 pb-4" style={{ minWidth: 'max-content' }}>
              {books.map((book) => (
                <div key={book.id} className="flex-shrink-0" style={{ width: '280px' }}>
                  <Link href={`/books/${book.id}`} className="block">
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                      {/* 도서 이미지 */}
                      <div className="h-64 bg-gray-100 flex items-center justify-center overflow-hidden">
                        {book.imageUrl || book.image_url ? (
                          <img
                            src={book.imageUrl || book.image_url}
                            alt={book.title}
                            className="w-full h-full object-contain"
                          />
                        ) : (
                          <div className="text-gray-400 text-6xl">📚</div>
                        )}
                      </div>
                      
                      {/* 도서 정보 */}
                      <div className="p-3">
                        <h4 className="font-bold text-lg text-black mb-1" style={{ fontSize: '17px' }}>
                          {book.title}
                        </h4>
                        <p className="text-gray-600 mb-1">
                          {book.author || '작자미상'}
                        </p>
                        {book.totalPages && (
                          <p className="text-sm text-gray-500">
                            {book.totalPages}페이지
                          </p>
                        )}
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}