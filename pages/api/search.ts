import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log('process.env.NODE_ENV', process.env.NODE_ENV)

  let posts = require('../../cache/data').posts

  posts = posts.filter((v: any) => {
    const { title, excerpt, category } = v.frontmatter

    const searchedTerm = (req.query.q as string).toLowerCase()

    return title.toLowerCase().includes(searchedTerm) ||
      excerpt.toLowerCase().includes(searchedTerm) ||
      category.toLowerCase().includes(searchedTerm)
  })

  res.status(200).json(posts ?? [])
}
