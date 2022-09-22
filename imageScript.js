const images = [
  "public/static/images/productivity/axolo.png",
  "public/static/images/productivity/dewo.jpg",
  "public/static/images/productivity/flux.jpg",
  "public/static/images/productivity/raycast.png",
  "public/static/images/productivity/timely.png",
  "public/static/images/productivity/tuple.png",
]

var sizeOf = require("image-size")

function printImageComponentWithSize(imgSrc) {
  sizeOf(imgSrc, function (err, dimensions) {
    const { width, height } = dimensions
    const imgAlt = imgSrc.split("/")[imgSrc.split("/").length - 1].split(".")[0]
    const src = imgSrc.replace("public", "blog")
    console.log(
      `<ImageContainer alt="${imgAlt}" src="/${src}" classNameDiv="" classNameImage='' width={${width}} height={${height}} /> `
    )
  })
}

function main() {
  for (const image of images) {
    printImageComponentWithSize(image)
  }
}

main()
