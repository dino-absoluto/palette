import {
  writeFileSync } from 'fs'
import makeDir = require('make-dir')
import { Color } from './color'
import {
  colorsMinus,
  colorsANSI } from './ansi'

const format = (colors: Color[]) => {
  let names = [
    'black'
  , 'red'
  , 'green'
  , 'yellow'
  , 'blue'
  , 'magenta'
  , 'cyan'
  , 'white'
  ]
  names = names.concat(names.map(s => {
    return 'bright' + s[0].toUpperCase() + s.substring(1)
  }))
  const obj: { [id: string]: string } = {}
  for (const [index, name] of names.entries()) {
    obj[name] = colors[index].toHex()
  }
  return JSON.stringify(obj, null, 1)
}

makeDir.sync(__dirname + '/../built/')
writeFileSync(__dirname + '/../built/dino.json',
  format(colorsANSI()))
writeFileSync(__dirname + '/../built/dino-minus.json',
  format(colorsMinus()))
