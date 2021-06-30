import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Link from 'next/link'

import Layout from '../components/Layout'
import Post from '../components/Post'

export default function Home({ posts }) {
  console.log(posts)

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
  })

  return {
    props: {
      posts
    }
  }
}