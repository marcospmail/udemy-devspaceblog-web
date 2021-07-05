import Post from '@/components/Post'

import { Post as PostType } from "@/types/index";
import { useRouter } from 'next/dist/client/router';
import { useEffect } from 'react';

interface SearchResultProps {
  results: PostType[]
}

export default function SearchResults({ results }: SearchResultProps) {
  return (
    <div className="absolute top-20 right-0 border-4 border-gray-500 bg-white text-black w-96 rounded-2xl overflow-y-scroll" style={{ height: '80vh' }}>
      <div className="p-10">
        {results.map((result, index) => (
          <Post key={index} post={result} compact/>
        ))}

      </div>
    </div>
  )
}
