
const {Translate} = require('@google-cloud/translate')
const fs = require('fs')
const translate = new Translate()

const type = process.argv[2]
const langs = {
  san: 'hi',
  heb: 'he',
  ara: 'ar',
  amh: 'am',
  tha: 'th',
  bul: 'bg',
  spa: 'es',
  kan: 'kn',
  jav: 'jv',
  ita: 'it',
  guj: 'gu',
  afr: 'af',
  fin: 'fi',
  gre: 'el',
  ind: 'id',
  arm: 'hy',
  vie: 'vi',
  tam: 'ta',
  ben: 'bn',
  rus: 'ru',
  por: 'pt',
  mal: 'ml',
  tel: 'te',
  khm: 'km',
  kor: 'ko',
  geo: 'ka',
  swa: 'sw',
  fra: 'fr',
  nor: 'no',
  mar: 'mr',
  wel: 'cy',
  xho: 'xh',
  bul: 'bg',
  urd: 'ur',
  jap: 'ja',
  hau: 'ha',
  zhs: 'zh',
  far: 'fa',
  pan: 'pa',
  zul: 'zu',
  yor: 'yo',
  ibo: 'ig',
  eng: 'en',
  sin: 'si',
  baq: 'eu',
  may: 'ms',
  lat: 'la'
}
const lang = langs[type]
const lang2 = langs[process.argv[3] || 'eng']
const name = process.argv[4] || type

const csv = fs.readFileSync(`tmp/${type}.csv`, 'utf-8').split(/\n+/).filter(x => !!x)
const csv2 = fs.createWriteStream(`tmp/${name}.trans.csv`, { 'flags': 'a' })
let i = 0

next()

function next(e) {
  if (e) console.error(e)
  let text = csv[i++]
  if (!text) return

  translate.translate(text, { from: lang, to: lang2 }).then(x => {
    let word = x[1].data.translations.map(t => t.translatedText).join(' * ')
    csv2.write(`${text},${word}\n`)
    console.log(`${text},${word}`)
    next()
  }).catch(next)
}
