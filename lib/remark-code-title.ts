import { Parent } from 'unist'
import visit from 'unist-util-visit'

export default function codeTitles() {
  return (tree: Parent & { lang?: string }) =>
    visit(tree, 'code', (node: Parent & { lang?: string }, index) => {
      const nodeLang = node.lang || ''
      let language = ''
      let title = ''

      if (nodeLang.includes(':')) {
        language = nodeLang.slice(0, nodeLang.search(':'))
        title = nodeLang.slice(nodeLang.search(':') + 1, nodeLang.length)
      }

      if (!title) {
        return
      }

      const className = 'remark-code-title'

      const titleNode = {
        type: 'mdxJsxFlowElement',
        name: 'div',
        attributes: [{ type: 'mdxJsxAttribute', name: 'className', value: className }],
        children: [{ type: 'text', value: title }],
        data: { _xdmExplicitJsx: true },
      }

      tree.children.splice(index, 0, titleNode)
      node.lang = language
    })
}
