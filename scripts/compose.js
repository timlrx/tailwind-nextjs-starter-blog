const fs = require('fs')
const path = require('path')
const inquirer = require('inquirer')
const dedent = require('dedent')

const root = process.cwd()

const getAuthors = () => {
  const authorPath = path.join(root, 'data', 'authors')
  const authorList = fs.readdirSync(authorPath).map((filename) => path.parse(filename).name)
  return authorList
}

const getLayouts = () => {
  const layoutPath = path.join(root, 'layouts')
  const layoutList = fs
    .readdirSync(layoutPath)
    .map((filename) => path.parse(filename).name)
    .filter((file) => file.toLowerCase().includes('post'))
  return layoutList
}

const genFrontMatter = (answers) => {
  let d = new Date()
  const date = [
    d.getFullYear(),
    ('0' + (d.getMonth() + 1)).slice(-2),
    ('0' + d.getDate()).slice(-2),
  ].join('-')
  const tagArray = answers.tags.split(',')
  tagArray.forEach((tag, index) => (tagArray[index] = tag.trim()))
  const tags = "'" + tagArray.join("','") + "'"
  const authorArray = answers.authors.length > 0 ? "'" + answers.authors.join("','") + "'" : ''

  let frontMatter = dedent`---
  title: "${answers.title ? answers.title : 'Untitled'}"
  date: '${date}'
  tags: [${answers.tags ? tags : ''}]
  draft: ${answers.draft === 'yes' ? true : false}
  summary: "${answers.summary ? answers.summary : ' '}"
  images: []
  layout: ${answers.layout}
  canonicalUrl: ${answers.canonicalUrl}
  `

  if (answers.authors.length > 0) {
    frontMatter = frontMatter + '\n' + `authors: [${authorArray}]`
  }

  frontMatter = frontMatter + '\n---'

  return frontMatter
}

inquirer
  .prompt([
    {
      name: 'title',
      message: 'Enter post title:',
      type: 'input',
    },
    {
      name: 'extension',
      message: 'Choose post extension:',
      type: 'list',
      choices: ['mdx', 'md'],
    },
    {
      name: 'authors',
      message: 'Choose authors:',
      type: 'checkbox',
      choices: getAuthors,
    },
    {
      name: 'summary',
      message: 'Enter post summary:',
      type: 'input',
    },
    {
      name: 'draft',
      message: 'Set post as draft?',
      type: 'list',
      choices: ['yes', 'no'],
    },
    {
      name: 'tags',
      message: 'Any Tags? Separate them with , or leave empty if no tags.',
      type: 'input',
    },
    {
      name: 'layout',
      message: 'Select layout',
      type: 'list',
      choices: getLayouts,
    },
    {
      name: 'canonicalUrl',
      message: 'Enter canonical url:',
      type: 'input',
    },
  ])
  .then((answers) => {
    // Remove special characters and replace space with -
    const fileName = answers.title
      .toLowerCase()
      .replace(/[^a-zA-Z0-9 ]/g, '')
      .replace(/ /g, '-')
      .replace(/-+/g, '-')
    const frontMatter = genFrontMatter(answers)
    if (!fs.existsSync('data/blog')) fs.mkdirSync('data/blog', { recursive: true })
    const filePath = `data/blog/${fileName ? fileName : 'untitled'}.${
      answers.extension ? answers.extension : 'md'
    }`
    fs.writeFile(filePath, frontMatter, { flag: 'wx' }, (err) => {
      if (err) {
        throw err
      } else {
        console.log(`Blog post generated successfully at ${filePath}`)
      }
    })
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.log("Prompt couldn't be rendered in the current environment")
    } else {
      console.log('Something went wrong, sorry!')
    }
  })
