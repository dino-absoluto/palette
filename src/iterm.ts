import {
  readFileSync,
  writeFileSync } from 'fs'
import makeDir = require('make-dir')
import handlebars = require('handlebars')
import { Color } from './color'
import {
  colorsMinusLight,
  colorsMinus,
  colorsANSI } from './ansi'

const template = handlebars.compile(
  readFileSync(__dirname + '/templates/iterm.hb').toString())
const format = (palette: Color[], light = false) => {
  const colors = palette.map((color, index) => {
    return {
      name: `Ansi ${index} Color`,
      color
    }
  })
  let bg = palette[0]
  let fg = palette[15]
  const gray = palette[8]
  if (light) {
    [bg, fg] = [fg, bg]
  }
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
writeFileSync(__dirname + '/../built/dino-minus-light.itermcolors',
  format(colorsMinusLight(), true))
