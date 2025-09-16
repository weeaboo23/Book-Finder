import React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null

  const handlePrev = () => {
    if (page > 1) onPageChange(page - 1)
  }

  const handleNext = () => {
    if (page < totalPages) onPageChange(page + 1)
  }

  return (
    <div className="flex items-center justify-center gap-3 mt-8 flex-wrap">
      {/* Previous button */}
      <button
        onClick={handlePrev}
        disabled={page === 1}
        className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition ${
          page === 1
            ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
            : 'bg-indigo-600 hover:bg-indigo-700 text-white'
        }`}
      >
        <ChevronLeft className="w-4 h-4" />
        Prev
      </button>

      {/* Current page indicator */}
      <span className="px-3 py-2 text-sm font-medium bg-gray-100 dark:bg-gray-800 rounded-lg">
        Page {page} of {totalPages}
      </span>

      {/* Next button */}
      <button
        onClick={handleNext}
        disabled={page === totalPages}
        className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition ${
          page === totalPages
            ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
            : 'bg-indigo-600 hover:bg-indigo-700 text-white'
        }`}
      >
        Next
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  )
}
