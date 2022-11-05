import { visit } from 'unist-util-visit'
import { slug } from 'github-slugger'
import { toString } from 'mdast-util-to-string'

export default function remarkTocHeadings(options) {
  return (tree) =>
    visit(tree, 'heading', (node) => {
      const textContent = toString(node)
      options.exportRef.push({
        value: textContent,
        url: '#' + slug(textContent),
        depth: node.depth,
      })
    })
}
