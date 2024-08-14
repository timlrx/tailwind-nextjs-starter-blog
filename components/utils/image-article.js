import Image from "next/image"
import classNames from "./classNames"

export const YellowCalloutBox = ({ emoji, title, children }) => {
  return (
    <div className="callout-box">
      <span className="emoji">{emoji}</span>
      <div className="content">
        <h2 className="title">{title}</h2>
        <div className="description">{children}</div>
      </div>
      <style jsx>{`
        .callout-box {
          border: 2px solid #f7d154;
          background-color: #fff4cc;
          padding: 20px;
          display: flex;
          align-items: start;
          border-radius: 10px;
          margin: 20px 0;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .emoji {
          font-size: 30px;
          margin-right: 20px;
          flex-shrink: 0;
        }
        .content {
          flex: 1;
        }
        .title {
          font-size: 20px;
          margin-bottom: 10px;
          margin-top: 15px;
          color: #333;
        }
        .description {
          font-size: 16px;
          line-height: 1.5;
          color: #666;
        }
      `}</style>
    </div>
  )
}

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
      <h2
        style={{
          fontSize: "32px",
          fontWeight: "bold",
          margin: "0",
          color: "#333",
        }}
      >
        {"“" + title + "”"}
      </h2>
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
