import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { GetStaticPropsResult } from 'next'

import Layout from '@/components/Layout'
import Post from '@/components/Post'
import CategoryList from '@/components/CategoryList'

import { Post as PostType } from "@/types/index";

import { sortPostsByDate } from '@/utils/index'

import { getPosts, getCategories } from 'lib/posts'

interface CategoryNameProps {
  posts: PostType[]
  currentCategory: string,
  categories: string[]
}

export default function Home({ posts, currentCategory, categories }: CategoryNameProps) {
  return (
    <Layout>
      <main className="flex justify-between">
        <div className="w-3/4 mr-10">

          <h1 className="text-5xl border-b-4 p-5 font-bold">Posts in {currentCategory}</h1>

          <div className="p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {posts.map((v, index) => (
              <Post key={index} post={v} />
            ))}
          </div>


        </div>

        <aside className="w-1/4">
          <CategoryList categories={categories} currentCategory={currentCategory} />
        </aside>

      </main>

    </Layout>
  )
}

export function getStaticPaths() {
  const files = fs.readdirSync(path.join('posts'))

  const paths = files.map(v => {
    const fileContent = fs.readFileSync(path.join('posts', v), 'utf-8')

    const { data: frontmatter } = matter(fileContent)

    return {
      params: {
        category_name: frontmatter.category.toLowerCase()
      }
    }
  })

  return {
    paths,
    fallback: false
  }
}

interface ContextProps {
  params: {
    category_name: string
  }
}

export function getStaticProps(context: ContextProps): GetStaticPropsResult<CategoryNameProps> {
  const posts = getPosts()
  const categories = getCategories(posts)

  const currentCategory = context.params.category_name
  const filteredPosts = posts.filter(v => v.frontmatter.category.toLowerCase() === currentCategory)

  return {
    props: {
      posts: filteredPosts.sort(sortPostsByDate),
      currentCategory,
      categories
    }
  }
}