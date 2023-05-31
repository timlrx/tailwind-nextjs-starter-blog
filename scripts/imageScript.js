// Here put the folder name and it will create a component for each image that he can

const folder = "public/static/images/fixedIP/"

var sizeOf = require("image-size")
var fs = require("fs")
var files = fs.readdirSync(folder)

function printImageComponentWithSize(imgSrc) {
  sizeOf(imgSrc, function (err, dimensions) {
    if (dimensions) {
      const { width, height } = dimensions
      const imgAlt = imgSrc.split("/")[imgSrc.split("/").length - 1].split(".")[0]
      const src = imgSrc.replace("public", "blog")
      console.log(
        `<ImageContainer alt="${imgAlt}" src="/${src}" classNameDiv="mx-10 lg:mx-20" classNameImage='' width={${width}} height={${height}} /> `
      )
    }
  })
}

function main() {
  for (const image of files) {
    printImageComponentWithSize(`${folder}${image}`)
  }
}

main()
