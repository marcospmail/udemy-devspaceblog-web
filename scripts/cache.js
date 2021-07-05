const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')

function getPostData() {
  const files = fs.readdirSync(path.join('posts'))

  let posts = files.map(v => {
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

  posts = posts.sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime())

  return `export const posts = ${JSON.stringify(posts)}`
}

try {
  fs.readdirSync('cache')
} catch {
  fs.mkdirSync('cache')
}

fs.writeFile('cache/data.js', getPostData(), err => {
  if (err) return console.log(err)
  console.log('generated posts data...')
})
