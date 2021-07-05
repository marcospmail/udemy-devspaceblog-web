import fs from 'fs'
import path from 'path'
import type { NextApiRequest, NextApiResponse } from 'next'
import matter from 'gray-matter'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let posts

  console.log('process.env.NODE_ENV', process.env.NODE_ENV)

  if (process.env.NODE_ENV === 'production') {

  }
  else {
    const files = fs.readdirSync(path.join('posts'))

    const matterFiles = files.map(v => {
      const fileContent = fs.readFileSync(path.join('posts', v), 'utf-8')

      const { data: frontmatter, content } = matter(fileContent)

      const slug = v.replace('.md', '')

      return {
        slug,
        frontmatter,
        content
      }
    })

    posts = matterFiles.filter(v => {
      const { title, excerpt, category } = v.frontmatter

      const searchedTerm = (req.query.q as string).toLowerCase()

      return title.toLowerCase().includes(searchedTerm) ||
        excerpt.toLowerCase().includes(searchedTerm) ||
        category.toLowerCase().includes(searchedTerm)
    })
  }

  res.status(200).json(posts ?? [])
}
