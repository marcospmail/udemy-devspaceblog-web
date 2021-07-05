
import fs from 'fs'
import path from 'path'
import { GetStaticPropsResult } from 'next'

import Layout from '@/components/Layout'
import Post from '@/components/Post'
import Pagination from '@/components/Pagination'
import CategoryList from '@/components/CategoryList'

import { Post as PostType } from "@/types/index";

import { getCategories, getPosts } from 'lib/posts'

const POSTS_PER_PAGE = 3

interface HomeProps {
  posts: PostType[]
  currentPage: number
  numPages: number
  categories: string[]
}

export default function PageBlog({ posts, currentPage, numPages, categories }: HomeProps) {
  return (
    <Layout>

      <main className="flex justify-between">
        <div className="w-3/4 mr-10">

          <h1 className="text-5xl border-b-4 p-5 font-bold">Latest Posts</h1>

          <div className="p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {posts.map((v, index) => (
              <Post key={index} post={v} />
            ))}

          </div>

          <Pagination currentPage={currentPage} numPages={numPages} />

        </div>

        <aside className="w-1/4">
          <CategoryList categories={categories} />
        </aside>

      </main>

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

  const posts = getPosts()

  const numPages = Math.ceil(posts.length / POSTS_PER_PAGE)
  const pageIndex = Number(page_index) - 1

  const slicedPosts = posts
    .slice(pageIndex * POSTS_PER_PAGE, (pageIndex + 1) * POSTS_PER_PAGE)

  const categories = getCategories(posts)

  return {
    props: {
      posts: slicedPosts,
      numPages,
      currentPage: Number(page_index),
      categories
    }
  }
}