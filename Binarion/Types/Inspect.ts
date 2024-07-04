// Inspect
namespace Inspect {
  // Inspect Options
  export interface Options {
    depth: number
  }

  // Optional Inspect Options
  export interface Options_Optional {
    depth?: number
  }

  // Inspect Result 
  export interface Result {
    dataFormatID: DataFormat.ID,
    headerAttachment: number,

    name: string,

    fragmentByteLength: number
    index: number,

    children: Inspect.Result[]
  }
}

export default Inspect

import DataFormat from './DataFormat'
