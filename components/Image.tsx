import NextImage, { ImageProps } from 'next/image'

const Image = ({ src, ...rest }: ImageProps) => (
  <NextImage src={`/stephondoestech_personal_blog${src}`} {...rest} />
)

export default Image