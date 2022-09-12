const images = [
  "public/static/images/do/createappDO.jpg",
  "public/static/images/general/productivity.png",
]

var sizeOf = require("image-size")

function printImageComponentWithSize(imgSrc) {
  sizeOf(imgSrc, function (err, dimensions) {
    const { width, height } = dimensions
    const imgAlt = imgSrc.split("/")[imgSrc.split("/").length - 1].split(".")[0]
    console.log(
      `<ImageContainer alt={${imgAlt}} src={imgSrc} className="" classNameImage='' width={${width}} height={${height}} /> `
    )
  })
}

function main() {
  for (const image of images) {
    printImageComponentWithSize(image)
  }
}

main()
