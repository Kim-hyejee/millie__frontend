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
  const [recentSearches, setRecentSearches] = useState([])
  const [popularBooks, setPopularBooks] = useState([])

  // 컴포넌트 마운트 시 인기 도서 로드
  useEffect(() => {
    loadPopularBooks()
    loadRecentSearches()
  }, [])

  // 인기 도서 로드
  const loadPopularBooks = async () => {
    try {
      console.log('📚 인기 도서 로드 시도...')
      const response = await axios.get('http://localhost:8080/api/books?limit=6')
      console.log('✅ 인기 도서 로드 성공:', response.data)
      setPopularBooks(response.data || [])
    } catch (error) {
      console.error('❌ 인기 도서 로드 실패:', error)
      // 백엔드 연결 실패 시 하드코딩된 데이터 사용
      const fallbackBooks = [
        {
          id: 1,
          title: '어린 왕자',
          author: '생텍쥐페리',
          publisher: '열린책들',
          imageUrl: 'https://contents.kyobobook.co.kr/sih/fit-in/400x0/pdt/9791187192596.jpg'
        },
        {
          id: 2,
          title: '해리포터와 마법사의 돌',
          author: 'J.K. 롤링',
          publisher: '문학수첩',
          imageUrl: 'https://contents.kyobobook.co.kr/sih/fit-in/400x0/pdt/9781408855652.jpg'
        }
      ]
      setPopularBooks(fallbackBooks)
    }
  }

  // 백엔드 연결 테스트
  const testBackendConnection = async () => {
    try {
      console.log('🔌 백엔드 연결 테스트 시작...')
      const response = await axios.get('http://localhost:8080/api/books')
      console.log('✅ 백엔드 연결 성공:', response.data)
      return { success: true, data: response.data }
    } catch (error) {
      console.error('❌ 백엔드 연결 실패:', error)
      return { success: false, error: error.message }
    }
  }

  // 최근 검색어 로드
  const loadRecentSearches = () => {
    const saved = localStorage.getItem('recentSearches')
    if (saved) {
      setRecentSearches(JSON.parse(saved))
    }
  }

  // 최근 검색어 저장
  const saveRecentSearch = (query) => {
    const updated = [query, ...recentSearches.filter(q => q !== query)].slice(0, 5)
    setRecentSearches(updated)
    localStorage.setItem('recentSearches', JSON.stringify(updated))
  }

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
    saveRecentSearch(searchQuery.trim())

    console.log('🔍 검색 시작:', { searchType, searchQuery: searchQuery.trim() })

    try {
      // 먼저 백엔드 연결 상태 확인
      const connectionTest = await testBackendConnection()
      
      if (!connectionTest.success) {
        console.log('❌ 백엔드 연결 실패, 로컬 검색으로 전환')
        // 백엔드 연결 실패 시 하드코딩된 데이터로 검색
        const localBooks = [
          {
            id: 1,
            title: '어린 왕자',
            author: '생텍쥐페리',
            publisher: '열린책들',
            imageUrl: 'https://contents.kyobobook.co.kr/sih/fit-in/400x0/pdt/9791187192596.jpg'
          },
          {
            id: 2,
            title: '해리포터와 마법사의 돌',
            author: 'J.K. 롤링',
            publisher: '문학수첩',
            imageUrl: 'https://contents.kyobobook.co.kr/sih/fit-in/400x0/pdt/9781408855652.jpg'
          },
          {
            id: 3,
            title: '1984',
            author: '조지 오웰',
            publisher: '민음사',
            imageUrl: 'https://contents.kyobobook.co.kr/sih/fit-in/400x0/pdt/9788937473135.jpg'
          }
        ]
        
        const filteredBooks = localBooks.filter(book => {
          const searchValue = searchQuery.toLowerCase()
          return book.title?.toLowerCase().includes(searchValue) ||
                 book.author?.toLowerCase().includes(searchValue) ||
                 book.publisher?.toLowerCase().includes(searchValue)
        })
        
        console.log('🔍 로컬 검색 결과:', filteredBooks)
        setBooks(filteredBooks)
        
        if (filteredBooks.length === 0) {
          setError('검색 결과가 없습니다. 다른 검색어를 시도해보세요.')
        }
        return
      }

      let response
      
      if (searchType === 'keyword') {
        // 통합 검색 - 여러 엔드포인트 시도
        console.log('🔍 통합 검색 시도...')
        
        try {
          // 첫 번째 엔드포인트 시도
          response = await axios.get(`http://localhost:8080/api/books/search/keyword?keyword=${encodeURIComponent(searchQuery.trim())}`)
          console.log('✅ 첫 번째 엔드포인트 성공:', response.data)
        } catch (error) {
          console.log('❌ 첫 번째 엔드포인트 실패, 두 번째 시도...')
          
          try {
            // 두 번째 엔드포인트 시도 (일반 검색)
            response = await axios.get(`http://localhost:8080/api/books/search?keyword=${encodeURIComponent(searchQuery.trim())}`)
            console.log('✅ 두 번째 엔드포인트 성공:', response.data)
          } catch (error2) {
            console.log('❌ 두 번째 엔드포인트 실패, 세 번째 시도...')
            
            try {
              // 세 번째 엔드포인트 시도 (전체 도서에서 필터링)
              response = await axios.get('http://localhost:8080/api/books')
              const allBooks = response.data || []
              console.log('📚 전체 도서 데이터:', allBooks)
              
              const filteredBooks = allBooks.filter(book => {
                const searchValue = searchQuery.toLowerCase()
                const titleMatch = book.title?.toLowerCase().includes(searchValue)
                const authorMatch = book.author?.toLowerCase().includes(searchValue)
                const isbnMatch = book.isbn?.includes(searchValue)
                const publisherMatch = book.publisher?.toLowerCase().includes(searchValue)
                
                console.log(`🔍 도서 "${book.title}" 검색 결과:`, {
                  title: titleMatch,
                  author: authorMatch,
                  isbn: isbnMatch,
                  publisher: publisherMatch,
                  searchValue,
                  bookTitle: book.title?.toLowerCase(),
                  bookAuthor: book.author?.toLowerCase()
                })
                
                return titleMatch || authorMatch || isbnMatch || publisherMatch
              })
              
              response.data = filteredBooks
              console.log('✅ 세 번째 엔드포인트 성공 (필터링):', filteredBooks)
            } catch (error3) {
              console.log('❌ 모든 엔드포인트 실패, 에러 발생')
              throw error3
            }
          }
        }
      } else {
        // 개별 필드 검색
        console.log('🔍 개별 필드 검색 시도...')
        
        try {
          const params = new URLSearchParams()
          params.append(searchType, searchQuery.trim())
          response = await axios.get(`http://localhost:8080/api/books/search?${params.toString()}`)
          console.log('✅ 개별 필드 검색 성공:', response.data)
        } catch (error) {
          console.log('❌ 개별 필드 검색 실패, 전체 도서에서 필터링 시도...')
          
          try {
            // 전체 도서에서 필터링
            const allResponse = await axios.get('http://localhost:8080/api/books')
            const allBooks = allResponse.data || []
            console.log('📚 전체 도서 데이터 (개별 검색):', allBooks)
            
            const filteredBooks = allBooks.filter(book => {
              const searchValue = searchQuery.toLowerCase()
              switch (searchType) {
                case 'title':
                  return book.title?.toLowerCase().includes(searchValue)
                case 'author':
                  return book.author?.toLowerCase().includes(searchValue)
                case 'isbn':
                  return book.isbn?.includes(searchValue)
                default:
                  return false
              }
            })
            response = { data: filteredBooks }
            console.log('✅ 필터링 검색 성공:', filteredBooks)
          } catch (error2) {
            console.log('❌ 필터링 검색도 실패')
            throw error2
          }
        }
      }

      console.log('🔍 최종 검색 결과:', response.data)
      
      if (response.data && Array.isArray(response.data)) {
        setBooks(response.data)
        if (response.data.length === 0) {
          setError('검색 결과가 없습니다. 다른 검색어를 시도해보세요.')
        }
      } else if (response.data && typeof response.data === 'object') {
        // 응답이 배열이 아닌 경우 배열로 변환
        const booksArray = Array.isArray(response.data.books) ? response.data.books : 
                          Array.isArray(response.data.data) ? response.data.data : 
                          [response.data]
        setBooks(booksArray)
        if (booksArray.length === 0) {
          setError('검색 결과가 없습니다. 다른 검색어를 시도해보세요.')
        }
      } else {
        setBooks([])
        setError('검색 결과를 처리할 수 없습니다.')
      }
      
    } catch (err) {
      console.error('🔍 검색 오류 상세:', {
        message: err.message,
        status: err.response?.status,
        statusText: err.response?.statusText,
        data: err.response?.data,
        config: {
          url: err.config?.url,
          method: err.config?.method,
          params: err.config?.params
        }
      })
      
      if (err.response?.status === 404) {
        setError('검색 API 엔드포인트를 찾을 수 없습니다. 백엔드 서버를 확인해주세요.')
      } else if (err.response?.status === 500) {
        setError('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.')
      } else if (err.code === 'ECONNREFUSED') {
        setError('백엔드 서버에 연결할 수 없습니다. 서버가 실행 중인지 확인해주세요.')
      } else if (err.message.includes('Network Error')) {
        setError('네트워크 오류가 발생했습니다. 인터넷 연결을 확인해주세요.')
      } else {
        setError(`검색 중 오류가 발생했습니다: ${err.message}`)
      }
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

  const handleQuickSearch = (query) => {
    setSearchQuery(query)
    setSearchType('keyword')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-indigo-100">
      {/* 헤더 */}
      <header className="bg-white bg-opacity-90 backdrop-blur-sm shadow-sm">
        <div className="pl-16 sm:pl-24 lg:pl-32 pr-16 sm:pr-24 lg:pr-32 h-20">
          <div className="flex items-center justify-between h-full">
            <Link href="/books" className="text-2xl font-bold text-gray-900 hover:text-gray-700 transition-colors">
              밀리의 서재
            </Link>
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

      <div className="max-w-7xl mx-auto px-8 py-12">
        {/* 페이지 제목 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🔍 도서 검색
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            제목, 저자, ISBN 또는 키워드로 원하는 도서를 찾아보세요
          </p>
        </div>

        {/* 검색 폼 */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <form onSubmit={handleSearch} className="space-y-6">
            {/* 검색 타입 선택 */}
            <div className="flex flex-wrap gap-6 justify-center">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="searchType"
                  value="keyword"
                  checked={searchType === 'keyword'}
                  onChange={(e) => setSearchType(e.target.value)}
                  className="mr-3 w-4 h-4 text-blue-600"
                />
                <span className="text-lg font-medium text-gray-700">🔍 통합 검색</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="searchType"
                  value="title"
                  checked={searchType === 'title'}
                  onChange={(e) => setSearchType(e.target.value)}
                  className="mr-3 w-4 h-4 text-blue-600"
                />
                <span className="text-lg font-medium text-gray-700">📖 제목</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="searchType"
                  value="author"
                  checked={searchType === 'author'}
                  onChange={(e) => setSearchType(e.target.value)}
                  className="mr-3 w-4 h-4 text-blue-600"
                />
                <span className="text-lg font-medium text-gray-700">✍️ 저자</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="searchType"
                  value="isbn"
                  checked={searchType === 'isbn'}
                  onChange={(e) => setSearchType(e.target.value)}
                  className="mr-3 w-4 h-4 text-blue-600"
                />
                <span className="text-lg font-medium text-gray-700">🏷️ ISBN</span>
              </label>
            </div>

            {/* 검색어 입력 */}
            <div className="flex gap-4 max-w-2xl mx-auto">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={searchType === 'keyword' ? '검색어를 입력하세요...' : 
                           searchType === 'title' ? '책 제목을 입력하세요...' :
                           searchType === 'author' ? '저자명을 입력하세요...' :
                           'ISBN을 입력하세요...'}
                className="flex-1 px-6 py-4 text-lg border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-black"
              />
              <button
                type="submit"
                disabled={loading || !searchQuery.trim()}
                className="px-8 py-4 bg-blue-600 text-black text-lg font-semibold rounded-xl hover:bg-blue-700 disabled:opacity-50 transition-all flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <span className="animate-spin">⏳</span>
                    검색 중...
                  </>
                ) : (
                  <>
                    <span>🔍</span>
                    검색
                  </>
                )}
              </button>
            </div>

            {/* 최근 검색어 */}
            {recentSearches.length > 0 && (
              <div className="text-center">
                <p className="text-sm text-gray-500 mb-2">최근 검색어:</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {recentSearches.map((query, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickSearch(query)}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
                    >
                      {query}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </form>
        </div>

        {/* 에러 메시지 */}
        {error && (
          <div className="mb-8 p-6 bg-red-50 border border-red-200 text-red-700 rounded-xl">
            <div className="flex items-center gap-3">
              <span className="text-2xl">⚠️</span>
              <div>
                <h3 className="font-semibold mb-1">검색 오류</h3>
                <p>{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* 검색 결과 */}
        {hasSearched && (
          <div className="mb-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                🔍 검색 결과
              </h2>
              <div className="flex items-center gap-4">
                <span className="text-lg text-gray-600">
                  총 <span className="font-bold text-blue-600">{books.length}</span>권의 도서
                </span>
                <button
                  onClick={clearSearch}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  새로 검색
                </button>
              </div>
            </div>

            {books.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {books.map((book) => (
                  <div key={book.id} className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1">
                    {/* 도서 이미지 */}
                    <div className="h-64 bg-gray-100 flex items-center justify-center overflow-hidden">
                      {book.imageUrl || book.image_url ? (
                        <img
                          src={book.imageUrl || book.image_url}
                          alt={book.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="text-gray-400 text-6xl">📚</div>
                      )}
                    </div>
                    
                    {/* 도서 정보 */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                        {book.title}
                      </h3>
                      <p className="text-gray-600 mb-2">
                        {book.author || '작자미상'}
                      </p>
                      {book.publisher && (
                        <p className="text-sm text-gray-500 mb-2">
                          {book.publisher}
                        </p>
                      )}
                      {book.publicationDate && (
                        <p className="text-xs text-gray-400 mb-3">
                          출판일: {formatDate(book.publicationDate)}
                        </p>
                      )}
                      
                      {/* 액션 버튼 */}
                      <div className="flex gap-2">
                        <Link
                          href={`/books/${book.id}`}
                          className="flex-1 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors text-center"
                        >
                          상세보기
                        </Link>
                        <button className="px-4 py-2 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-gray-200 transition-colors">
                          찜하기
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-xl shadow-lg">
                <div className="text-6xl text-gray-300 mb-4">🔍</div>
                <h3 className="text-xl font-medium text-gray-600 mb-2">
                  검색 결과가 없습니다
                </h3>
                <p className="text-gray-500 mb-6">
                  다른 검색어로 다시 시도해보세요.
                </p>
                <button
                  onClick={clearSearch}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  새로 검색하기
                </button>
              </div>
            )}
          </div>
        )}

        {/* 인기 도서 (검색 전에 표시) */}
        {!hasSearched && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              📚 인기 도서
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {popularBooks.map((book) => (
                <div key={book.id} className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-20 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                      {book.imageUrl || book.image_url ? (
                        <img
                          src={book.imageUrl || book.image_url}
                          alt={book.title}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <div className="text-gray-400 text-2xl">📚</div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
                        {book.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-1">
                        {book.author || '작자미상'}
                      </p>
                      <Link
                        href={`/books/${book.id}`}
                        className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        자세히 보기 →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
