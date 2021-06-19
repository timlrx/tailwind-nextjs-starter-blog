'use strict'
const fs = require('fs')
var inquirer = require('inquirer')
inquirer
  .prompt([
    {
      name: 'title',
      message: 'What shall be the Post Title ?',
      type: 'input',
    },
    {
      name: 'extention',
      message: 'What shall be the Post Extention ?',
      type: 'list',
      choices: ['md', 'mdx'],
    },
    {
      name: 'draft',
      message: 'Shall it be a draft ? ( yes/no )',
      type: 'input',
    },
    {
      name: 'tags',
      message: 'Any Tags ? Use , to seperate. Leave if no tags',
      type: 'input',
    },
  ])
  .then((answers) => {
    // Remove special characters and replace space with -
    const fileName = answers.title
      .toLowerCase()
      .replace(/[^a-zA-Z0-9 ]/g, '')
      .replace(/ /g, '-')
      .replace(/-+/g, '-');
    let d = new Date();
    const date = [
      d.getFullYear(),
      ('0' + (d.getMonth() + 1)).slice(-2),
      ('0' + d.getDate()).slice(-2),
    ].join('-');
    var tagArray = answers.tags.split(',');
    tagArray.forEach((tag,index) => tagArray[index] = tag.trim());
    const tags = "'" + tagArray.join("','") + "'"
    // No Weird Stuff
    const frontMatter = `---\ntitle: ${answers.title?answers.title:'Untitled'}\ndate: '${date}'\ntags: [${answers.tags?tags:''}]\ndraft: ${answers.draft.toLowerCase() == 'no' ? 'false' : 'true'}\nsummary: \nimages: []\n---`
    fs.writeFile(`data/blog/${fileName?fileName:'untitled'}.${answers.extention?answers.extention:'md'}`, frontMatter, (err) => {
      if (err) throw err
    })
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.log("Prompt couldn't be rendered in the current environment")
    } else {
      console.log('Something Went Wrong, Oopsie!')
    }
  })
