import {
  readFileSync,
  writeFileSync } from 'fs'
import makeDir = require('make-dir')
import handlebars = require('handlebars')
import { Color } from './color'
import {
  colorsMinus,
  colorsANSI } from './ansi'

const template = handlebars.compile(
  readFileSync(__dirname + '/templates/iterm.hb').toString())
const format = (palette: Color[]) => {
  const colors = palette.map((color, index) => {
    return {
      name: `Ansi ${index} Color`,
      color
    }
  })
  const bg = palette[0]
  const fg = palette[15]
  const gray = palette[8]
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
writeFileSync(__dirname + '/../built/dino.itermcolors',
  format(colorsANSI()))
writeFileSync(__dirname + '/../built/dino-minus.itermcolors',
  format(colorsMinus()))
