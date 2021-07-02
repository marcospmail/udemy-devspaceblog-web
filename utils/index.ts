import { Post } from "../types";

export function sortPostsByDate(a: Post, b: Post) {
  return new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
}