import React from 'react'

const QuestionSkeleton = () => {
  return (
     <div className="p-6 max-w-2xl mx-auto animate-pulse">
      <div className="h-6 bg-gray-300 rounded mb-4 w-3/4"></div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-300 rounded w-full"></div>
        <div className="h-4 bg-gray-300 rounded w-5/6"></div>
        <div className="h-4 bg-gray-300 rounded w-2/3"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
      </div>
      <div className="mt-6 h-10 w-32 bg-gray-300 rounded"></div>
    </div>
  )
}

export default QuestionSkeleton