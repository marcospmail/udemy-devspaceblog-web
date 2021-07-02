
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

import Layout from '../../../components/Layout'
import Post from '../../../components/Post'
import Pagination from '../../../components/Pagination'

import { Post as PostType } from "../../../types";

import { sortPostsByDate } from '../../../utils'
import { GetStaticPropsResult } from 'next'

const POSTS_PER_PAGE = 3

interface HomeProps {
  posts: PostType[]
  currentPage: number
  numPages: number
}

export default function PageBlog({ posts, currentPage, numPages }: HomeProps) {
  return (
    <Layout>
      <h1 className="text-5xl border-b-4 p-5 font-bold">Latest Posts</h1>

      <div className="p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {posts.map((v, index) => (
          <Post key={index} post={v} />
        ))}

      </div>

      <Pagination currentPage={currentPage} numPages={numPages}  />

    </Layout>
  )
}

export function getStaticPaths() {
  const files = fs.readdirSync(path.join('posts'))

  const numPages = Math.ceil(files.length / POSTS_PER_PAGE)

  const paths = Object.keys([...new Array(numPages)]).map(i => Number(i) + 1).map(v => ({
    params: {
      page_index: String(v)
    }
  }))

  console.log(paths)

  return {
    paths,
    fallback: false
  }
}

interface ContextProps {
  params: {
    page_index: string
  }
}

export function getStaticProps(context: ContextProps): GetStaticPropsResult<HomeProps> {
  const page_index = context.params?.page_index || 1

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
  }) as PostType[]

  const numPages = Math.ceil(files.length / POSTS_PER_PAGE)
  const pageIndex = Number(page_index) - 1

  const slicedPosts = posts
    .sort(sortPostsByDate)
    .slice(pageIndex * POSTS_PER_PAGE, (pageIndex + 1) * POSTS_PER_PAGE)

  return {
    props: {
      posts: slicedPosts,
      numPages,
      currentPage: Number(page_index)
    }
  }
}