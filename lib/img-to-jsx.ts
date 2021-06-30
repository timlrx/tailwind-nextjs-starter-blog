import { Parent, Node } from 'unist'
import visit from 'unist-util-visit'
import sizeOf from 'image-size'
import fs from 'fs'

export default (options) => (tree: Node) => {
  visit<Node>(
    tree,
    // only visit p tags that contain an img element
    (node: Parent): node is Parent =>
      node.type === 'paragraph' && node.children.some((n) => n.type === 'image'),
    (node: Parent) => {
      const imageNode = node.children.find((n) => n.type === 'image')

      // only local files
      if (fs.existsSync(`${process.cwd()}/public${imageNode.url}`)) {
        const dimensions = sizeOf(`${process.cwd()}/public${imageNode.url}`)

        // Convert original node to next/image
        imageNode.type = 'jsx'
        imageNode.value = `<Image
          alt={\`${imageNode.alt}\`} 
          src={\`${imageNode.url}\`}
          width={${dimensions.width}}
          height={${dimensions.height}}
      />`

        // Change node type from p to div to avoid nesting error
        node.type = 'div'
        node.children = [imageNode]
      }
    }
  )
}
