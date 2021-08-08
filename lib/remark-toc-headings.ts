//@ts-nocheck
import { Parent } from 'unist'
import visit from 'unist-util-visit'

export default function (options) {
  return (tree: Parent) =>
    visit(tree, 'heading', (node, index, parent) => {
      options.exportRef.push({
        value: node.children[1].value,
        url: node.children[0].url,
        depth: node.depth,
      })
    })
}
