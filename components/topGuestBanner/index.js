import { ImageContainer } from "../utils/image-article"

export default function TopGuestBanner({ text, imageUrl }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row-reverse",
      }}
    >
      <ImageContainer
        alt="blake-acheson"
        src={imageUrl}
        classNameDiv="mx-10 lg:mx-20"
        classNameImage=""
        width={150}
        height={150}
        style={{ maxWidth: "100%", height: "auto", marginLeft: "20px" }}
      />
      <p style={{ flex: 1 }}>{text}</p>
    </div>
  )
}
