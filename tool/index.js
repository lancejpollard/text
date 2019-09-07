
const cheerio = require('cheerio')
const path = require('path')
const fs = require('fs')

module.exports = load

function load(file) {
  const html = fs.readFileSync(path.join(__dirname, `../content/${file}.md`))
  const $ = cheerio.load(`<body>${html}</body>`)
  const data = {}
  let node = data

  $('body').children().each(x => {
    if (x.hasClass('title')) {
      node.title = x.text()
    } else if (x.hasClass('subtitle')) {
      node.subtitle = x.text()
    } else if (x.hasClass('line')) {
      node.children = node.children || []
      node.children.push({
        type: 'line',
        value: x.text()
      })
    } else if (x.hasClass('block')) {
      node.children = node.children || []
      let block = {}
      node.children.push(block)
      node = block
    }
  })

  return data
}
