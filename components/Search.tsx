import React, { useState, useEffect } from "react"
import { useRouter } from 'next/router'
import { FaSearch } from 'react-icons/fa'

import SearchResults from "@/components/SearchResults"

import { Post as PostType } from "../types";


export default function Search() {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResponse, setSearchResponse] = useState<PostType[]>([])

  const router = useRouter()

  useEffect(() => {
    router.events.on('routeChangeComplete', () => {
      setSearchTerm('')
    });
  }, [router.events])

  useEffect(() => {
    async function fetchPosts() {
      if (!searchTerm) {
        setSearchResponse([])
        return
      }

      const response = await fetch(`/api/search?q=${searchTerm}`)
      const data = await response.json()

      setSearchResponse(data)
    }

    fetchPosts()
  }, [searchTerm])

  return (
    <div className="relative p-4">
      <div className="container mx-auto flex items-center justify-center md:justify-end">
        <form className="flex bg-white rounded-full items-center text-gray-600 w-72">
          <input
            type="search"
            name="search"
            id="search"
            className="h-10 px-5 rounded-full text-sm focus:outline-none w-72"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search posts"
          />

          <FaSearch className="text-black mr-4" />
        </form>
      </div>

      {searchResponse.length > 0 && (
        <SearchResults results={searchResponse} />
      )}


    </div>
  )
}

