import { visit } from 'unist-util-visit'
import { slug } from 'github-slugger'

export default function remarkTocHeadings(options) {
  return (tree) =>
    visit(tree, 'heading', (node, index, parent) => {
      options.exportRef.push({
        value: node.children[0].value,
        url: '#' + slug(node.children[0].value),
        depth: node.depth,
      })
    })
}
