import { slug } from 'github-slugger'

const kebabCase = (str: string) => slug(str)

export default kebabCase
