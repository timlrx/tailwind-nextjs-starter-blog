import NextImage, { ImageProps } from 'next/image'

const Image = ({ src, ...rest }: ImageProps) => (
  <NextImage src={`/tailwind-nextjs-starter-blog${src}`} {...rest} />
)

export default Image
