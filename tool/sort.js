
const path = require('path')
const fs = require('fs')

const regex = {
  bul: /[\w\u0430-\u044f]+/g,
  // amh: /[\u4608-\u5017\u11648-\u11743]+/g
  amh: /[^\s\.,;:\?!"'።፥፤]+/g,
  ara: /[^\s\.,;:\?!"'\(\)\*]+/g,
  san: /[^\s\.,;:\?!"'\(\)\|]+/g,
  rus: /[\w\u0430-\u044f]+/g,
  heb: /[^\s\.,;:\?!"'\(\)\*׃]+/g,
  jap: /[\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]+/g,
  // kor: /[\u1100-\u11FF\u3130-\u318F\uA960-\uA97F\uAC00-\uD7AF\uD7B0-\uD7FF]+/g,
  tib: /[^\s\.,;:\?!"'\(\)\*༄༈༉་།༎༴༺༻༼༽༑a-zA-Z0-9\]\[]+/g,
  cop: /[^\s\.,;:\?!"'-]+/g,
  gre: /[^\s\.,;:\?!"']+/g,
  tha: /[^\s\.,;:\?!"'`]+/g,
  tel: /[^\s\.,;:\?!"'`]+/g,
  kan: /[^\s\.,;:\?!"'`]+/g,
  mal: /[^\s\.,;:\?!"'`]+/g,
  spa: /[^\s\.,;:\?!"'`\(\)\-¡¿]+/g,
  ita: /[^\s\.,;:\?!"'`\(\)\-¡¿«»]+/g,
  guj: /[^\s\.,;:\?!"'`\(\)\-¡¿«»\]\[a-zA-Z0-9]+/g,
  afr: /[^\s\.,;:\?!"'`\(\)\-¡¿«»\]\[]+/g,
  fin: /[^\s\.,;:\?!"'`\(\)\-¡¿«»\]\[]+/g,
  ind: /[^\s\.,;:\?!"'`\(\)\-¡¿«»\]\[]+/g,
  arm: /[^\s\.,;:\?!"'`\(\)\-¡¿«»\]\[]+/g,
  vie: /[^\s\.,;:\?!"'`\(\)¡¿«»\]\[]+/g,
  tam: /[^\s\.,;:\?!"'`\(\)¡¿«»\]\[]+/g,
  ben: /[^\s\.,;:\?!"'`\(\)¡¿«»\]\[…]+/g,
  por: /[^\s\.,;:\?!"'`\(\)¡¿«»\]\[…]+/g,
  khm: /[^\s\.,;:\?!"'`\(\)¡¿«»\]\[…]+/g,
  kor: /[^\s\.,;:\?!"'`\(\)¡¿«»\]\[…]+/g,
  geo: /[^\s\.,;:\?!"'`\(\)¡¿«»\]\[…]+/g,
  swa: /[^\s\.,;:\?!"'`\(\)¡¿«»\]\[…]+/g,
  fra: /[^\s\.,;:\?!"'`\(\)¡¿«»\]\-\[…]+/g,
  inu: /[^\s\.,;:\?!"'`\(\)¡¿«»\]\-\[…\d]+/g,
  nor: /[^\s\.,;:\?!"'`\(\)¡¿«»\]\-\[…\d]+/g,
  mar: /[^\s\.,;:\?!"'`\(\)¡¿«»\]\-\[…\d]+/g,
  wel: /[^\s\.,;:\?!"'`\(\)¡¿«»\]\-\[…\d\(\)]+/g,
  xho: /[^\s\.,;:\?!"'`\(\)¡¿«»\]\-\[…\d\(\)’“‘]+/g,
  urd: /[^\s\.,;:\?!"'`\(\)¡¿«»\]\-\[…\d\(\)’“‘]+/g,
  chr: /[^\s\.,;:\?!"'`\(\)¡¿«»\]\-\[…\d\(\)’“‘]+/g,
  jap: /[^\s\.,;:\?!"'`\(\)¡¿«»\]\-\[…\d\(\)’“‘。、「」]+/g,
  hau: /[^\s\.,;:\?!"'`\(\)¡¿«»\]\[…\d\(\)’“‘。、「」]+/g,
  far: /[^\s\.,;:\?!"'`\(\)¡¿«»\]\[…\d\(\)’“‘。、「」]+/g,
  pan: /[^\s\.,;:\?!"'`\(\)¡¿«»\]\[…\d\(\)’“‘。、「」]+/g,
  zul: /[^\s\.,;:\?!"'`\(\)¡¿«»\]\[…\d\(\)’“‘”—。、「」]+/g,
  cop: /[^\s\.,;:\?!"'`\(\)¡¿«»\]\[…\d\(\)’“‘”—。、「」\-]+/g,
  yor: /[^\s\.,;:\?!"'`\(\)¡¿«»\]\[…\d\(\)’“‘”—。、「」\-]+/g,
  ibo: /[^\s\.,;:\?!"'`\(\)¡¿«»\]\[…\d\(\)’“‘”—。、「」\-]+/g,
  may: /[^\s\.,;:\?!"'`\(\)¡¿«»\]\[…\d\(\)’“‘”—。、「」\-]+/g,
  sin: /[^\s\.,;:\?!"'`\(\)¡¿«»\]\[…\d\(\)’“‘”—。、「」\-]+/g,
  lat: /[^\s\.,;:\?!"'`\(\)¡¿«»\]\[…\d\(\)’“‘”—。、「」\-]+/g,
  mya: /[^\s\.,;:\?!"'`\(\)¡¿«»\]\[…\d\(\)’“‘”—。、「」\-]+/g,
  got: /[^\s\.,;:\?!"'`\(\)¡¿«»\]\[…\d\(\)’“‘”—。、「」\-]+/g,
  khm: /[^\s\.,;:\?!"'`\(\)¡¿«»\]\[…\d\(\)’“‘”—。、「」\-]+/g,
  tur: /[^\s›‹\.,;:\?!"'`\(\)¡¿«»\]\[…\d\(\)’“‘”—。、「」\-]+/g,
  hat: /[^\s›‹\.,\—;:\?!"'`\(\)¡¿«»\]\[…\d\(\)’“‘”—。、「」\-]+/g,
  wao: /[^\s›‹\.,\—;:\?!"'`\(\)¡¿«»\]\[…\d\(\)’“‘”—。、「」\-]+/g,
  nav: /[^\s›‹\.,\—;:\?!"'`\(\)¡¿«»\]\[…\d\(\)’“‘”—。、「」\-]+/g,
  pit: /[^\s›‹\.,\—;:\?!"'`\(\)¡¿«»\]\[…\d\(\)’“‘”—。、「」\-]+/g,
  lak: /[^\s›‹\.,\—;:\?!"'`\(\)¡¿«»\]\[…\d\(\)’“‘”—。、「」\-]+/g,
  mon: /[^\s›‹\.,\—;:\?!"'`\(\)¡¿«»\]\[…\d\(\)’“‘”—。、「」\-]+/g,
  vai: /[^•ꔷa-zA-Z\/\s\.,;:\?!"'`\(\)¡¿«»\]\[…\d\(\)’“‘”—。、「」\-]+/g,
  arc: /[^•ꔷa-zA-Z\#\/\s\.,;:\?!"'`\(\)¡¿«»\]\[…\d\(\)’“‘”—。、「」\-]+/g,
  syr: /(?:\&\#\d+;)+/g,
}

sortBible(process.argv[2], process.argv[3])

function sortBible(file, s) {
  const dir = path.join(__dirname, `../content/${s}`)
  let words = {}

  collectFiles(dir).filter(x => x.match(/.(?:md|xml|txt|html|htm)/)).forEach(x => {
    console.log(x)
    let str = fs.readFileSync(x, 'utf-8')
      .replace(/<\/?\w+(?:[^>]+)?>/g, '')
    str
      .replace(regex[file], w => {
        w = w.replace(/\&\#(\d+)\;/g, (_, d) => {
          return String.fromCodePoint(parseInt(d))
        })
        words[w] = true
      })
  })

  let list = Object.keys(words).filter(x => x.length != 1).slice(0, 10000)
  list.sort()
  list.sort(sort)
  if (!fs.existsSync('tmp')) fs.mkdirSync('tmp')

  // let two = list.filter(x => x.length == 2)
  // let twoByLetter = {}
  // two.forEach(x => {
  //   let y = x[0]
  //   twoByLetter[y] = twoByLetter[y] || []
  //   twoByLetter[y].push(x)
  // })
  // let three = list.filter(x => x.length == 3)
  // let threeByLetter = {}
  // three.forEach(x => {
  //   let y = x[0]
  //   threeByLetter[y] = threeByLetter[y] || []
  //   threeByLetter[y].push(x)
  // })

  // let final = []
  // let i = 0
  // let n = two.length + three.length
  // while (final.length < 1000 && i < n) {
  //   let has = false
  //   i++

  //   for (let key in twoByLetter) {
  //     let z = twoByLetter[key].shift()
  //     if (z) {
  //       final.push(z)
  //       has = true
  //     }

  //     if (final.length == 1000) break
  //   }

  //   for (let key in threeByLetter) {
  //     let z = threeByLetter[key].shift()
  //     if (z) {
  //       final.push(z)
  //       has = true
  //     }

  //     if (final.length == 1000) break
  //   }

  //   if (!has) {
  //     break
  //   }
  // }

  // final.sort()
  // final.sort(sort)

  fs.writeFileSync(`tmp/${file}.csv`, list.join('\n'))

  function sort(a, b) {
    if (a.length < b.length) return -1
    if (a.length > b.length) return 1

    return 0
  }

  function collectFiles(start) {
    let files = []
    fs.readdirSync(start).forEach(x => {
      let y = `${start}/${x}`
      if (fs.statSync(y).isFile()) {
        files.push(y)
      } else {
        collectFiles(y).forEach(z => {
          files.push(z)
        })
      }
    })
    return files
  }
}
