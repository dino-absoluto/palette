import { Color } from './color'
import chalk from 'chalk'
import once = require('lodash/once')

interface PaletteOptions {
  name?: string
  hueOffset?: number
  saturation?: number
  contrast?: number
  lightness?: number
  hues?: number[]
}

const createANSIPalette = (options: PaletteOptions = {}) => {
  const hueOffset = options.hueOffset || 0
  const saturation = options.saturation || 1
  const contrast = options.contrast || 1
  const lightness = options.lightness || 0
  const rgbANSI: Color[] = []
  const hsdANSI = [
    [ 0, 0, -.43 ]
  , [ 0, .5, 0 ]
  , [ 120, .5, 0 ]
  , [ 60, .5, 0 ]
  , [ 240, .5, 0 ]
  , [ 300, .5, 0 ]
  , [ 180, .5, 0 ]
  , [ 0, 0, .25 ]
  ]
  if (options.hues) {
    const { hues } = options
    for (let i = 0; i < 6; ++i) {
      const h = hues[i]
      if (h == null) {
        break
      }
      hsdANSI[i + 1][0] = h
    }
  }
  for (const hsd of hsdANSI) {
    let [ h, s ] = hsd
    let y = 0.5 + hsd[2] + lightness
    h += hueOffset
    s *= saturation
    const rgb = Color.fromHSY(h, s, y)
    rgbANSI.push(rgb)
  }
  for (const hsd of hsdANSI) {
    let [ h, s ] = hsd
    let y = 0.5 + (.15 * contrast + hsd[2]) + lightness
    h += hueOffset
    s *= saturation
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
}))

export const colorsMinus = once(() => initPalette({
  name: 'Minus'
, hueOffset: -15
, saturation: .9
, contrast: .5
// , hues: [ 0, 120, 60, 240, 300, 180 ]
, hues: [ 0, 120, 45, 240, 300, 210 ]
}))
