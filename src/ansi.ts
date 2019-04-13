import { Color } from './color'
import { writeFileSync } from 'fs'
import chalk from 'chalk'
import makeDir = require('make-dir')

const colorsANSI = (() => {
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

const toDictColor = (name: string, k: Color) => {
  const { r, g, b } = k
  return `<key>${name}</key>
<dict>
  <key>Blue Component</key>
  <real>${b}</real>
  <key>Green Component</key>
  <real>${g}</real>
  <key>Red Component</key>
  <real>${r}</real>
</dict>`
}

const toiTermFormat = () => {
  const colors = colorsANSI.map((k, index) => {
    return toDictColor(`Ansi ${index} Color`, k)
  })
  const bg = colorsANSI[0]
  const fg = colorsANSI[15]
  const gray = colorsANSI[8]
  colors.push(toDictColor('Background Color', bg))
  colors.push(toDictColor('Foreground Color', fg))
  colors.push(toDictColor('Bold Color', fg))
  colors.push(toDictColor('Cursor Color', fg))
  colors.push(toDictColor('Cursor Text Color', bg))
  colors.push(toDictColor('Selected Text Color', fg))
  colors.push(toDictColor('Selection Color', gray))
  const body = colors.join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>${body}</dict>
</plist>`
}

makeDir.sync(__dirname + '/../built/')
writeFileSync(__dirname + '/../built/dino.itermcolors', toiTermFormat())
