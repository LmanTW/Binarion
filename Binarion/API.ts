// Binarion
namespace Binarion {
  // Save A JavaScript Object
  export function save (data: any): Uint8Array {
    const bytes = new Uint8Array(Fragment.getFragmentByteLength(data))

    const Writer = new Data.Writer(bytes)

    Fragment.writeFragment(Writer, data)

    return bytes
  }

  // Load A JavaScript Object
  export function load (bytes: Uint8Array): any {
    return Fragment.readFragment(new Data.Reader(bytes))
  }
}

export { Binarion, Inspector }

import Inspector from './Modules/Inspector'
import Fragment from './Modules/Fragment'
import Data from './Modules/Data'
