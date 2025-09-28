
import React, { useEffect, useRef, useState } from 'react'


export default function SearchBar({
  onSearch,
  query,
  onOpenPost,
  onNavigateManage,
  debounce = 300
}) {
  const [val, setVal] = useState(query || '')
  const mounted = useRef(false)
  const timer = useRef(null)

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true
      return
    }
    setVal(query || '')
  }, [query])

  useEffect(() => {

    if (timer.current) clearTimeout(timer.current)
    if (val.trim() === '') {
      if (typeof onSearch === 'function') onSearch('') 
      return
    }
    timer.current = setTimeout(() => {
      if (typeof onSearch === 'function') onSearch(val)
    }, debounce)

    return () => {
      if (timer.current) clearTimeout(timer.current)
    }
  }, [val, onSearch, debounce])

  function handleSubmit(e) {
    e.preventDefault()
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-3 justify-center mt-5">
      <input
        value={val}
        onChange={(e) => setVal(e.target.value)}
        className="w-2/3 md:w-1/2 px-4 py-3 rounded-lg border-2 border-black focus:outline-none focus:ring-2 focus:ring-white text-gray-800"
        placeholder="Enter name or keyword"
        aria-label="Search jobs"
      />

      {/* optional: keep search button for accessibility or manual search */}
      <button
        type="button"
        onClick={() => typeof onSearch === 'function' && onSearch(val)}
        className="cursor-pointer px-4 py-3 border rounded-lg bg-white text-gray-800 hover:text-white hover:bg-purple-800"
      >
        Search
      </button>

      <button
        type="button"
        onClick={() => typeof onOpenPost === 'function' && onOpenPost()}
        className="cursor-pointer px-4 py-3 bg-green-600 text-white rounded-lg"
      >
        + Post a Job
      </button>

      <button
        type="button"
        onClick={() => typeof onNavigateManage === 'function' && onNavigateManage()}
        className="cursor-pointer ml-2 px-4 py-3 border rounded-lg bg-green-600 text-white"
      >
        Manage Jobs
      </button>
    </form>
  )
}
