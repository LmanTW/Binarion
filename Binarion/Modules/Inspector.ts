// Inspector
export default class {
  private _options!: Inspect.Options

  private _inspectResult!: Inspect.Result

  constructor (bytes: Uint8Array, options?: Inspect.Options_Optional) {
    if (options === undefined) options = {}

    this._options = {
      depth: defaultValue(options.depth, Infinity)
    }

    this._inspectResult = Fragment.inspectFragment(new Data.Reader(bytes), this._options, 0)
  }

  public get fragmentInfo () {return this._inspectResult}

  // Format The Inspect Result
  public format (): string {
    return this._formatFragmentInfo(this._inspectResult, 0)
  }

  // Format A The Inspect Info Of A Fragment
  private _formatFragmentInfo (inspectResult: Inspect.Result, layer: number): string {
    let string: string = ''

    string += '  '.repeat(layer) + `- ${inspectResult.name} [${inspectResult.fragmentByteLength} Bytes]`

    for (let childInspectResult of inspectResult.children) string += `\n${this._formatFragmentInfo(childInspectResult, layer + 1)}`

    return string
  }
}

import Inspect from '../Types/Inspect'

import defaultValue from './Tools/DefaultValue'

import Fragment from './Fragment'
import Data from './Data'
