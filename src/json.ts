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
