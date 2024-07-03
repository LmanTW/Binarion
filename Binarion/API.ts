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
    const Reader = new Data.Reader(bytes)

    return Fragment.readFragment(Reader)
  }
}

export default Binarion

import Fragment from './Modules/Fragment'
import Data from './Modules/Data'
