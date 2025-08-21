'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'

export default function ApiExample() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchPosts = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=5')
      setPosts(response.data)
    } catch (err) {
      setError('데이터를 불러오는 중 오류가 발생했습니다.')
      console.error('Error fetching posts:', err)
    } finally {
      setLoading(false)
    }
  }

  const createPost = async () => {
    try {
      const newPost = {
        title: '새로운 포스트',
        body: 'Axios를 사용한 POST 요청 예제입니다.',
        userId: 1
      }
      
      const response = await axios.post('https://jsonplaceholder.typicode.com/posts', newPost)
      setPosts(prev => [response.data, ...prev])
    } catch (err) {
      setError('포스트 생성 중 오류가 발생했습니다.')
      console.error('Error creating post:', err)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">API 통신 예제</h1>
        
        <div className="mb-6 flex gap-4">
          <button
            onClick={fetchPosts}
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? '로딩 중...' : '포스트 불러오기'}
          </button>
          
          <button
            onClick={createPost}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            새 포스트 생성
          </button>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <div className="grid gap-4">
          {posts.map((post) => (
            <div key={post.id} className="p-4 border rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
              <p className="text-gray-600">{post.body}</p>
              <div className="mt-2 text-sm text-gray-500">
                Post ID: {post.id} | User ID: {post.userId}
              </div>
            </div>
          ))}
        </div>

        {posts.length === 0 && !loading && (
          <div className="text-center text-gray-500 py-8">
            포스트가 없습니다. 위의 버튼을 클릭하여 데이터를 불러오세요.
          </div>
        )}
      </div>
    </div>
  )
}
