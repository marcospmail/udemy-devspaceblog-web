export interface Post {
  slug: string
  frontmatter: {
    cover_image: string
    date: string
    category: string
    title: string
    excerpt: string
    author: string
    author_image: string
  }
}