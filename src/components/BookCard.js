'use client'

import Link from 'next/link'

const BookCard = ({ book }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      {/* 책 이미지 */}
      {book.image_url ? (
        <div className="relative h-48 bg-gray-200 dark:bg-gray-700 overflow-hidden">
          <img 
            src={book.image_url} 
            alt={`${book.title} 표지`}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            onError={(e) => {
              // 이미지 로드 실패 시 기본 이미지로 대체
              e.target.style.display = 'none'
              e.target.nextSibling.style.display = 'flex'
            }}
          />
          {/* 이미지 로드 실패 시 표시할 아이콘 */}
          <div className="hidden absolute inset-0 items-center justify-center bg-gray-200 dark:bg-gray-700">
            <svg className="h-16 w-16 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
      ) : (
        <div className="h-48 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 flex items-center justify-center">
          <div className="text-center">
            <span className="text-6xl">📚</span>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">표지 이미지 없음</p>
          </div>
        </div>
      )}
      
      {/* 책 정보 */}
      <div className="p-6">
        {/* 책 제목 */}
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 min-h-[3rem]">
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
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
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
  )
}

export default BookCard
