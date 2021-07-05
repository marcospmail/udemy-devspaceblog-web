import fs from 'fs'
import path from 'path'
import type { NextApiRequest, NextApiResponse } from 'next'
import matter from 'gray-matter'
import { getPosts } from 'lib/posts'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let posts : any[]

  console.log('process.env.NODE_ENV', process.env.NODE_ENV)

  // if (process.env.NODE_ENV === 'production') {
    posts = require('../../cache/data').posts
  // }
  // else {
  //   posts = getPosts()
  // }

  posts = posts.filter(v => {
    const { title, excerpt, category } = v.frontmatter

    const searchedTerm = (req.query.q as string).toLowerCase()

    return title.toLowerCase().includes(searchedTerm) ||
      excerpt.toLowerCase().includes(searchedTerm) ||
      category.toLowerCase().includes(searchedTerm)
  })

  res.status(200).json(posts ?? [])
}
