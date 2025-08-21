'use client'

import { useState } from 'react'

// Button 컴포넌트
function Button({ children, variant = 'primary', size = 'md', onClick, disabled = false }) {
  const baseClasses = 'font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2'
  
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500',
    success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500'
  }
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  }
  
  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

// Card 컴포넌트
function Card({ children, title, className = '' }) {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 ${className}`}>
      {title && (
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
        </div>
      )}
      <div className="p-6">
        {children}
      </div>
    </div>
  )
}

// Input 컴포넌트
function Input({ label, type = 'text', placeholder, value, onChange, error }) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
          error ? 'border-red-300' : 'border-gray-300'
        }`}
      />
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  )
}

// Modal 컴포넌트
function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" onClick={onClose}>
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        
        <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">{title}</h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Components() {
  const [inputValue, setInputValue] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedVariant, setSelectedVariant] = useState('primary')
  const [selectedSize, setSelectedSize] = useState('md')

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">컴포넌트 라이브러리</h1>
        
        <div className="grid gap-8">
          {/* Button 컴포넌트 섹션 */}
          <Card title="Button 컴포넌트">
            <div className="space-y-6">
              <div>
                <h4 className="text-md font-medium mb-3">Variant 선택</h4>
                <div className="flex gap-2 mb-4">
                  {['primary', 'secondary', 'success', 'danger', 'outline'].map((variant) => (
                    <button
                      key={variant}
                      onClick={() => setSelectedVariant(variant)}
                      className={`px-3 py-1 rounded text-sm ${
                        selectedVariant === variant
                          ? 'bg-blue-100 text-blue-800 border border-blue-300'
                          : 'bg-gray-100 text-gray-700 border border-gray-300'
                      }`}
                    >
                      {variant}
                    </button>
                  ))}
                </div>
                
                <h4 className="text-md font-medium mb-3">Size 선택</h4>
                <div className="flex gap-2 mb-4">
                  {['sm', 'md', 'lg'].map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-3 py-1 rounded text-sm ${
                        selectedSize === size
                          ? 'bg-blue-100 text-blue-800 border border-blue-300'
                          : 'bg-gray-100 text-gray-700 border border-gray-300'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <Button variant={selectedVariant} size={selectedSize}>
                  기본 버튼
                </Button>
                <Button variant={selectedVariant} size={selectedSize} disabled>
                  비활성화
                </Button>
              </div>
            </div>
          </Card>

          {/* Input 컴포넌트 섹션 */}
          <Card title="Input 컴포넌트">
            <div className="space-y-4">
              <Input
                label="이름"
                placeholder="이름을 입력하세요"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <Input
                label="이메일"
                type="email"
                placeholder="이메일을 입력하세요"
                error="올바른 이메일 형식이 아닙니다"
              />
              <Input
                label="비밀번호"
                type="password"
                placeholder="비밀번호를 입력하세요"
              />
            </div>
          </Card>

          {/* Modal 컴포넌트 섹션 */}
          <Card title="Modal 컴포넌트">
            <div className="space-y-4">
              <Button onClick={() => setIsModalOpen(true)}>
                모달 열기
              </Button>
              
              <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="샘플 모달"
              >
                <div className="space-y-4">
                  <p className="text-gray-600 dark:text-gray-300">
                    이것은 재사용 가능한 Modal 컴포넌트의 예제입니다.
                  </p>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                      취소
                    </Button>
                    <Button onClick={() => setIsModalOpen(false)}>
                      확인
                    </Button>
                  </div>
                </div>
              </Modal>
            </div>
          </Card>

          {/* 사용법 가이드 */}
          <Card title="컴포넌트 사용법">
            <div className="space-y-4 text-sm text-gray-600 dark:text-gray-300">
              <p>
                <strong>Button:</strong> variant, size, onClick, disabled props를 지원합니다.
              </p>
              <p>
                <strong>Card:</strong> title과 children을 받아 카드 형태의 레이아웃을 제공합니다.
              </p>
              <p>
                <strong>Input:</strong> label, type, placeholder, value, onChange, error props를 지원합니다.
              </p>
              <p>
                <strong>Modal:</strong> isOpen, onClose, title, children props를 받아 모달을 렌더링합니다.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
