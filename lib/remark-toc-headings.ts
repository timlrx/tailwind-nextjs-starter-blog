//@ts-nocheck
import { Parent } from 'unist'
import { visit } from 'unist-util-visit'
import { slug } from 'github-slugger'
import { toString } from 'hast-util-to-string'

export default function remarkTocHeadings(options) {
  return (tree: Parent) =>
    visit(tree, 'heading', (node) => {
      const textContent = toString(node)
      options.exportRef.push({
        value: textContent,
        url: '#' + slug(textContent),
        depth: node.depth,
      })
    })
}
