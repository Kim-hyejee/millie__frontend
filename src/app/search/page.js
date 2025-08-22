'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import Link from 'next/link'

export default function Search() {
  const [searchType, setSearchType] = useState('keyword') // keyword, title, author, isbn
  const [searchQuery, setSearchQuery] = useState('')
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [hasSearched, setHasSearched] = useState(false)

  // 날짜 포맷팅 함수
  const formatDate = (dateString) => {
    if (!dateString) return '날짜 없음'
    const date = new Date(dateString)
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    setLoading(true)
    setError(null)
    setHasSearched(true)

    try {
      let response
      
      if (searchType === 'keyword') {
        // 통합 검색
        response = await axios.get(`http://localhost:8080/api/books/search/keyword?keyword=${encodeURIComponent(searchQuery.trim())}`)
      } else {
        // 개별 필드 검색
        const params = new URLSearchParams()
        params.append(searchType, searchQuery.trim())
        response = await axios.get(`http://localhost:8080/api/books/search?${params.toString()}`)
      }

      console.log('Search results:', response.data)
      setBooks(response.data)
    } catch (err) {
      console.error('Search error:', err)
      setError(`검색 중 오류가 발생했습니다: ${err.message}`)
      setBooks([])
    } finally {
      setLoading(false)
    }
  }

  const clearSearch = () => {
    setSearchQuery('')
    setBooks([])
    setError(null)
    setHasSearched(false)
  }

  return (
    <div className="min-h-screen p-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        {/* 헤더 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            🔍 도서 검색
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            제목, 저자, ISBN 또는 키워드로 도서를 검색할 수 있습니다.
          </p>
        </div>

        {/* 검색 폼 */}
        <div className="mb-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <form onSubmit={handleSearch} className="space-y-4">
            {/* 검색 타입 선택 */}
            <div className="flex flex-wrap gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="searchType"
                  value="keyword"
                  checked={searchType === 'keyword'}
                  onChange={(e) => setSearchType(e.target.value)}
                  className="mr-2"
                />
                <span className="text-gray-700 dark:text-gray-300">통합 검색</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="searchType"
                  value="title"
                  checked={searchType === 'title'}
                  onChange={(e) => setSearchType(e.target.value)}
                  className="mr-2"
                />
                <span className="text-gray-700 dark:text-gray-300">제목</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="searchType"
                  value="author"
                  checked={searchType === 'author'}
                  onChange={(e) => setSearchType(e.target.value)}
                  className="mr-2"
                />
                <span className="text-gray-700 dark:text-gray-300">저자</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="searchType"
                  value="isbn"
                  checked={searchType === 'isbn'}
                  onChange={(e) => setSearchType(e.target.value)}
                  className="mr-2"
                />
                <span className="text-gray-700 dark:text-gray-300">ISBN</span>
              </label>
            </div>

            {/* 검색어 입력 */}
            <div className="flex gap-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={searchType === 'keyword' ? '검색어를 입력하세요...' : 
                           searchType === 'title' ? '책 제목을 입력하세요...' :
                           searchType === 'author' ? '저자명을 입력하세요...' :
                           'ISBN을 입력하세요...'}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
              <button
                type="submit"
                disabled={loading || !searchQuery.trim()}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 transition-colors flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <span className="animate-pulse">⏳</span>
                    검색 중...
                  </>
                ) : (
                  <>
                    <span>🔍</span>
                    검색
                  </>
                )}
              </button>
              {hasSearched && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  초기화
                </button>
              )}
            </div>
          </form>
        </div>

        {/* 에러 메시지 */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            <div className="flex items-center gap-2">
              <span>⚠️</span>
              {error}
            </div>
          </div>
        )}

        {/* 검색 결과 */}
        {hasSearched && (
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                검색 결과
              </h2>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                총 {books.length}권의 책
              </div>
            </div>

            {books.length > 0 ? (
              <div className="overflow-x-auto">
                <div className="flex gap-6 pb-4" style={{ minWidth: 'max-content' }}>
                  {books.map((book) => (
                    <div key={book.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-shadow flex-shrink-0" style={{ width: '280px' }}>
                      {/* 책 표지 이미지 */}
                      {book.imageUrl && (
                        <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 overflow-hidden">
                          <img
                            src={book.imageUrl}
                            alt={`${book.title} 표지`}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            onError={(e) => {
                              e.target.style.display = 'none'
                              e.target.nextSibling.style.display = 'flex'
                            }}
                          />
                          <div className="hidden w-full h-full items-center justify-center text-gray-500 dark:text-gray-400">
                            <span className="text-6xl">📚</span>
                          </div>
                        </div>
                      )}
                      
                      <div className="p-6">
                        {/* 책 제목 */}
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
                          {book.title}
                        </h3>
                       
                        {/* 저자 */}
                        <div className="flex items-center justify-between text-sm mb-3">
                          <span className="text-gray-500 dark:text-gray-400">저자:</span>
                          <span className="font-medium text-gray-700 dark:text-gray-300">
                            {book.author}
                          </span>
                        </div>

                        {/* 책 정보 */}
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-500 dark:text-gray-400">페이지 수:</span>
                            <span className="font-medium text-gray-700 dark:text-gray-300">
                              {book.totalPages}페이지
                            </span>
                          </div>
                          
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-500 dark:text-gray-400">ISBN:</span>
                            <span className="font-mono text-gray-700 dark:text-gray-300 text-xs">
                              {book.isbn}
                            </span>
                          </div>
                        </div>

                        {/* 등록일 */}
                        <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                            <span>📅</span>
                            등록일: {formatDate(book.createdAt)}
                          </div>
                        </div>
                      </div>

                      {/* 액션 버튼 */}
                      <div className="px-6 pb-6">
                        <div className="flex gap-2">
                          <Link
                            href={`/books/${book.id}`}
                            className="flex-1 px-3 py-2 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 transition-colors text-center"
                          >
                            상세보기
                          </Link>
                          <button className="px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-md hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors">
                            대출
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                <div className="mb-4">
                  <span className="mx-auto text-6xl text-gray-400 dark:text-gray-500">🔍</span>
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  검색 결과가 없습니다
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  다른 검색어로 다시 시도해보세요.
                </p>
              </div>
            )}
          </div>
        )}

        {/* 검색 안내 */}
        {!hasSearched && (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <div className="mb-4">
              <span className="mx-auto text-6xl text-gray-400 dark:text-gray-500">🔍</span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              검색을 시작하세요
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              위의 검색 폼에서 원하는 조건을 선택하고 검색어를 입력하세요.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
