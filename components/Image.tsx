/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import NextImage, { ImageProps } from 'next/image'

// @ts-ignore
const Image = ({ ...rest }: ImageProps) => <img {...rest} />

export default Image
