import React from "react";
import Image from 'next/image'
import Link from 'next/link'

import CategoryLabel from "./CategoryLabel";

import { Post as PostType } from '../types/index'

interface PostProps {
  post: PostType
  compact?: boolean
}

export default function Post({ post, compact }: PostProps) {
  return (
    <div className="w-full px-10 py-6 bg-white rounded-lg shadow-md mt-6 flex flex-col">
      {/* <Image src={post.frontmatter.cover_image} alt='Post' height={420} width={600} className="mb-4 rounded" /> */}
      {!compact && (
        <img src={post.frontmatter.cover_image} alt='Post' height={420} width={600} className="mb-4 rounded" />
      )}

      <div className="flex justify-between items-center mt-1">
        <span className="front-light text-gray-600">
          {post.frontmatter.date}
        </span>
        <CategoryLabel>{post.frontmatter.category}</CategoryLabel>
      </div>

      <div className="mt-2 flex-1">
        <Link href={`/blog/${post.slug}`} >
          <a className="text-2xl text-gray-700 font-bold hover:underline">
            {post.frontmatter.title}
          </a>
        </Link>
        <p className="mt-2 text-gray-600 flex-1">{post.frontmatter.excerpt}</p>
      </div>

      {!compact && (
        <div className="flex justify-between items-center">
          <Link href={`/blog/${post.slug}`}>
            <a className="text-gray-900 hover:text-blue-600">Read More</a>
          </Link>

          <div className="flex items-center">
            {/* <Image
            height={40}
            width={40}
            src={post.frontmatter.author_image}
            layout="intrinsic"
            alt=""
            className="mx-4 w-10 h-10 object-cover rounded-full hidden sm:block overflow-hidden"
          /> */}
            <img
              height={40}
              width={40}
              src={post.frontmatter.author_image}
              alt=""
              className="mx-4 w-10 h-10 object-cover rounded-full hidden sm:block overflow-hidden"
            />
            <h3 className="text-gray-700 font-bold">{post.frontmatter.author}</h3>

          </div>

        </div>
      )}

    </div>
  )
}

