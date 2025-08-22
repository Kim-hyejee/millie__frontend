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
  const [showLibraryModal, setShowLibraryModal] = useState(false)
  const [showReaderModal, setShowReaderModal] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [summaryData, setSummaryData] = useState(null)
  const [summaryLoading, setSummaryLoading] = useState(false)
  const [showSummary, setShowSummary] = useState(false) // 요약 정보 표시 여부

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

  // 바로 읽기 모달 열기
  const openReader = () => {
    setShowReaderModal(true)
    setCurrentPage(1)
    setShowSummary(false) // 요약 정보 숨기기
  }

  // 요약 보기 모달 열기
  const fetchSummary = async () => {
    setShowReaderModal(true)
    setCurrentPage(1)
    setShowSummary(true) // 요약 정보 보이기
  }

  // 서재 담기 모달 열기
  const handleAddToLibrary = async () => {
    try {
      // 내 서재에 도서 추가하는 API 호출
      const response = await axios.post(`http://localhost:8080/api/library/books`, {
        bookId: params.id
      })
      
      if (response.data.success) {
        alert('내 서재에 성공적으로 담겼습니다!')
        // 모달 닫기
        setShowLibraryModal(false)
      } else {
        alert('내 서재에 담기 실패: ' + (response.data.message || '알 수 없는 오류'))
      }
    } catch (error) {
      console.error('Error adding book to library:', error)
      if (error.response) {
        alert('내 서재에 담기 실패: ' + (error.response.data?.message || '서버 오류'))
      } else {
        alert('내 서재에 담기 실패: 네트워크 오류가 발생했습니다.')
      }
    }
  }

  // 서재 확인 페이지로 이동
  const handleGoToLibrary = () => {
    setShowLibraryModal(false)
    router.push('/library')
  }

  // 서재 담기 모달 컴포넌트
  const LibraryModal = () => {
    if (!showLibraryModal) return null

    return (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity" onClick={() => setShowLibraryModal(false)}>
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
          
          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                  <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  내 서재에 담겼습니다
                </h3>
                <p className="text-sm text-gray-500 mb-6">
                  바로 확인하시겠습니까?
                </p>
              </div>
            </div>
            
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse gap-3">
              <button
                onClick={handleGoToLibrary}
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
                예
              </button>
              <button
                onClick={() => setShowLibraryModal(false)}
                className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
                아니오
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
                  {/* 바로 읽기 버튼 */}
                  <button 
                    onClick={openReader}
                    className="flex-1 bg-gray-700 text-white py-3 px-6 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    바로 읽기
                  </button>
                  
                  {/* 요약 보기 버튼 */}
                  <button 
                    onClick={fetchSummary}
                    className="flex-1 bg-yellow-500 text-black py-3 px-6 rounded-lg hover:bg-yellow-600 transition-colors flex items-center justify-center gap-2 border-2 border-yellow-700"
                    style={{ minHeight: '48px' }}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    🔍 요약 보기
                  </button>
                  
                  {/* 내 서재에 담기 버튼 */}
                  <button 
                    onClick={handleAddToLibrary}
                    className="flex-1 bg-white text-black py-3 px-6 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                    내 서재에 담기
                  </button>
                  
                  {/* 하트 버튼 */}
                  <button className="w-12 h-12 bg-white text-gray-600 rounded-full border border-gray-300 hover:bg-gray-50 transition-colors flex items-center justify-center">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>
              </div>
        </div>
      </div>
      
      {/* 서재 담기 모달 */}
      <LibraryModal />

      {/* 책 뷰어 모달 */}
      {showReaderModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-2xl w-11/12 h-5/6 max-w-6xl max-h-[90vh] flex flex-col">
            {/* 모달 헤더 */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center gap-4">
                <h3 className="text-2xl font-bold text-gray-900">
                  📖 {book?.title}
                </h3>
                <span className="text-sm text-gray-500">
                  {currentPage} / {book?.totalPages || '?'} 페이지
                </span>
              </div>
              <div className="flex items-center gap-3">
                {/* 페이지 네비게이션 */}
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage <= 1}
                  className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ← 이전
                </button>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(book?.totalPages || prev, prev + 1))}
                  disabled={currentPage >= (book?.totalPages || 1)}
                  className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  다음 →
                </button>
                <button
                  onClick={() => setShowReaderModal(false)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  닫기
                </button>
              </div>
            </div>

            {/* 책 내용 */}
            <div className="flex-1 p-6 overflow-y-auto">
              <div className="max-w-4xl mx-auto">
                {/* 페이지 헤더 */}
                <div className="text-center mb-8 pb-4 border-b border-gray-200">
                  <h4 className="text-xl font-semibold text-gray-800 mb-2">
                    {book?.title}
                  </h4>
                  <p className="text-gray-600">
                    {book?.author} | {book?.publisher}
                  </p>
                </div>

                {/* 요약 정보 섹션 (요약 보기 모드에서만 표시) */}
                {showSummary && (
                  <>
                    <div className="mb-8">
                      <h5 className="text-lg font-semibold text-gray-900 mb-4 text-center">
                        📚 읽은 내용 요약
                      </h5>
                      
                      {/* p.12까지의 요약 */}
                      <div className="bg-blue-50 rounded-lg p-6 border border-blue-200 mb-6">
                        <h6 className="text-lg font-bold text-blue-900 mb-3">
                          📖 p.12까지의 요약 정보
                        </h6>
                        <div className="bg-white rounded-lg p-4 border border-blue-100">
                          <p className="text-gray-800 leading-relaxed">
                            화자는 어린 시절 보아뱀 그림으로 오해받으며 화가의 꿈을 접고 비행사가 된다. 
                            사하라 사막에 불시착한 후 어린 왕자를 만나고, 왕자의 "양을 그려 달라"는 부탁을 
                            여러 번 거절하다가 결국 상자 그림으로 만족을 얻으며 두 사람의 만남이 시작된다.
                          </p>
                        </div>
                      </div>

                      {/* p.55까지의 요약 */}
                      <div className="bg-green-50 rounded-lg p-6 border border-green-200">
                        <h6 className="text-lg font-bold text-green-900 mb-3">
                          📖 p.55까지의 요약 정보
                        </h6>
                        <div className="bg-white rounded-lg p-4 border border-green-100">
                          <p className="text-gray-800 leading-relaxed mb-3">
                            화자는 어린 시절 보아뱀이 코끼리를 삼킨 그림을 그렸으나, 어른들이 이해하지 못해 화가의 꿈을 포기하고 비행사가 된다. 그러던 중 사하라 사막에 불시착하게 되고, 그곳에서 신비롭고 진지한 아이인 어린 왕자를 만난다. 어린 왕자는 "양을 그려 달라"고 부탁하며 화자와 친구가 된다.
                          </p>
                          <p className="text-gray-800 leading-relaxed mb-3">
                            대화를 나누며 어린 왕자가 작은 별(소행성 B612)에서 왔음을 알게 된다. 그 별에는 바오밥나무 같은 위험한 싹이 있어 매일 뽑아야 하고, 의자만 옮기면 여러 번 해질녘을 볼 수 있을 만큼 작다. 어린 왕자는 해질녘을 사랑하며, 그만큼 외롭고 쓸쓸한 마음을 드러낸다.
                          </p>
                          <p className="text-gray-800 leading-relaxed mb-3">
                            그는 특히 자신의 별에 핀 단 하나뿐인 꽃을 소중히 여긴다. 그 꽃은 까다롭고 허영심도 있지만, 동시에 연약한 존재였다. 어린 왕자는 꽃을 사랑했지만 그 마음을 제대로 표현하지 못했고, 꽃의 모순된 말들에 상처받아 결국 별을 떠나기로 결심한다. 꽃은 떠나는 순간에야 진심을 털어놓으며 어린 왕자를 사랑했다고 고백하지만, 이미 그는 철새들의 무리를 따라 여행길에 오른다.
                          </p>
                          <p className="text-gray-800 leading-relaxed mb-3">
                            별을 떠나기 전, 어린 왕자는 화산들을 청소하고 바오밥 씨앗을 뽑으며 자신의 별을 정리한다. 마지막으로 꽃에게 작별 인사를 나누는데, 꽃은 더 이상 유리 덮개도, 바람막이도 필요 없다며 자존심을 지킨 채 눈물을 감춘다. 어린 왕자는 아쉬움을 품고 떠난다.
                          </p>
                          <p className="text-gray-800 leading-relaxed">
                            그가 처음 방문한 별은 왕이 사는 별이다. 왕은 절대권력을 자처하지만, 실제로는 명령을 현실에 맞게 내리는 '겉만 위엄 있는 인물'이다. 어린 왕자는 왕의 권위가 허망하다는 것을 느끼고 곧 그곳을 떠난다.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* 구분선 */}
                    <div className="w-full h-px bg-gray-300 my-8"></div>
                  </>
                )}

                {/* 책 내용 (바로 읽기 모드에서는 요약 없이, 요약 보기 모드에서는 요약 아래에 표시) */}
                <div className="prose prose-lg max-w-none">
                  <div className="text-gray-800 leading-relaxed space-y-4">
                    {showSummary ? (
                      // 요약 보기 모드: 간단한 안내 텍스트
                      <>
                        <p>
                          위의 요약 정보를 확인했습니다. 이제 도서의 실제 내용을 읽어보세요.
                        </p>
                        <p>
                          페이지 네비게이션을 통해 이전/다음 페이지로 이동할 수 있으며,
                          각 페이지마다 해당 도서의 실제 내용이 렌더링됩니다.
                        </p>
                      </>
                    ) : (
                      // 바로 읽기 모드: 실제 책 내용 (하드코딩)
                      <>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                          어린 왕자 - 1장
                        </h3>
                        <p>
                          내가 여섯 살 때 한 번은 원시림을 다룬 『생명체 이야기』라는 책에서 굉장한 그림 하나를 본 적이 있는데. 
                          그건 야수를 한 입에 삼킨 보아 뱀에 관한 얘기였어. 여기 이 그림이 그거야.
                        </p>
                        <div className="text-center my-6">
                          <div className="inline-block p-4 bg-gray-100 rounded-lg">
                            <p className="text-lg font-semibold text-gray-700">황갈색 보아 뱀</p>
                          </div>
                        </div>
                        <p>
                          책엔 이렇게 쓰여 있더라고, 보아 뱀은 씹지도 않고 산 채로 먹이를 삼킨데. 
                          그런 다음엔 소화를 위해 여섯 달 동안 꿈쩍도 않고 잠만 잔데.
                        </p>
                        <p>
                          난 정말 이 얘기를 듣고 정글의 모험에 관한 많은 생각들이 들더라, 
                          이어 색연필로 내 첫 번째 그림을 그려보게 시작했지. 바로 이게 그거야.
                        </p>
                        <p>
                          어른들에게 내 걸작을 보여줬을 때, 그들이 겁에 질렸는지 물어봤어. 
                          "겁에 질릴 게 뭐가 있어?"라고 대답했어. "보아 뱀이 코끼리를 삼키는 그림인데."
                        </p>
                        <p>
                          그러자 어른들은 내 그림이 모자 모양이라고 했어. 
                          그래서 나는 보아 뱀을 그려서 코끼리를 삼키는 모습을 그렸어. 
                          어른들은 이해하지 못했어.
                        </p>
                      </>
                    )}
                  </div>
                </div>

                {/* 페이지 푸터 */}
                <div className="text-center mt-8 pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-500">
                    {currentPage}페이지
                  </p>
                </div>
              </div>
            </div>

            {/* 모달 푸터 */}
            <div className="p-6 border-t border-gray-200 bg-gray-50">
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  밀리의 서재에서 제공하는 도서 뷰어입니다.
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setCurrentPage(1)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    처음으로
                  </button>
                  <button
                    onClick={() => setCurrentPage(book?.totalPages || 1)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    마지막으로
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
