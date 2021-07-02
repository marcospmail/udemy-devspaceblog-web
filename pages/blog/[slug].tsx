/* eslint-disable @next/next/no-img-element */
import fs from 'fs'
import { GetStaticPropsResult } from 'next'
import path from 'path'
import matter from 'gray-matter'
import React from 'react'
import Layout from '../../components/Layout'
import Link from 'next/link'
import Image from 'next/image'
import marked from 'marked'

interface PostProps {
  content: string
  slug: string
  frontmatter: {
    [key: string]: string
  }
}

export default function BlogPost({ content, slug, frontmatter }: PostProps) {
  return (
    <Layout>
      <Link href="/blog">Go Back</Link>

      <div className="w-full px-10 py-6 bg-white rounded-lg mt-6 shadow-md ">
        <div className="flex justify-between items-center mt-4">
          <h1 className="text-5xl mb-7">{frontmatter.title}</h1>
        </div>

        <Image src={frontmatter.cover_image} alt="Cover image" className="w-full rounded" width={'100%'} height="100%" />

        <div className="flex justify-between items-center bg-gray-100 p-2 my-8">
          <div className="flex items-center">
            <img src={frontmatter.author_image} alt="Author" className="mx-4 w-10 h-10 object-cover rounded-full hidden sm:block" />
            <h4>{frontmatter.author}</h4>
          </div>
          <div className="mr-4">{frontmatter.date}</div>
        </div>

        <div className="blog-text mt-2">
          <div dangerouslySetInnerHTML={{ __html: marked(content) }} />
        </div>



      </div>
    </Layout>
  )
}

export function getStaticPaths() {
  const files = fs.readdirSync(path.join('posts'))

  const paths = files.map(v => ({
    params: {
      slug: v.replace('.md', '')
    }
  }))

  return {
    paths,
    fallback: false
  }
}


interface ContextProps {
  params: {
    slug: string
  }
}

export function getStaticProps(context: ContextProps): GetStaticPropsResult<PostProps> {
  const { slug } = context.params

  const file = fs.readFileSync(path.join(`posts/${slug}.md`))

  const { data: frontmatter, content } = matter(file)

  return {
    props: {
      content,
      frontmatter,
      slug
    }
  }
}
