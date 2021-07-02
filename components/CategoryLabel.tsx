import Link from 'next/link'

interface CategoryLabelProps {
  children: string
}

const colorKey = {
  javascript: 'yellow',
  css: 'blue',
  python: 'green',
  php: 'purple',
  ruby: 'red'
}

export default function CategoryLabel({ children }: CategoryLabelProps) {

  function getBackgroundColor() {
    if (!Object.keys(colorKey).includes(children.toLowerCase())) return ''

    return colorKey[children.toLowerCase() as keyof typeof colorKey]
  }

  return (
    <div className={`px-2 py-1 bg-${getBackgroundColor()}-600 text-gray-100 font-bold rounded`}>
      <Link href={`/blog/category/${children.toLowerCase()}`}>{children}</Link>
    </div>
  )

}