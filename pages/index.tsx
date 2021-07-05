import Link from 'next/link'

import Layout from '@/components/Layout'
import Post from '@/components/Post'

import { Post as PostType } from "@/types/index";

import { getPosts } from 'lib/posts'

interface HomeProps {
  posts: PostType[]
}

export default function Home({ posts }: HomeProps) {
  return (
    <Layout>
      <h1 className="text-5xl border-b-4 p-5 font-bold">Latest Posts</h1>

      <div className="p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {posts.map((v, index) => (
          <Post key={index} post={v} />
        ))}
      </div>

      <Link href="/blog">
        <a className="block border text-center border-gray-500 text-gray-800 rounded-md py-4 my-5 transition duration-500 ease select-none hover:text-white hover:bg-gray-900 focus:outline-none focus:shadow-outline w-full" >
          All posts
        </a>
      </Link>

    </Layout>
  )
}

export function getStaticProps() {
  const posts = getPosts()

  return {
    props: {
      posts: posts.slice(0, 6)
    }
  }
}