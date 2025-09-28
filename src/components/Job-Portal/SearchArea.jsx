import React from 'react'
import SearchBar from './Searchbar'

const SearchArea = ({ onSearch, query, onOpenPost, onNavigateManage }) => {
  return (
    <SearchBar onSearch={onSearch} query={query} onOpenPost={onOpenPost} onNavigateManage={onNavigateManage} />
  )
}

export default SearchArea
