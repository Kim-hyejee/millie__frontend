'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import axios from 'axios'
import Link from 'next/link'

export default function BookDetail() {
  const params = useParams()
  const router = useRouter()
  const [book, setBook] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showSummary, setShowSummary] = useState(false)

  useEffect(() => {
    const fetchBookDetail = async () => {
      if (!params.id) return
      
      setLoading(true)
      setError(null)
      try {
        const response = await axios.get(`http://localhost:8080/api/books/${params.id}`)
        setBook(response.data)
      } catch (err) {
        setError('책 정보를 불러오는 중 오류가 발생했습니다.')
        console.error('Error fetching book:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchBookDetail()
  }, [params.id])

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
  }

  // 요약 모달 컴포넌트
  const SummaryModal = () => {
    if (!showSummary) return null

    return (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity" onClick={() => setShowSummary(false)}>
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
          
          <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
            <div className="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  📚 {book.title} - 읽은 내용 요약
                </h3>
                <button
                  onClick={() => setShowSummary(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-6">
                {/* 책 기본 정보 요약 */}
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-2">
                    📖 책 정보 요약
                  </h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-blue-700 dark:text-blue-300">제목:</span>
                      <p className="text-blue-600 dark:text-blue-400">{book.title}</p>
                    </div>
                    <div>
                      <span className="font-medium text-blue-700 dark:text-blue-300">저자:</span>
                      <p className="text-blue-600 dark:text-blue-400">{book.author}</p>
                    </div>
                    <div>
                      <span className="font-medium text-blue-700 dark:text-blue-300">페이지:</span>
                      <p className="text-blue-600 dark:text-blue-400">{book.totalPages}페이지</p>
                    </div>
                    <div>
                      <span className="font-medium text-blue-700 dark:text-blue-300">ISBN:</span>
                      <p className="text-blue-600 dark:text-blue-400 font-mono">{book.isbn}</p>
                    </div>
                  </div>
                </div>

                {/* 읽은 내용 요약 */}
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-2">
                    📝 읽은 내용 요약
                  </h4>
                  <div className="space-y-3 text-sm text-green-700 dark:text-green-300">
                    <p>
                      <span className="font-medium">주요 내용:</span> {book.title}은 {book.author}의 대표작으로, 
                      {book.totalPages}페이지에 걸쳐 깊이 있는 이야기를 담고 있습니다.
                    </p>
                    <p>
                      <span className="font-medium">핵심 주제:</span> 이 책은 인간의 본성과 사회적 관계, 
                      그리고 삶의 의미에 대한 깊은 통찰을 제공합니다.
                    </p>
                    <p>
                      <span className="font-medium">독서 진행도:</span> 현재 전체 {book.totalPages}페이지 중 
                      약 60% 정도를 읽었으며, 흥미진진한 전개가 계속되고 있습니다.
                    </p>
                  </div>
                </div>

                {/* 독서 노트 */}
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
                    ✍️ 독서 노트
                  </h4>
                  <div className="space-y-2 text-sm text-yellow-700 dark:text-yellow-300">
                    <p>• 인상 깊은 문장이나 구절을 메모해보세요</p>
                    <p>• 등장인물들의 관계와 성격을 정리해보세요</p>
                    <p>• 책을 통해 얻은 인사이트를 기록해보세요</p>
                  </div>
                </div>

                {/* 다음 독서 계획 */}
                <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-purple-800 dark:text-purple-200 mb-2">
                    🎯 다음 독서 계획
                  </h4>
                  <div className="space-y-2 text-sm text-purple-700 dark:text-purple-400">
                    <p>• 남은 {Math.floor(book.totalPages * 0.4)}페이지를 이번 주 내에 완독하기</p>
                    <p>• {book.author}의 다른 작품도 찾아보기</p>
                    <p>• 독서 모임에서 이 책에 대해 토론하기</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                onClick={() => setShowSummary(false)}
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen p-8 bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">책 정보를 불러오는 중...</p>
        </div>
      </div>
    )
  }

  if (error || !book) {
    return (
      <div className="min-h-screen p-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-12">
            <div className="mb-4">
              <svg className="mx-auto h-16 w-16 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              {error || '책을 찾을 수 없습니다'}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              요청하신 책 정보를 불러올 수 없습니다.
            </p>
            <Link
              href="/books"
              className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              책 목록으로 돌아가기
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto">
        {/* 헤더 */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Link
              href="/books"
              className="inline-flex items-center px-3 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              목록으로
            </Link>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            📖 {book.title}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            도서 상세 정보
          </p>
        </div>

        {/* 책 정보 카드 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="p-8">
            {/* 제목 섹션 */}
            <div className="mb-8 pb-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {book.title}
              </h2>
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="text-lg font-medium">{book.author}</span>
              </div>
            </div>

            {/* 상세 정보 그리드 */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {/* 왼쪽 컬럼 */}
              <div className="space-y-6">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wide">
                    페이지 수
                  </h3>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {book.totalPages}페이지
                  </p>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wide">
                    등록일
                  </h3>
                  <p className="text-lg font-medium text-gray-900 dark:text-white">
                    {formatDate(book.createdAt)}
                  </p>
                </div>
              </div>

              {/* 오른쪽 컬럼 */}
              <div className="space-y-6">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wide">
                    ISBN
                  </h3>
                  <p className="font-mono text-lg font-medium text-gray-900 dark:text-white">
                    {book.isbn}
                  </p>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wide">
                    책 ID
                  </h3>
                  <p className="text-lg font-medium text-gray-900 dark:text-white">
                    #{book.id}
                  </p>
                </div>
              </div>
            </div>

            {/* 추가 정보 */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-3">
                📚 책 소개
              </h3>
              <p className="text-blue-700 dark:text-blue-300">
                "{book.title}"은 {book.author}의 작품으로, 총 {book.totalPages}페이지로 구성되어 있습니다. 
                이 책은 도서관에 {formatDate(book.createdAt)}에 등록되었으며, 
                ISBN {book.isbn}로 식별됩니다.
              </p>
            </div>
          </div>

                     {/* 액션 버튼 */}
           <div className="px-8 py-6 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600">
             <div className="flex gap-4">
               <button className="flex-1 px-6 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2">
                 <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                 </svg>
                 대출하기
               </button>
               
               <button className="px-6 py-3 bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors flex items-center gap-2">
                 <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                 </svg>
                 찜하기
               </button>
               
               <button className="px-6 py-3 bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors flex items-center gap-2">
                 <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                 </svg>
                 공유하기
               </button>
             </div>
           </div>

           {/* 요약보기 버튼 */}
           <div className="px-8 py-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-600">
             <button
               onClick={() => setShowSummary(true)}
               className="w-full px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-3"
             >
               <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
               </svg>
               📖 현재까지 읽은 내용 요약보기
             </button>
           </div>
        </div>
      </div>
      
      {/* 요약 모달 */}
      <SummaryModal />
    </div>
  )
}
