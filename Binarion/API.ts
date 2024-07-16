// Binarion
namespace Binarion {
  // Save A JavaScript Object
  export function save (data: DataFormat.Supported): Uint8Array {
    const Cache = new CacheManager()

    const bytes = new Uint8Array(Fragment.getFragmentByteLength(Cache, data))

    const Writer = new Data.Writer(Cache, bytes)

    Fragment.writeFragment(Writer, data)

    Writer.Cache.clear()

    return bytes
  }

  // Load A JavaScript Object
  export function load (bytes: Uint8Array): DataFormat.Supported {
    return Fragment.readFragment(new Data.Reader(bytes))
  }
}

export { Binarion, Inspector }

import DataFormat from './Types/DataFormat'

import CacheManager from './Modules/CacheManager'
import Inspector from './Modules/Inspector'
import Fragment from './Modules/Fragment'
import Data from './Modules/Data'
