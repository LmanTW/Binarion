// Inspect
namespace Inspect {
  // Fragment Inspect Info
  export interface FragmentInfo {
    dataFormatID: DataFormat.ID,
    headerAttachment: number,

    name: string,

    fragmentLength: number
    index: number,

    children: Inspect.FragmentInfo[]
  }

  // Inspect Result
  export class Result {
    private _fragmentInfo!: Inspect.FragmentInfo

    constructor (fragmentInfo: Inspect.FragmentInfo) {
      this._fragmentInfo = fragmentInfo
    }

    public get fragmentInfo () {return this._fragmentInfo}

    // Format The Inspect Result
    public format (): string {
      return Inspect.formatFragment(this._fragmentInfo, 0)
    }
  }

  // Format A Fragment
  export function formatFragment (fragmentInfo: Inspect.FragmentInfo, layer: number): string {
    let string: string = ''

    string += '  '.repeat(layer) + `- ${fragmentInfo.name} [${fragmentInfo.fragmentLength} Bytes]`

    console.log(fragmentInfo)

    for (let childFragmentInfo of fragmentInfo.children) string += `\n${Inspect.formatFragment(childFragmentInfo, layer + 1)}`

    return string
  }
}

export default Inspect

import DataFormat from '../Types/DataFormat'
