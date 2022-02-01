import { Parent } from 'unist'
import { VFile } from 'vfile'
import { visit } from 'unist-util-visit'
import { load } from 'js-yaml'

export default function extractFrontmatter() {
  return (tree: Parent, file: VFile) => {
    visit(tree, 'yaml', (node: Parent) => {
      //@ts-ignore
      file.data.frontmatter = load(node.value)
    })
  }
}
