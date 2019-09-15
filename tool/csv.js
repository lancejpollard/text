
const path = require('path')
const convertCsvToXlsx = require('@aternus/csv-to-xlsx')

let lang = process.argv[2]
let source = `tmp/${lang}.csv`
let destination = `tmp/${lang}.xlsx`

try {
  convertCsvToXlsx(source, destination)
} catch (e) {
  console.error(e.toString())
}
