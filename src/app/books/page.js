'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import Link from 'next/link'
import BookCard from '../../components/BookCard'

export default function Books() {
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

  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchBooks = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await axios.get('http://localhost:8080/api/books')
      console.log('Books data:', response.data) // 디버깅용
      setBooks(response.data)
    } catch (err) {
      setError('책 목록을 불러오는 중 오류가 발생했습니다.')
      console.error('Error fetching books:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBooks()
  }, [])

  return (
         <div className="min-h-screen p-8" style={{ backgroundColor: '#FAFAFA' }}>
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
                     <h1 className="text-3xl font-bold text-black mb-2">
             📚 책 목록
           </h1>
          <p className="text-gray-600 dark:text-gray-300">
            도서관에 등록된 모든 책들을 확인할 수 있습니다.
          </p>
        </div>

        {/* 새로고침 버튼 */}
        <div className="mb-6 flex justify-between items-center">
          <button
            onClick={fetchBooks}
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 transition-colors flex items-center gap-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                로딩 중...
              </>
            ) : (
              <>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                새로고침
              </>
            )}
          </button>
          
          <div className="text-sm text-gray-500 dark:text-gray-400">
            총 {books.length}권의 책
          </div>
        </div>

        {/* 에러 메시지 */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {error}
            </div>
          </div>
        )}

        {/* 스크롤 힌트 */}
        {books.length > 0 && (
          <div className="text-center text-gray-500 dark:text-gray-400 text-sm mb-4">
            ← 좌우로 스크롤하여 더 많은 책을 확인하세요 →
          </div>
        )}

        {/* 책 목록 */}
        {books.length > 0 ? (
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-6 pb-4" style={{ minWidth: 'max-content' }}>
              {books.map((book) => (
                                 <Link 
                   key={book.id} 
                   href={`/books/${book.id}`}
                   className="rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow flex-shrink-0 block"
                   style={{ width: '180px' }}
                 >
                  {/* 책 표지 이미지 */}
                  <div className="w-full h-72 overflow-hidden flex items-center justify-center">
                    {(book.image_url || book.imageUrl) ? (
                      <img
                        src={book.image_url || book.imageUrl}
                        alt={`${book.title} 표지`}
                        className="max-w-full max-h-full object-contain hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.target.style.display = 'none'
                          e.target.nextSibling.style.display = 'flex'
                        }}
                      />
                    ) : null}
                    <div className={`w-full h-full items-center justify-center text-gray-500 dark:text-gray-400 ${(book.image_url || book.imageUrl) ? 'hidden' : 'flex'}`}>
                      <svg className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                  
                                     {/* 책 정보 */}
                   <div className="pt-2 pb-2">
                                           {/* 책 제목 */}
                      <h3 className="font-semibold text-black mb-1 line-clamp-2" style={{ fontSize: '17px' }}>
                        {book.title}
                      </h3>
                    
                    {/* 저자 */}
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                      {book.author}
                    </div>

                    {/* 페이지 수 */}
                    <div className="text-sm text-gray-500 dark:text-gray-500">
                      📄 {book.totalPages}페이지
                    </div>
                   </div>
                </Link>
             ))}
           </div>
         </div>
       ) : (
         /* 빈 상태 */
         <div className="text-center py-12">
           <div className="mb-4">
             <svg className="mx-auto h-16 w-16 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
             </svg>
           </div>
           <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
             책이 없습니다
           </h3>
           <p className="text-gray-500 dark:text-gray-400">
             {loading ? '책 목록을 불러오는 중입니다...' : '등록된 책이 없습니다.'}
           </p>
         </div>
       )}
     </div>
   </div>
 )
}