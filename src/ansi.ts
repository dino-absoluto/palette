import { Color } from './color'
import chalk from 'chalk'

export const colorsANSI = (() => {
  const rgbANSI: Color[] = []
  const hsdANSI = [
    [ 0, 0, -.45 ]
  , [ 0, .5, 0 ]
  , [ 120, .5, 0 ]
  , [ 60, .5, 0 ]
  , [ 240, .5, 0 ]
  , [ 300, .5, 0 ]
  , [ 180, .5, 0 ]
  , [ 0, 0, .1 ]
  ]
  const hueOffset = 0
  for (const hsd of hsdANSI) {
    let[ h, s ] = hsd
    let y = 0.5 + hsd[2]
    h += hueOffset
    const rgb = Color.fromHSY(h, s, y)
    rgbANSI.push(rgb)
  }
  for (const hsd of hsdANSI) {
    let [ h, s ] = hsd
    let y = 0.65 + hsd[2]
    h += hueOffset
    const rgb = Color.fromHSY(h, s, y)
    rgbANSI.push(rgb)
  }
  return rgbANSI
})()

const print = () => {
  const length = 8
  {
    const text = ' ABC '
    let k = colorsANSI[0]
    let out =
      chalk.bgWhite(k.toChalk()(text)) +
      k.toChalkBG()(text)
    k = colorsANSI[length]
    out +=
      chalk.bgWhite(k.toChalk()(text)) +
      k.toChalkBG()(text)
    console.log(out)
  }
  for (let i = 1; i < length; i ++) {
    const text = ' ABC '
    let k = colorsANSI[i]
    let out =
      k.toChalk()(text) +
      chalk.black(k.toChalkBG()(text))
    k = colorsANSI[i + length]
    out +=
      k.toChalk()(text) +
      chalk.black(k.toChalkBG()(text))
    console.log(out)
  }
}

print()
