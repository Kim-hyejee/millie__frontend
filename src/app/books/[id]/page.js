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
  const [summaryData, setSummaryData] = useState(null)
  const [summaryLoading, setSummaryLoading] = useState(false)

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

  // 요약 정보 가져오기
  const fetchSummary = async () => {
    if (!book) return
    
    setSummaryLoading(true)
    try {
      const response = await axios.get(`http://localhost:8080/api/books/${book.id}/summary/latest`)
      setSummaryData(response.data)
    } catch (err) {
      console.error('Error fetching summary:', err)
      // 요약 정보가 없어도 모달은 열 수 있도록 에러를 무시
    } finally {
      setSummaryLoading(false)
    }
  }

  // 요약 모달 열기
  const handleOpenSummary = () => {
    setShowSummary(true)
    if (!summaryData) {
      fetchSummary()
    }
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
          
          <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
            <div className="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                  📚 {book.title} - 마지막 읽은 내용 요약
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
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
                  <h4 className="text-xl font-semibold text-blue-800 dark:text-blue-200 mb-4">
                    📖 책 정보 요약
                  </h4>
                  <div className="grid grid-cols-2 gap-6 text-sm">
                    <div>
                      <span className="font-medium text-blue-700 dark:text-blue-300">제목:</span>
                      <p className="text-blue-600 dark:text-blue-400 font-medium">{book.title}</p>
                    </div>
                    <div>
                      <span className="font-medium text-blue-700 dark:text-blue-300">저자:</span>
                      <p className="text-blue-600 dark:text-blue-400 font-medium">{book.author}</p>
                    </div>
                    <div>
                      <span className="font-medium text-blue-700 dark:text-blue-300">전체 페이지:</span>
                      <p className="text-blue-600 dark:text-blue-400 font-medium">{book.totalPages}페이지</p>
                    </div>
                    <div>
                      <span className="font-medium text-blue-700 dark:text-blue-300">ISBN:</span>
                      <p className="text-blue-600 dark:text-blue-400 font-mono font-medium">{book.isbn}</p>
                    </div>
                  </div>
                </div>

                {/* 마지막 읽은 내용 요약 */}
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
                  <h4 className="text-xl font-semibold text-green-800 dark:text-green-200 mb-4">
                    📝 마지막 읽은 내용 요약
                  </h4>
                  {summaryLoading ? (
                    <div className="flex items-center justify-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
                      <span className="ml-3 text-green-700 dark:text-green-300">요약 정보를 불러오는 중...</span>
                    </div>
                  ) : summaryData ? (
                    <div className="space-y-4">
                      <div className="bg-white dark:bg-gray-700 rounded-lg p-4 border border-green-200 dark:border-green-700">
                        <p className="text-green-800 dark:text-green-200 text-lg leading-relaxed">
                          {summaryData}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>최근 업데이트된 요약 정보입니다</span>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="mb-4">
                        <svg className="mx-auto h-12 w-12 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <p className="text-green-600 dark:text-green-400">
                        아직 읽은 내용 요약이 없습니다.<br />
                        책을 읽으면서 요약 정보가 업데이트될 예정입니다.
                      </p>
                    </div>
                  )}
                </div>

                {/* 독서 진행 상황 */}
                <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-6">
                  <h4 className="text-xl font-semibold text-purple-800 dark:text-purple-200 mb-4">
                    📊 독서 진행 상황
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-purple-700 dark:text-purple-300 font-medium">전체 진행도</span>
                      <span className="text-purple-600 dark:text-purple-400 font-semibold">
                        {summaryData ? '진행 중' : '시작 전'}
                      </span>
                    </div>
                    <div className="w-full bg-purple-200 dark:bg-purple-700 rounded-full h-3">
                      <div 
                        className={`h-3 rounded-full transition-all duration-500 ${
                          summaryData 
                            ? 'bg-purple-500 dark:bg-purple-400' 
                            : 'bg-purple-300 dark:bg-purple-600'
                        }`}
                        style={{ width: summaryData ? '60%' : '0%' }}
                      ></div>
                    </div>
                    <div className="text-sm text-purple-600 dark:text-purple-400">
                      {summaryData 
                        ? `현재 ${book.totalPages}페이지 중 약 60% 정도를 읽었습니다.`
                        : '아직 독서를 시작하지 않았습니다.'
                      }
                    </div>
                  </div>
                </div>

                {/* 독서 노트 및 계획 */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* 독서 노트 */}
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-3">
                      ✍️ 독서 노트
                    </h4>
                    <div className="space-y-2 text-sm text-yellow-700 dark:text-yellow-300">
                      <p>• 인상 깊은 문장이나 구절을 메모해보세요</p>
                      <p>• 등장인물들의 관계와 성격을 정리해보세요</p>
                      <p>• 책을 통해 얻은 인사이트를 기록해보세요</p>
                      <p>• 궁금한 점이나 의문점을 정리해보세요</p>
                    </div>
                  </div>

                  {/* 다음 독서 계획 */}
                  <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-indigo-800 dark:text-indigo-200 mb-3">
                      🎯 다음 독서 계획
                    </h4>
                    <div className="space-y-2 text-sm text-indigo-700 dark:text-indigo-400">
                      {summaryData ? (
                        <>
                          <p>• 남은 {Math.floor(book.totalPages * 0.4)}페이지를 이번 주 내에 완독하기</p>
                          <p>• {book.author}의 다른 작품도 찾아보기</p>
                          <p>• 독서 모임에서 이 책에 대해 토론하기</p>
                        </>
                      ) : (
                        <>
                          <p>• 이번 주에 독서를 시작해보세요</p>
                          <p>• 매일 30분씩 독서 시간을 가져보세요</p>
                          <p>• 독서 목표를 세워보세요</p>
                        </>
                      )}
                    </div>
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
      <div className="min-h-screen p-8 flex items-center justify-center" style={{ backgroundColor: '#FAFAFA' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">책 정보를 불러오는 중...</p>
        </div>
      </div>
    )
  }

  if (error || !book) {
    return (
      <div className="min-h-screen p-8" style={{ backgroundColor: '#FAFAFA' }}>
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
    <div className="min-h-screen p-8" style={{ backgroundColor: '#FAFAFA' }}>
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
         </div>

                 {/* 책 정보 카드 */}
         <div className="bg-white rounded-lg shadow-lg overflow-hidden">
           <div className="flex">
             {/* 왼쪽: 책 표지 이미지 */}
             <div className="w-80 h-96 bg-gray-100 flex items-center justify-center overflow-hidden rounded-lg">
               {(book.image_url || book.imageUrl) ? (
                 <img
                   src={book.image_url || book.imageUrl}
                   alt={`${book.title} 표지`}
                   className="w-full h-full object-contain"
                   onError={(e) => {
                     e.target.style.display = 'none'
                     e.target.nextSibling.style.display = 'flex'
                   }}
                 />
               ) : null}
               <div className={`w-full h-full items-center justify-center text-gray-400 ${(book.image_url || book.imageUrl) ? 'hidden' : 'flex'}`}>
                 <svg className="h-24 w-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                 </svg>
               </div>
             </div>

             {/* 오른쪽: 책 정보 */}
             <div className="flex-1 p-8">
               {/* 책 제목 */}
               <h2 className="text-3xl font-bold text-black mb-3">
                 {book.title}
               </h2>
               
               {/* 부연 설명 */}
               <p className="text-lg text-gray-700 mb-4">
                 {book.description || `"${book.title}"은 ${book.author}의 작품으로, 독자들에게 깊은 감동과 인사이트를 제공합니다.`}
               </p>
               
               {/* 작가 */}
               <div className="mb-4">
                 <span className="text-lg font-semibold text-black">
                   {book.author}
                 </span>
               </div>
               
               {/* 평점 및 메타데이터 */}
               <div className="flex items-center gap-2 mb-6 text-sm text-gray-600">
                 <span className="text-yellow-500">★</span>
                 <span>3.6</span>
                 <span>·</span>
                 <span>다이브</span>
                 <span>·</span>
                 <span>오디오북</span>
                 <span>·</span>
                 <span>2025.08.01</span>
               </div>
               
               {/* 구분선 */}
               <div className="w-full h-px bg-gray-200 mb-6"></div>
               
               {/* 이 책이 담긴 서재 수 및 공유 아이콘 */}
               <div className="flex items-center justify-between mb-8">
                 <span className="text-sm text-gray-600">
                   이 책이 담긴 서재 {Math.floor(Math.random() * 10000) + 1000}
                 </span>
                 <div className="flex gap-3">
                   <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50">
                     <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                     </svg>
                   </button>
                   <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50">
                     <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                     </svg>
                   </button>
                   <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50">
                     <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0l-4.5-4.5m4.5 4.5V3" />
                     </svg>
                   </button>
                 </div>
               </div>
             </div>
           </div>

                                               {/* 액션 버튼 */}
             <div className="px-8 py-6 bg-white border-t border-gray-200">
               <div className="flex gap-4 items-center">
                 <button className="flex-1 px-6 py-3 bg-gray-700 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                   <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                   </svg>
                   바로 읽기
                 </button>
                 
                 <button className="px-6 py-3 bg-white text-black font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors flex items-center gap-2">
                   <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                   </svg>
                   내서재에 담기
                 </button>
                 
                 <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50">
                   <svg className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                   </svg>
                 </button>
               </div>
             </div>
        </div>
      </div>
      
      {/* 요약 모달 */}
      <SummaryModal />
    </div>
  )
}
