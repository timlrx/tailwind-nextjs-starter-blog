import Image from '../Image'
import Link from '../Link'

export default function PaperAirplane() {
  const href =
    'https://www.freepik.com/free-vector/paper-airplane-send-with-dotted-lines-flat-style_59539123.htm#fromView=image_search_similar&page=1&position=0&uuid=d700597d-aa42-435f-9355-5336018da854'
  return (
    <div className="flex flex-col items-center">
      <Image
        src="/static/images/trang-hoang/paper_airplane_send_with_dotted_lines_flat_style-ai.svg"
        alt="Mô tả hình ảnh"
        style={{ maxWidth: 320, width: '100%' }}
        width={320}
        height={213}
        className="not-prose"
      />
      <p className="text-xs">
        Thiết kế bởi&nbsp;
        <Link href={href}>Freepik</Link>
      </p>
    </div>
  )
}
