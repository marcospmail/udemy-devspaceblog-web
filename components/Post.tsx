import React from "react";
import Image from 'next/image'
import Link from 'next/link'

import { Post as PostType } from '../types/index'

interface PostProps {
  post: PostType
}

export default function Post({ post }: PostProps) {
  return (
    <div className="w-full px-10 py-6 bg-white rounded-lg shadow-md mt-6 flex flex-col">
      <Image src={post.frontmatter.cover_image} alt='Post' height={420} width={600} className="mb-4 rounded" />

      <div className="flex justify-between items-center">
        <span className="front-light text-gray-600">
          {post.frontmatter.date}
        </span>
        <div>{post.frontmatter.category}</div>
      </div>

      <div className="mt-2 flex-1">
        <Link href={`/blob/${post.slug}`} >
          <a className="text-2xl text-gray-700 font-bold hover:underline">
            {post.frontmatter.title}
          </a>
        </Link>
        <p className="mt-2 text-gray-600 flex-1">{post.frontmatter.excerpt}</p>
      </div>

      <div className="flex justify-between items-center">
        <Link href={`/blog/${post.slug}`}>
          <a className="text-gray-900 hover:text-blue-600">Read More</a>
        </Link>

        <div className="flex items-center">
          <Image
            height={40}
            width={40}
            src={post.frontmatter.author_image}
            layout="intrinsic"
            alt=""
            className="mx-4 w-10 h-10 object-cover rounded-full hidden sm:block overflow-hidden"
          />
          <h3 className="text-gray-700 font-bold">{post.frontmatter.author}</h3>

        </div>

      </div>

    </div>
  )
}
