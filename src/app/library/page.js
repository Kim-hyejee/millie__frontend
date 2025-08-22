'use client'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Link from 'next/link'

export default function LibraryPage() {
  const [libraryBooks, setLibraryBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchLibraryBooks()
  }, [])

  const fetchLibraryBooks = async () => {
    try {
      // 사용자의 내 서재 도서 목록을 가져오는 API
      const response = await axios.get('http://localhost:8080/api/library/books')
      console.log('Library books:', response.data)
      setLibraryBooks(response.data || [])
    } catch (error) {
      console.error('Error fetching library books:', error)
      setError('내 서재 목록을 불러오는 중 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  const removeFromLibrary = async (bookId) => {
    try {
      await axios.delete(`http://localhost:8080/api/library/books/${bookId}`)
      // 성공적으로 제거된 경우 목록에서도 제거
      setLibraryBooks(prevBooks => prevBooks.filter(book => book.id !== bookId))
      alert('내 서재에서 제거되었습니다.')
    } catch (error) {
      console.error('Error removing book from library:', error)
      alert('도서 제거 중 오류가 발생했습니다.')
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
            <div className="text-xl text-gray-600">내 서재를 불러오는 중...</div>
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

      {/* 메인 콘텐츠 */}
      <main className="pt-20 pl-16 sm:pl-24 lg:pl-32 pr-16 sm:pr-24 lg:pr-32">
        {/* 페이지 제목 */}
        <div className="mb-12">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight drop-shadow-lg mb-8">
            <span className="text-black">📚 내 서재</span>
          </h2>
          <p className="text-xl text-gray-700">
            내가 담아둔 소중한 도서들을 확인하고 관리할 수 있습니다.
          </p>
        </div>

        {/* 내 서재 도서 목록 */}
        <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-gray-900">
              내가 담은 도서 ({libraryBooks.length}권)
            </h3>
            <Link 
              href="/books" 
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              📖 더 많은 도서 보기
            </Link>
          </div>

          {libraryBooks.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {libraryBooks.map((book) => (
                <div key={book.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow border border-gray-200">
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
                  <div className="p-4">
                    <h4 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2">
                      {book.title}
                    </h4>
                    <p className="text-gray-600 mb-2">
                      {book.author || '작자미상'}
                    </p>
                    {book.publisher && (
                      <p className="text-sm text-gray-500 mb-2">
                        {book.publisher}
                      </p>
                    )}
                    {book.addedAt && (
                      <p className="text-xs text-gray-400 mb-3">
                        담은 날짜: {formatDate(book.addedAt)}
                      </p>
                    )}
                  </div>

                  {/* 액션 버튼 */}
                  <div className="px-4 pb-4">
                    <div className="flex gap-2">
                      <Link
                        href={`/books/${book.id}`}
                        className="flex-1 px-3 py-2 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 transition-colors text-center"
                      >
                        상세보기
                      </Link>
                      <button
                        onClick={() => removeFromLibrary(book.id)}
                        className="px-3 py-2 bg-red-500 text-white text-sm rounded-md hover:bg-red-600 transition-colors"
                      >
                        제거
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl text-gray-300 mb-4">📚</div>
              <h3 className="text-xl font-medium text-gray-600 mb-2">
                아직 담아둔 도서가 없습니다
              </h3>
              <p className="text-gray-500 mb-6">
                도서 상세 페이지에서 "내 서재에 담기" 버튼을 눌러 도서를 담아보세요.
              </p>
              <Link 
                href="/books" 
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                📖 도서 둘러보기
              </Link>
            </div>
          )}
        </div>

        {/* 통계 정보 */}
        {libraryBooks.length > 0 && (
          <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-2xl shadow-xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">📊 내 서재 통계</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-3xl font-bold text-blue-600">{libraryBooks.length}</div>
                <div className="text-gray-600">총 도서 수</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-3xl font-bold text-green-600">
                  {libraryBooks.filter(book => book.author).length}
                </div>
                <div className="text-gray-600">저자 정보 있는 도서</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-3xl font-bold text-purple-600">
                  {libraryBooks.filter(book => book.imageUrl || book.image_url).length}
                </div>
                <div className="text-gray-600">커버 이미지 있는 도서</div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
