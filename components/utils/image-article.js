import Image from "next/image"
import classNames from "./classNames"

export const Callout = ({ title, subtitle }) => {
  return (
    <div
      style={{
        backgroundColor: "#f5f5f5",
        border: "1px solid #ddd",
        padding: "30px",
        borderRadius: "25px",
        boxShadow: "0px 10px 20px rgba(0,0,0,0.1)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 0.3s ease",
      }}
    >
      <h1
        style={{
          fontSize: "32px",
          fontWeight: "bold",
          margin: "0",
          color: "#333",
        }}
      >
        {"“" + title + "”"}
      </h1>
      {subtitle && (
        <p style={{ fontSize: "20px", margin: "20px 0 0 0", color: "#666" }}>{"— " + subtitle}</p>
      )}
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
