import { slug } from 'github-slugger'

const kebabCase = (str) => slug(str)

export default kebabCase
