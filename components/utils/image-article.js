import Image from "next/image"
import classNames from "./classNames"

export const Callout = ({ emoji = "💡", title, subtitle }) => {
  return (
    <div
      style={{
        backgroundColor: "#fef8f1",
        border: "1px solid #fdd2a4",
        padding: "20px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div style={{ padding: "10px", marginRight: "20px", display: "inline-flex" }}>
        <span style={{ fontSize: "42px", fontWeight: "bold" }}>{emoji}</span>
      </div>
      <div>
        <p style={{ fontSize: "24px", fontWeight: "bold", margin: "0", color: "#6d4c41" }}>
          {title}
        </p>
        {subtitle && (
          <p style={{ fontSize: "16px", margin: "10px 0 0 0", color: "#8d6e63" }}>{subtitle}</p>
        )}
      </div>
    </div>
  )
}

export const ImageContainer = ({
  src,
  alt,
  width,
  height,
  classNameDiv = "",
  classNameImage = "",
}) => {
  return (
    <div
      className={classNames(
        "m-8 flex justify-center rounded-lg shadow-lg",
        classNameDiv.length > 0 && classNameDiv
      )}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={classNames("rounded-lg ", classNameImage.length > 0 && classNameImage)}
      />
    </div>
  )
}
