/**
 * @author Dino <dinoabsoluto+dev@gmail.com>
 * @license
 * Copyright 2019 Dino <dinoabsoluto+dev@gmail.com>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
/* imports */
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
  readFileSync(__dirname + '/templates/iterm.hbs').toString())
const format = (palette: Color[], light = false) => {
  const colors = palette.map((color, index) => {
    return {
      name: `Ansi ${index} Color`,
      color
    }
  })
  let bg = palette[0]
  let fg = palette[15]
  let gray = palette[8]
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
    color: light ? bg : fg
  })
  colors.push({
    name: 'Selection Color',
    color: gray
  })
  colors.push({
    name: 'Link Color',
    color: palette[4]
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
