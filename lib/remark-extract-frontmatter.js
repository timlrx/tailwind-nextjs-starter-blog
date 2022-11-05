import { visit } from 'unist-util-visit'
import { load } from 'js-yaml'

export default function extractFrontmatter() {
  return (tree, file) => {
    visit(tree, 'yaml', (node) => {
      file.data.frontmatter = load(node.value)
    })
  }
}
