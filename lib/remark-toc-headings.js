import { visit } from 'unist-util-visit'

export default function remarkTocHeadings(options) {
  return (tree) =>
    visit(tree, 'heading', (node, index, parent) => {
      options.exportRef.push({
        value: node.children[0].value || node.children[1].value,
        url: node.children[0].url || node.children[1].url,
        depth: node.depth,
      })
    })
}
