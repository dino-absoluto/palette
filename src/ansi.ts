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
import { Color } from './color'
import chalk from 'chalk'
import once = require('lodash/once')

interface PaletteOptions {
  name?: string
  hueOffset?: number
  saturationMultiplier?: number
  contrast?: number
  lightness?: number
  ansiTable?: number[][]
}

const createANSIPalette = (options: PaletteOptions = {}) => {
  const hueOffset = options.hueOffset || 0
  const saturationMultiplier = options.saturationMultiplier || 1
  const contrast = options.contrast || 1
  const lightness = options.lightness || 0
  const rgbANSI: Color[] = []
  const hsdANSI = [
    [ 0, 0, -.4 ]
  , [ 0, .5, 0 ]
  , [ 120, .5, 0 ]
  , [ 60, .5, 0 ]
  , [ 240, .5, 0 ]
  , [ 300, .5, 0 ]
  , [ 180, .5, 0 ]
  , [ 0, 0, .25 ]
  ]
  if (options.ansiTable) {
    const { ansiTable } = options
    for (let i = 0; i < 8; ++i) {
      const color = ansiTable[i]
      if (color == null) {
        continue
      }
      if (color[0] != null) {
        hsdANSI[i][0] = color[0]
      }
      if (color[1] != null) {
        hsdANSI[i][1] = color[1]
      }
      if (color[2] != null) {
        hsdANSI[i][2] = color[2]
      }
    }
  }
  for (const hsd of hsdANSI) {
    let [ h, s ] = hsd
    let y = 0.5 + hsd[2] + lightness
    h += hueOffset
    s *= saturationMultiplier
    const rgb = Color.fromHSY(h, s, y)
    rgbANSI.push(rgb)
  }
  for (const hsd of hsdANSI) {
    let [ h, s ] = hsd
    let y = 0.5 + (.15 * contrast + hsd[2]) + lightness
    h += hueOffset
    s *= saturationMultiplier
    const rgb = Color.fromHSY(h, s, y)
    rgbANSI.push(rgb)
  }
  return rgbANSI
}

const printPalette = (palette: Color[]) => {
  const length = 8
  {
    const text = ' ABC '
    let k = palette[0]
    let out =
      chalk.bgWhite(k.toChalk()(text)) +
      k.toChalkBG()(text)
    k = palette[length]
    out +=
      chalk.bgWhite(k.toChalk()(text)) +
      k.toChalkBG()(text)
    console.log(out)
  }
  for (let i = 1; i < length; i ++) {
    const text = ' ABC '
    let k = palette[i]
    let out =
      k.toChalk()(text) +
      chalk.black(k.toChalkBG()(text))
    k = palette[i + length]
    out +=
      k.toChalk()(text) +
      chalk.black(k.toChalkBG()(text))
    console.log(out)
  }
}

const initPalette = (options: PaletteOptions) => {
  const palette = createANSIPalette(options)
  console.log(options.name)
  printPalette(palette)
  return palette
}

export const colorsANSI = once(() => initPalette({
  name: 'Default'
, hueOffset: -10
}))

export const colorsMinus = once(() => initPalette({
  name: 'Minus'
, hueOffset: -15
, saturationMultiplier: .85
, contrast: .5
, ansiTable: [
    [ 225, .15 ]
  , [ 0, .5 ]
  , [ 108, .5 ]
  , [ 52, .5 ]
  , [ 220, .5 ]
  , [ 325, .5 ]
  , [ 188, .5 ]
  , [ (225 + 180) % 360, .15 ]
  ]
}))

export const colorsMinusLight = once(() => initPalette({
  name: 'MinusLight'
, hueOffset: -15
, saturationMultiplier: 1.25
, contrast: .5
, ansiTable: [
    [ 225, .15, -0.25 ]
  , [ 0, .5, -0.12 ]
  , [ 108, .5, -0.12 ]
  , [ 52, .5, -0.12 ]
  , [ 220, .5, -0.12 ]
  , [ 325, .5, -0.12 ]
  , [ 188, .5, -0.12 ]
  , [ (225 + 180) % 360, .15, .32 ]
  ]
}))
