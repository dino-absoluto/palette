import {
  writeFileSync } from 'fs'
import makeDir = require('make-dir')
import { Color } from './color'
import {
  colorsMinus,
  colorsANSI } from './ansi'

const format = (colors: Color[]) => {
  return JSON.stringify(colors.map(c => c.toHex()), null, 1)
}

makeDir.sync(__dirname + '/../built/')
writeFileSync(__dirname + '/../built/dino.json',
  format(colorsANSI()))
writeFileSync(__dirname + '/../built/dino-minus.json',
  format(colorsMinus()))
