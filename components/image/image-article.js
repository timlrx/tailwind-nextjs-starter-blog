import Image from "next/image";

export default function ImageArticle({ src, width, height }) {
  return <Image src={src} width={width} height={height} />;
}
