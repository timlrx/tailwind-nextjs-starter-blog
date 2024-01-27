import NextImage, { ImageProps } from 'next/image';

const Image = ({ ...rest }: ImageProps) => <NextImage {...rest} />;

export default Image;
