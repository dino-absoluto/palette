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
import chalk from 'chalk'
import clamp = require('lodash/clamp')

// const co = [ .2989, .5870, .1140 ]
const CO = [ .2126, .7152, .0722 ]
const luma = (r: number, g: number, b: number) => {
  return CO[0] * r + CO[1] * g + CO[2] * b
}

export class Color {
  $r: number = 0
  $g: number = 0
  $b: number = 0
  $a: number = 1
  constructor (r: number, g: number, b: number, a: number = 1) {
    this.r = r
    this.g = g
    this.b = b
    this.a = a
  }

  get r () { return this.$r }
  get g () { return this.$g }
  get b () { return this.$b }
  get r255 () { return Math.round(this.r * 255) }
  get g255 () { return Math.round(this.g * 255) }
  get b255 () { return Math.round(this.b * 255) }
  get a () { return this.$a }
  set r (value: number) {
    this.$r = clamp(value, 0, 1)
  }
  set g (value: number) {
    this.$g = clamp(value, 0, 1)
  }
  set b (value: number) {
    this.$b = clamp(value, 0, 1)
  }
  set a (value: number) {
    this.$a = clamp(value, 0, 1)
  }

  static fromHSY (h: number, s: number, y: number, a: number = 1) {
    h = (h % 360 + 360) % 360
    s = clamp(s, 0, 1)
    y = clamp(y, 0, 1)
    const c = (1 - Math.abs(2 * y - 1)) * s
    const h1 = h / 60
    const x = c * (1 - Math.abs(h1 % 2 - 1))
    let k: [number, number, number]
    switch (Math.floor(h1)) {
      case 0: {
        k = [c, x, 0]
        break
      }
      case 1: {
        k = [x, c, 0]
        break
      }
      case 2: {
        k = [0, c, x]
        break
      }
      case 3: {
        k = [0, x, c]
        break
      }
      case 4: {
        k = [x, 0, c]
        break
      }
      case 5: {
        k = [c, 0, x]
        break
      }
      default: {
        k = [0, 0, 0]
        break
      }
    }
    const m = y - luma(k[0], k[1], k[2])
    k = [k[0] + m, k[1] + m, k[2] + m]
    return new Color(k[0], k[1], k[2], a)
  }

  toHSY () {
    const { r, g, b } = this
    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    let h
    if (max === min) {
      h = 0
    } else if (max === r) {
      h = 60 * (0 + (g - b) / (max - min))
    } else if (max === g) {
      h = 60 * (2 + (b - r) / (max - min))
    } else {
      h = 60 * (4 + (r - g) / (max - min))
    }
    if (h < 0) {
      h = h % 360 + 360
    }
    const y = luma(r, g, b)
    let s
    if (max === 0 || min === 1) {
      s = 0
    } else {
      s = (max - min) / (1 - Math.abs(2 * y - 1))
    }
    return [ h, s, y ]
  }

  toChalk () {
    const { r255, g255, b255 } = this
    return chalk.rgb(r255, g255, b255)
  }

  toChalkBG () {
    const { r255, g255, b255 } = this
    return chalk.bgRgb(r255, g255, b255)
  }

  toHex () {
    const { r255, g255, b255 } = this
    return '#' +
      r255.toString(16).padStart(2, '0') +
      g255.toString(16).padStart(2, '0') +
      b255.toString(16).padStart(2, '0')
  }

  get luma () {
    const { r, g, b } = this
    return luma(r, g, b)
  }
}
