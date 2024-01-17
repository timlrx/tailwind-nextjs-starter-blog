import NextImage, { ImageProps } from 'next/image'

const Image = ({ src, ...rest }: ImageProps) => (
  <NextImage src={`/jcarloscandela-blog${src}`} {...rest} />
)

export default Image
