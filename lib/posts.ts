import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

import { Post } from "@/types/index";

import { sortPostsByDate } from '@/utils/index'

export function getPosts() {
  const files = fs.readdirSync(path.join('posts'))

  const posts = files.map(v => {
    const slug = v.replace('.md', '')

    const mardownWithMeta = fs.readFileSync(
      path.join('posts', v),
      'utf-8'
    )

    const { data: frontmatter } = matter(mardownWithMeta)

    return {
      slug,
      frontmatter
    }
  }) as Post[]

  return posts.sort(sortPostsByDate)
}

export function getCategories(posts: Post[]) {
  const categories = posts.map(v => v.frontmatter.category)
  return [...new Set(categories)]
}