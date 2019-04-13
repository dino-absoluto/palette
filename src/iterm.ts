import {
  readFileSync,
  writeFileSync } from 'fs'
import makeDir = require('make-dir')
import handlebars = require('handlebars')
import { colorsANSI } from './ansi'

const template = handlebars.compile(
  readFileSync(__dirname + '/templates/iterm.hb').toString())
const toiTermFormat = () => {
  const colors = colorsANSI.map((color, index) => {
    return {
      name: `Ansi ${index} Color`,
      color
    }
  })
  const bg = colorsANSI[0]
  const fg = colorsANSI[15]
  const gray = colorsANSI[8]
  colors.push({
    name: 'Background Color',
    color: bg
  })
  colors.push({
    name: 'Foreground Color',
    color: fg
  })
  colors.push({
    name: 'Bold Color',
    color: fg
  })
  colors.push({
    name: 'Cursor Color',
    color: fg
  })
  colors.push({
    name: 'Cursor Text Color',
    color: bg
  })
  colors.push({
    name: 'Selected Text Color',
    color: fg
  })
  colors.push({
    name: 'Selection Color',
    color: gray
  })
  return template({
    colors
  })
}
makeDir.sync(__dirname + '/../built/')
writeFileSync(__dirname + '/../built/dino.itermcolors', toiTermFormat())
